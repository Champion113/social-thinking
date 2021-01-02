const { Thought, User } = require("../models");

const thoughtController = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find().then(dbThought => {
            res.json(dbThought)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },
    //get single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.userId }).then(dbThought => {
            if (!dbThought) {
                return res.status(404).json({ message: "User doesn't exist" })

            }
            res.json(dbThought)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })

    },
    //create new thought
    createThought(req, res) {
        Thought.create(req.body).then(dbThought => {
            return Thought.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThought._id } },
                { new: true });
        }).then(dbThought => {
            if (!dbThought) {
                return res.status(404).json({ message: "User doesn't exist" })
            }
            res.json({ message: 'Thought Created'});
        })
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                });
    },
    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }).then(dbThought => {
            if (!dbThought) {
                return res.status(404).json({ message: "Thought Not Found" })

            }
            res.json(dbThought)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },
    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId }).then(dbThought => {
            if (!dbThought) {
                return res.status(404).json({ message: "Thought doesn't exist" })

            }
            //thought id remove from user's thoughts data
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              );
            })
            .then((dbUser) => {
              if (!dbUser) {
                return res.status(404).json({ message: 'Thought created & no user exist' });
              }
              res.json({ message: 'Thought completely deleted!' });
            })
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                });
        
    },
//reacted to a thought added
addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          return res.status(404).json({ message: 'Thought invalid' });
        }
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// reaction moved from thought data
removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          return res.status(404).json({ message: 'Thought is invalid' });
        }
        res.json(dbThought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};




module.exports = thoughtController;
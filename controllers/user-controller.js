const { User, Thought } = require("../models");

const userController = {
    //get all users
    getUsers(req, res) {
        User.find().then(dbUsers => {
            res.json(dbUsers)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },
    //get single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId }).populate("friends").populate("thoughts").then(DBuser => {
            if (!dbUsers) {
                return res.status(404).json({ message: "User doesn't exist" })

            }
            res.json(dbUsers)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })

    },
    //create new user
    createUser(req, res) {
        User.create(req.body).then(dbUsers => {
            res.json(dbUsers)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },
    //update user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true }).then(dbUsers => {
            if (!dbUsers) {
                return res.status(404).json({ message: "User Not Found" })

            }
            res.json(dbUsers)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },
    //delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId }).then(dbUsers => {
            if (!dbUsers) {
                return res.status(404).json({ message: "User doesn't exist" })

            }
            res.json(dbUsers)
                .catch(error => {
                    console.log(error)
                    res.status(500).json(error)
                })
        })
    },

}


module.exports = userController;
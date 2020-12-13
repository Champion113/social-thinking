const {User, Thought} = require("../models");

const userController = {
    getUsers(req,res){
        User.find().then(DBusers => {
            res.json(DBusers)
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
        })
    },
    getSingleUser(req,res){
        User.findOne({_id:req.params.userId}).populate("friends").populate("thoughts").then(DBuser => {
            if(!DBuser) {
                return res.status(404).json({message: "User doesn't exist"})

            }
            res.json(DBuser)
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            })
        })

    }
}

module.exports = userController;
const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/user-controller');

//get single user 
router.route('/').get(getUsers).post(createUser);
//get single user by ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//update user by id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
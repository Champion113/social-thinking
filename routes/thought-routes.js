const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller')

//get all thoughts
router.route('/').get(getThoughts).post(createThought);
//get thoughts by Id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
//get thoughts by reactions
router.route('/:thoughtId/reactions').post(addReaction);
//get thoughts by reactions by Id 
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
const express = require("express");

var reviewController = require('../controllers/review-controller');

const router = express.Router();

router.route('')
  .get(reviewController.getAll)
  .post(reviewController.addNew);

router.route('/:id')
  .get(reviewController.getOne)
  .put(reviewController.updateOne)
  .delete(reviewController.deleteOne);
router.route('/user/:id')
  .get(reviewController.getByUser);

module.exports = router;

//import review model

const Review = require("../models/review");


exports.addNew = function(req, res, next){
  const review = new Review({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    userName: req.body.userName,
    restId: req.body.restId,
    rating: req.body.rating
  });
  review.save().then(createdReview => {
    res.status(201).json({
      message: "Review added successfully",
      reviewId: createdReview._id
    });
  });
};

exports.updateOne = function(req, res, next){
  const review = new Review({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    userName: req.body.userName,
    restId: req.body.restId,
    rating: req.body.rating
  });
  Review.updateOne({ _id: req.params.id }, review).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
};

exports.getAll = function(req, res, next){
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  var userId = req.query.userId;
  console.log(userId);
  var restId= req.query.restId;
 //restId= "7db7db40b47efa8c65357bbaef9033f4e0b95e89ec5e6388"
 //userId="5cb68b72c7c65748dc491413"
  var reviewQuery=Review.find();
  var revCount = Review.find();
  if (userId=="none"){
    reviewQuery = Review.find({restId:restId});
    revCount = Review.find({restId:restId});
  }else if(userId==null && restId==null){
    reviewQuery=Review.find();
  }
  else{
    reviewQuery = Review.find({userId:userId});
    revCount = Review.find({userId:userId});
  }
  let fetchedReviews;
  if(pageSize && currentPage){
    reviewQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  reviewQuery
  .then(documents => {
    fetchedReviews = documents
    return revCount.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Reviews fetched successfully!",
      reviews: fetchedReviews,
      maxPosts: count
    });
  });
};

exports.getOne = function(req, res, next){
    Review.findById(req.params.id).then(review => {
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found!" });
    }
  });
};

exports.getByUser = function(req, res, next){
    Review.find({userId:req.params.id}).then(review => {
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found!" });
    }
  });
};

exports.deleteOne = function(req, res, next){
    Review.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Review deleted!" });
  });
};



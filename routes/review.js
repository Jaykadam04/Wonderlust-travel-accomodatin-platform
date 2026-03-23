const express = require("express");
const router = express.Router({mergeParams:true});
const Review = require("../models/review.js");
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js");


const validatereview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    
    if (error) {
        let ermsg = error.details.map((el)=>el.message).join(",");

        throw new ExpressError(400,ermsg);
    }else{
        next();
    }
}

router.post("/",validatereview,wrapAsync(async(req,res)=>{
   
    let Listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    Listing.reviews.push(newReview);
    await Listing.save();
    await newReview.save();

    console.log("new review saved");
    res.redirect(`/listings/${Listing._id}`);
}));
// delete review 

router.delete("/:reviewid",wrapAsync(async(req,res)=>{
    let {id,reviewid} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}`);
}));

module.exports = router;
const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const listing = require("../models/listing.js");




const validateListing = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body);
    
    if (error) {
        let ermsg = error.details.map((el)=>el.message).join(",");

        throw new ExpressError(400,ermsg);
    }else{
        next();
    }
}

//diaplay all listings
router.get("/",wrapAsync(async(req,res)=>{
    let alllistings = await listing.find({});
    res.render("listings/index.ejs",{alllistings});
    console.log(alllistings)

}));

//add new listing
router.get("/new", (req,res)=>{
    res.render("listings/new.ejs")
});
router.post("/",validateListing, wrapAsync(async (req,res,next)=>{
   
    
    let listings = req.body.listing;
    console.log(listings);
    let newlisting = new listing(listings);
    await newlisting.save();
    res.redirect("/listings");
}));

//display listing using ID
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;

    let data = await listing.findById(id).populate("reviews");
    console.log(data);
    res.render("listings/show.ejs",{data});
    

}));

//Edit Listing
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let data = await listing.findById(id);
    console.log(data);
    res.render("listings/edit.ejs",{data});

}));
router.put("/:id", validateListing,wrapAsync(async(req,res)=>{
        let {id}= req.params;
        await listing.findByIdAndUpdate(id,{...req.body.listing});
        res.redirect(`/listings/${id}`);
    }));

//delete listing
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}= req.params;
    let listings = await listing.findByIdAndDelete(id);
    console.log(listings);
    res.redirect("/listings");
}));

module.exports = router;
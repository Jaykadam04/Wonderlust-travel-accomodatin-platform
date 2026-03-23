const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");

const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")))

main().then((res)=>{
    console.log("database connected");
   
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.get("",(req,res)=>{
    res.send("working");

});

app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);
//review adding

//error handling
app.use((req, res,) => {
    throw (new ExpressError(404,"Route not found"));
});


// global error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs",{err});
    
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
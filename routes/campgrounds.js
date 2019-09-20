// INDEX - show all campgrounds
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req , res){
// 	Get all campground from db
	Campground.find({} , function(err , allCampgrounds){
	if(err){
	console.log(err);
} else {
	res.render("campgrounds/index" , {campgrounds: allCampgrounds , currentUser: req.user});
}
});
});

router.post("/" , middleware.isLoggedIn , function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image= req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name , price: price , image: image , description: desc, author: author};
// 	Create a new Campground and save to db
	Campground.create(newCampground , function(err , newlyCreated){
	if(err){
	console.log(err);
    } else{
		console.log(newlyCreated);
	res.redirect("/campgrounds");
    }
    });

});

router.get("/new" , middleware.isLoggedIn ,function(req , res){
	res.render("campgrounds/new");
});

router.get("/:id" , function(req , res){
	Campground.findById(req.params.id ).populate("comments").exec(function(err , foundCamground){
		 if(err){
			 console.log(err);
		 }else{
			 res.render("campgrounds/show" , {campground: foundCamground});
		 }
	});

});

// EDIT CAMPGROUND ROUTE

router.get("/:id/edit",middleware.checkCampgroundOwnership , function(req, res){
	Campground.findById(req.params.id , function(err , foundCamground){	
		res.render("campgrounds/edit" , {campground: foundCamground});
	});
});


// UPDATE CAMPGROUND ROUTR
router.put("/:id", middleware.checkCampgroundOwnership , function(req , res){
// 	find and update th ecorrect campground
     Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err , updatedCampground){
		 if(err){
			 res.redirect("/campgrounds");
		 }else{
			 res.redirect("/campgrounds/" + req.params.id);
		 }
	 });
	// 	redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE

router.delete("/:id" , middleware.checkCampgroundOwnership , function(req , res){
	Campground.findByIdAndRemove(req.params.id , function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

// middleware

module.exports = router;
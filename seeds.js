var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
	// {
	// 	name: "Cloud Rest",
	// 	image: "https://storage.googleapis.com/ehimages/2019/6/7/img_ea9ddab5444b842b9653055527cd5998_1559897347875_processed_original.jpg",
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam turpis sapien, feugiat eu dignissim eu, ultricies eget risus. Aenean vulputate convallis tincidunt. Nulla et odio euismod lacus malesuada egestas. Quisque tincidunt quam in mi viverra venenatis. Maecenas in nulla metus. Maecenas pellentesque sed urna ac tempus. Donec vitae tempor elit. Sed iaculis viverra elit, pharetra rutrum enim mollis vel. Praesent dolor magna, ultricies eget felis at, maximus sagittis nisl. Maecenas luctus nibh eu tellus vehicula consequat at eget mauris. Donec aliquet auctor nibh ac malesuada."
	// },
	// {
	// 	name: "Desert Mesa",
	// 	image:"https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1200/v1/journal/awvl3qaeq1gsjxygfuiz",
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam turpis sapien, feugiat eu dignissim eu, ultricies eget risus. Aenean vulputate convallis tincidunt. Nulla et odio euismod lacus malesuada egestas. Quisque tincidunt quam in mi viverra venenatis. Maecenas in nulla metus. Maecenas pellentesque sed urna ac tempus. Donec vitae tempor elit. Sed iaculis viverra elit, pharetra rutrum enim mollis vel. Praesent dolor magna, ultricies eget felis at, maximus sagittis nisl. Maecenas luctus nibh eu tellus vehicula consequat at eget mauris. Donec aliquet auctor nibh ac malesuada."
	// },
	// {
	// 	name: "Canyon Floor",
	// 	image:"https://751601.smushcdn.com/1359779/wp-content/uploads/2015/12/gc-dory-phantom-whitmore-007.jpg?lossy=0&strip=1&webp=1",
	// 	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam turpis sapien, feugiat eu dignissim eu, ultricies eget risus. Aenean vulputate convallis tincidunt. Nulla et odio euismod lacus malesuada egestas. Quisque tincidunt quam in mi viverra venenatis. Maecenas in nulla metus. Maecenas pellentesque sed urna ac tempus. Donec vitae tempor elit. Sed iaculis viverra elit, pharetra rutrum enim mollis vel. Praesent dolor magna, ultricies eget felis at, maximus sagittis nisl. Maecenas luctus nibh eu tellus vehicula consequat at eget mauris. Donec aliquet auctor nibh ac malesuada."
	// }
	
];


function seedDB(){
// 	Remove all Campground
	Campground.deleteOne({} , function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
	});
// // add a nw campground

	data.forEach(function(seed){
		Campground.create(seed , function(err , campground){
			if(err){
				console.log(err);
			}else{
				console.log("added a campground");
// 				create a comment
			Comment.create(
				{
					text: "This place is great ! I wish there was internet",
					author: "Homer"
				}, function(err , comment){
					if(err){
						console.log(err);
					} else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created a comment ");
					}
				});
			
			
			}
			
		});
	
	});

}
module.exports = seedDB;

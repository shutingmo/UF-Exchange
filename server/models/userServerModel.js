/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    /* Create your schema */
var itemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Textbooks, Electronics, Vehicles, Tickets, Clothing, Entertainment, Housing, Miscellaneous']
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  condition: {
  type: String,
  required: true,
  enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  location: {
  type: String,
  required: true,
  enum: ['Century Tower', 'Reitz Union', 'Hub', 'Library West', 'Southwest Rec']
  //How to add constraint among 5 locations
  },
  listingType: {
    type: String,
    required: true,
    enum: ['selling', 'buying']
    //How to add constraint of either selling or buying listing
  },
  complete: {
    type: Boolean,
    default: 'false'
  },
  buyer: {
    name: String,
    email: String,
  },
  seller: {
    name: String,
    email: String,
  },
  posted_at: Date,
  flagged: {
    type: Boolean,
    default: 'false'
  },
  // edited_at: Date
});

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favorite: {
    type: [itemSchema],
    'default' : []
  },
  rating: {
    type: Number
  },
  banned: {
    type: Boolean,
    'default': false
  },
  role: {
    type: String,
    required: true,
    'default': 'user'
  }
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;

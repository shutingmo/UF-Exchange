/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var itemSchema = new Schema({
  itemId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
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


/* Use your schema to instantiate a Mongoose model */
var Item = mongoose.model('Item', itemSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Item;

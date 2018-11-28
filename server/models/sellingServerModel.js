/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var sellingSchema = new Schema({
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
  // posted_at: Date,
  flagged: {
    type: Boolean,
    default: 'false'
  }
  // edited_at: Date
});


/* Use your schema to instantiate a Mongoose model */
var Selling = mongoose.model('sellingItem', sellingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Selling;

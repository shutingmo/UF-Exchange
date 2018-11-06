/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    ObjectId = mongoose.Schema.Types.ObjectId;
/* Create your schema */
var userSchema = new Schema({
  // _id: { 
  //   type: ObjectId, 
  //   unique: true 
  //   // default: uuid.v4 
  // },
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
  // retypePassword: {
  //   type: String,
  //   required: true
  // },
  favorite: {
    type: [Number],
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
  //delete this
  // hash: {
  //   type: String,
  // }

});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;

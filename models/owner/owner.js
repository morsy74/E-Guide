const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  methods: {
    type: [String],
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    name:{
      type: String,
      minLength: 5,
      maxLength: 50
    },
    email:{
      type: String,
      minLength: 5,
      maxLength: 255
    },
    password:{
      type: String,
      minLength: 5,
      maxLength: 1024
    },   
    isAdmin: Boolean,
  role:{
    type:String,
    enum:["owner"],
  }

},
});
  ownerSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
    return token;
  }
  
  const Owner = mongoose.model('Owner', ownerSchema);
  
  function validateOwner(owner){
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      role:Joi.string().required(),
    }); 
    return schema.validate(owner);
  };

  
function validateAuth(req){
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      role:Joi.string().required(),
    }); 
    return schema.validate(req);
  }


exports.validateOwner = validateOwner;
exports.validateAuth = validateAuth;
exports.Owner = Owner; 
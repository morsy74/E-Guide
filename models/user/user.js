const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    phone: {
      type: String,
    },   
    isAdmin: Boolean
  },
  google: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    token:{
      type: String
    },
    photo: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    token:{
      type: String
    }
  },
  
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean()
  }); 
  return schema.validate(user);
};

function validateAuth(req){
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  }); 
  return schema.validate(req);
}

exports.validateUser = validateUser;
exports.validateAuth = validateAuth;
exports.User = User; 

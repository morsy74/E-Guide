const { Owner } = require("../../models/owner/owner");
const { Token } = require("../../models/owner/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");

exports.forgotPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if(error) return res.status(200).json({
      "status": false,
      "message": error.details[0].message,
    });

    const owner = await Owner.findOne({ "local.email": req.body.email });
    if (!owner)
      return res.status(400).json({
        "status": false,
        "message": "user with given email doesn't exist",
        "data": null
      });

    let token = await Token.findOne({ ownerId: owner._id });
    if (!token) {
      token = await new Token({
        ownerId: owner._id,
        token: crypto.randomInt(100000, 999999)
      }).save();
    }

    const code = token.token;
    await sendEmail(
      owner.local.email,
      "Password reset",
      `This is Your private code to reset your password: ${code}`,
     owner.local.name
      );

    res.json({
      "status": true,
      "message": "Verify code is sent to your email account"
    });
  } catch (error) {
    console.log(error);
  }

  next();
};


const { User, validateAuth } = require('../../models/user/user');
const bcrypt = require('bcrypt');

exports.changePassword = async (req, res, next) => {

    let user = await User.findById(req.params.id);
    if (!user) return res.status(200).json({
      "status": false,
      "message": "you must be registered or login",
      "data": null
    });

    const validPassword = await bcrypt.compare(req.body.currentPassword, user.local.password);
    if (!validPassword) return res.status(200).json({
      "status": false,
      "message": "The current password is incorrect.",
      "data": null
    });

    if(req.body.confirmPassword == req.body.newPassword){
      const salt = await bcrypt.genSalt(10);
      user.local.password = await bcrypt.hash(req.body.newPassword, salt);
      await user.save();
      res.status(200).json({
        "status": true,
        "message": "Your password is changed successfully.",
        "data": null
      });
    }
    else return res.status(200).json({
      "status": false,
      "message": "The new password and confirm password is not matched.",
      "data": null
    });

    next();
  
}
exports.admin = function(req, res, next){
  if (!req.user.local.isAdmin) return res.status(403).send('You are not a Administrator...');
  next();
}
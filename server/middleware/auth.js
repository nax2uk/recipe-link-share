const expressJwt = require('express-jwt');
const { default: User } = require('../../client/pages/user');

exports.requireAuth = expressJwt({ secret: process.env.JWT_SECRET })

exports.authMiddleware = (req, resp, next) => {
    const authUserId = req.user._id;
    User.findOne({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return resp.status(400).json({
                error: "User not found",
            })
        }
        req.profile = user;
        next();
    })
}

exports.adminMiddleware = (req, resp, next) => {
    const authAdminId = req.user._id;
    User.findOne({ _id: authAdminId }).exec((err, user) => {
        if (err || !user) {
            return resp.status(400).json({
                error: "User not found",
            })
        }
        if (user.role !== 'admin') {
            return resp.status(400).json({
                error: "Admin resource. Access denied"
            })
        }
        req.profile = user;
        next();
    })
}
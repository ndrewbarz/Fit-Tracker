const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if (!token) {
        return res.status(401).json({msg: 'No token'})
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret)

        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}
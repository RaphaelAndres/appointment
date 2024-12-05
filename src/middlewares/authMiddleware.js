const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const redisClient = require("../redisClient");

module.exports = async (request, response, next) => {
    const token = request.headers['authorization'];

    if (!token) {
        return response.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return response.status(401).json({ message: 'Failed to authenticate token' });
        }

        await checkBlacklist(request, response);

        request.token = token;
        request.userId = decoded.id;
        next();
    });
};

const checkBlacklist = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const redisResult = await redisClient.get(token, (err, data) => {
        if (err) throw err;
        if (data) return data;
    });

    if (redisResult && redisResult === 'blacklisted') {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
};

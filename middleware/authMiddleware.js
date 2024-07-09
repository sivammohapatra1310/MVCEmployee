import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret key from environment variables
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ status: false, message: 'Invalid token.' });
    }
};

export default authMiddleware;

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    console.log("message", req.headers.authorization);
    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
        console.log("message111", decoded);
        // Check user role
        if (decoded.user_type !== 'admin') {
            return res.status(403).json({ status: false, message: 'Access denied. Admins only.' });
        }

        // If user is admin, attach decoded user information to request object
        req.user = decoded;
        next();
    } catch (error) {
        console.log("ooooo", error.message);
        
        res.status(400).json({ status: false, message: error?.message 
            || 'Invalid token.' });
    }
};

export default authMiddleware;

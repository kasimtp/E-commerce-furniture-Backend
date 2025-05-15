import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, please login again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authUser;

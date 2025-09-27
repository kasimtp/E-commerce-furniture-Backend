// import jwt from 'jsonwebtoken';

// // User authentication middleware
// const authUser = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Not authorized, please login again' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.body.userId = decoded.id; 
//     next();
//   } catch (error) {
//     console.error("Auth error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default authUser;



import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: 'Not authorized, please login again' });
    }

    const token = authHeader.split(" ")[1]; // remove "Bearer "

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export default authUser;

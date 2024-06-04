// const {JWT_SECRET}  = require("./config")
// const jwt  = require("jsonwebtoken")


// const authMiddleware = (req,res,next) => {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.userId = decoded.userId;

//         next();
//     } catch (error) {
//         return res.status(403).json({})
//     }

// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authMiddleware };

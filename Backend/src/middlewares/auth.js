// jwt = JSON Web Token adalah sebuah standar terbuka yang mendefinisikan cara-cara yang aman untuk mentransmisikan informasi antara pihak-pihak yang terlibat.
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get Token
  const token = req.headers.authorization; // Mengambil token dari headers
  
  if (!token) return res.status(401).json({ message: "Unauthenticated." }); // Jika tidak ada token, maka user tidak diizinkan

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // Menyimpan id user ke req.userId
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
};

export default verifyToken;

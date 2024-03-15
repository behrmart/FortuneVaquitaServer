// Auth Middleware JWT

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Obtenemos el token del header
      token = req.headers.authorization.split(" ")[1];
      console.log("token:", token);

      // verificar que token sea correcto
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded: ", decoded);

      // Obtener datos del usuario desde el id del payload del JWT
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw Error("authMiddelware: Access not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw Error("authMiddleware: No JWT token provided, access not authorized");
  }
});

module.exports = {
  protect,
};

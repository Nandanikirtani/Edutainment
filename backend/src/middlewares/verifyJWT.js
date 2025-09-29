import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const verifyJWT = (req, res, next) => {
  let token;

  // Prioritize Authorization header
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    // Fallback to cookie if header is not present
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new ApiError(401, "Not authenticated"));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded; // Assign decoded user info to request
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid token"));
  }
};

export { verifyJWT };

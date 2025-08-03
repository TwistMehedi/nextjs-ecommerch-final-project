
import jwt from "jsonwebtoken";

 export const isAuthenticated = async (req, allowedRoles = []) => {
  try {
     const token = req.cookies?.get("token")?.value;

    if (!token) {
      return {
        status: 401,
        message: "Unauthorized: No token provided",
      };
    }

     const decoded = jwt.verify(token, process.env.SECRET_KEY);

     if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      return {
        status: 403,
        message: "Forbidden: Insufficient role",
      };
    };

     return {
      status: 200,
      user: decoded.userId,  
    };
  } catch (error) {
    return {
      status: 401,
      message: "Unauthorized: Invalid or expired token",
    };
  }
};

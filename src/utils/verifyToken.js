import { getAuth } from "firebase-admin/auth";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    if (error.code === "auth/id-token-expired") {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(403).json({ error: "Invalid token" });
    }
  }
};
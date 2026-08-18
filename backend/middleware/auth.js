// import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
// import User from '../model/User.js'
// export const protect = ClerkExpressWithAuth()
// export const isAdmin = async (req, res, next) => {
//     try {
//         console.log("========== ADMIN MIDDLEWARE ==========");
//         console.log("AUTH:", req.auth);
//         console.log("USER ID:", req.auth?.userId);
//         if (!req.auth.userId) {
//         }
//         const clerkId = req.auth.userId
//         const user = await User.findOne({ clerkId: clerkId });
//         if (user && user.role === "admin") {
//             next()
//         } else {
//             res.status(403).json({ success: false, message: "Access Denied, Admin Only" })
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error })
//     }
// }

import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import User from "../model/User.js";

export const protect = ClerkExpressWithAuth();

export const isAdmin = async (req, res, next) => {
  try {
    console.log("========== ADMIN MIDDLEWARE ==========");
    console.log("AUTH:", req.auth);
    console.log("USER ID:", req.auth?.userId);

    const clerkId = req.auth?.userId;

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Clerk user not found",
      });
    }

    const user = await User.findOne({ clerkId });

    console.log("USER FROM DB:", user);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found in database",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied, Admin Only",
      });
    }

    next();
  } catch (error) {
    console.error("ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
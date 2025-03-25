import { clerkClient } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      console.log("yha s aya");

      return res.json({ success: false, message: "unauthorized Access" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

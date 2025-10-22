"use client";

import { addReviewToRestaurant } from "@/src/lib/firebase/firestore";
import { auth, db } from "@/src/lib/firebase/clientApp"; // make sure db is exported

export async function handleSubmit(e, restaurantId, review, handleClose) {
  e.preventDefault();
  const user = auth.currentUser;

  if (!user) {
    console.error("❌ User not logged in");
    return;
  }

  try {
    await addReviewToRestaurant(db, restaurantId, {
      userId: user.uid,
      text: review.text,
      rating: review.rating,
    });
    console.log("✅ Review added successfully");
    handleClose();
  } catch (err) {
    console.error("🔥 Error adding review:", err);
  }
}

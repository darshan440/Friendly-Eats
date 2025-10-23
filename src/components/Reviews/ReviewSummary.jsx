import { getReviewsByRestaurantId } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";
import { googleAI } from "@genkit-ai/googleai";
import { getFirestore } from "firebase/firestore";
import { genkit } from "genkit";

export async function GeminiSummary({ restaurantId }) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const reviews = await getReviewsByRestaurantId(
    getFirestore(firebaseServerApp),
    restaurantId
  );
  const reviewSeparator = "@";
  const prompt = `Based  on the following restaurant reviews, where each review is separated by a ${reviewSeparator} character, create one-sentence summary of what people think of restaurant.
   Here are the reviews: ${reviews.map((review) => review.text).join(reviewSeparator)}`;
  
  
  try {
    const ai = genkit({
      plugins: [googleAI()],
      model: "gemini20Flash",
    });

    const { text } = await ai.generate({ prompt });
    return (
      <div className="restaurant__review_summary">
        <p>{text}</p>
        <p>✨ Summarized with Gemini</p>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <p>Error summarizing reviews.</p>;
  }
 


}

export function GeminiSummarySkeleton() {
  return (
    <div className="restaurant__review_summary">
      <p>✨ Summarizing reviews with Gemini...</p>
    </div>
  );
}

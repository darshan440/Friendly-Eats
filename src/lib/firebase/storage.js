import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";

import { updateRestaurantImageReference } from "@/src/lib/firebase/firestore";

// Replace the two functions below
export async function updateRestaurantImage(restaurantId, image) {
    try {
        if (!restaurantId) {
            console.log("No restaurantId has been provided!");
        
        }

        if (!image || !image.name) {
            console.log("A valid Image has not been provided.");
        
        }

        const PublicImageUrl = await uploadImage(restaurantId, image);
        await updateRestaurantImageReference(restaurantId, PublicImageUrl);
        return PublicImageUrl;
    } catch (error) {
        console.log("Error in processing request: ", error);

    
    }
}

    async function uploadImage(restaurantId, image) {
        const filePath = `images/${restaurantId}/${image}`
        const newImageRef = ref(storage,filePath)
        await uploadBytesResumable(newImageRef, image);
        return await getDownloadURL(newImageRef);
        
}

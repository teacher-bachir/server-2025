// 1. npm i mongoose
// 2. import
import mongoose from "mongoose";

// התחברות למסד הנתונים
export const connectDB = async () => {
    // מחרוזת התחברות לשרת של הדטהבייס
    // בסוף המחרוזת נכתוב את שם הדטהבייס
    // אם לא קיים - ייצור חדש
    const MONGO_URI = "mongodb://localhost:27017/storeDB";

    try {
        await mongoose.connect(MONGO_URI);
        console.log(`mongodb connected successfully to ${MONGO_URI}`);
        
    } catch (error) {
        console.error(error.message);
    }
};
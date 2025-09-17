import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// פונקציה שתתבצע לפני שמירה של משתמש בדטהבייס
userSchema.pre('save', async function () {
    // אסור לפונקציה להיות פונקצית חץ
    // this - DB-מכיל את האוביקט שרוצים לשמור ב

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt); // הצפנת הסיסמא

    this.password = hash;

    // DB-כאן יש סיסמא מוצפנת שהיא נשמרת ב
});

// פונקציה ליצירת טוקן-צמיד
export const generateToken = (fullUser) => {
    // רק את הנתונים שקשורים להרשאות
    const payload = {
        userId: fullUser._id,
        role: fullUser.role,
    };

    const secretKey = process.env.JWT_SECRET ?? 'SecretKey';
    console.log(secretKey);

    // היצירה של הטוקן
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // פג תוקף אחרי שעה

    return token;
}

export default model('users', userSchema);
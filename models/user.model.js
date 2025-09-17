import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = new Schema({
    username: String,
    password: String,
    email: { type: String, unique: true },
    phone: String,
    role: String,
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

export const userJoi = {
    login: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    register: Joi.object({
        username: Joi.string().required().min(2),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9]{8,30}$/),
        repeatPassword: Joi.ref('password'),
        email: Joi.string().required().email(),
        phone: Joi.string().pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/),
        role: Joi.string().valid('user', 'admin').default('user')
    }),
    updatePassword: Joi.object({
        password: Joi.string().required().pattern(/^[a-zA-Z0-9]{8,30}$/),
        repeatPassword: Joi.ref('password'),
    }),
};

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
};

export default model('users', userSchema);
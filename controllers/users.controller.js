import User, { generateToken, userJoi } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

// התחברות - משתמש קיים
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // const user = await User.findOne({ email: email });
        const user = await User.findOne({ email });

        if (user) {
            // Verify Hash
            const isValid = await bcrypt.compare(password, user.password); // השוואת הסיסמאות
            if (isValid) {
                const token = generateToken(user); // יצירת טוקן

                return res.json({ token: token, username: user.username }); // מחזירים את הטוקן ונתונים נבחרים
            }
        }

        return next({ error: { message: 'login failed' }, status: 400 });
    } catch (error) {
        return next({ error: { message: error.message }, status: 400 });
    }
};

// הרשמה - משתמש חדש
export const register = async (req, res, next) => {
    try {
        // TODO: add validation
        const user = new User(req.body);

        // Generate Hash
        await user.save(); // יצפין סיסמא
        res.status(201).json(user);
    } catch (error) {
        return next({ error, status: 400 });
    }
};

export const updatePassword = (req, res, next) => {
    // Generate Hash

    // user.save(); // יצפין סיסמא
};

export const deleteUser = (req, res, next) => {
};

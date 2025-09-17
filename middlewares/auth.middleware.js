import jwt from "jsonwebtoken"; // ייבוא


// כאן שמים את כל המידלוואר של הרשאות משתמש

// req.myUser-אם יש טוקן חוקי מוסיף את ההרשאות ל
export const auth = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // const x = authorization.split(' ');
        // const token = x[1];
        const [, token] = authorization.split(' '); // זהה לשורות הנל

        const secretKey = process.env.JWT_SECRET ?? 'SecretKey';
        const currentUser = jwt.verify(token, secretKey);
         // payload-אם טוקן לא חוקי זורק שגיאה, אם חוקי מחזיר את ה

        // console.log(currentUser);

        req.myUser = currentUser;
        next();
    } catch (error) {
        return next({ error: new Error('authorization failed'), status: 401 }); // לא מחובר - אין טוקן
    }
};

// authAdmin
// authUserById
// getUser
import { object, string, ref, number } from 'joi';

const schema = object({
    username: string() // מחרוזת
        .alphanum() // אותיות/מספרים
        .min(3) // אורך מינימלי
        .max(30) // אורך מקסימלי
        .required(), // חובה
    password: string() // מחרוזת
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // תבנית של מחרוזת
    repeat_password: ref('password'), // קישור לשדה סיסמא - ערכים זהים
    access_token: [
        // או
        string(),
        number()
    ],
    birth_year: number() // מספר
        .integer() // שלם
        .min(1900) // ערך מינימלי
        .max(2013), // ערך מקסימלי

    email: string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) // אימייל חוקי
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

// =================== בדיקה האם אוביקט מתאים לסכמה ======================
// 1.
const { value, error, warning } = schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

// value: ערך של האוביקט שבדקנו אם תקין
// error: השגיאות שהיו אם האוביקט לא תקין
// warning?: אם הגדרנו אזהרות, מציג כאן

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }

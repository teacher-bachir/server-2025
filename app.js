// 1. התקנה
// npm i express

// 2. ES6 ייבוא של
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// ייבוא של כל הראוטרים
import productRouter from './routes/products.router.js';
import { sendDate } from './middlewares/print.middleware.js';
import { errorHandling, notFound } from './middlewares/errors.middleware.js';
import { connectDB } from './config/db.js';

// 3. יצירת השרת
const app = express();

connectDB();

// כל השרת מקבל באדי
// כל סוגי הבקשות
// כל הכתובות
// כל הבקשות שיופיעו אחרי 2 השורות הבאות יקבלו משתנה נוסף לתוכן
// req.body - אוביקט עם כל התוכן שנשלח בבאדי מהלקוח
app.use(json());
app.use(urlencoded());

app.use(cors());
app.use(morgan('dev'));

// 3.1 הגדרת הכתובות של השרת - endpoints

// GET http://loalhost:5000/
app.get('/', (req, res, next) => {
    res.send('Hello World!');
    // next('my error!!!!!!!!!!!!!!!!!!!!');
});

// =========== כל הניתובים ==============
// app.use(...) - מחפש התאמה של תחילת הניתוב
// app.method(...) - מחפש התאמה מלאה - כל הניתוב
// http://localhost:5000/products
// http://localhost:5000/products/123
// http://localhost:5000/products/abc
// http://localhost:5000/products/full

// חיבור של המידלוואר לכל הראוטר - לכל הניתובים של מוצרים
app.use('/products', sendDate, productRouter);

// ניתן לגשת לכל הקבצים בתיקיה זו לפי שמם
app.use(express.static('public'));

// כאן אפשר לדעת בוודאות שלא נכנסנו לשום ניתוב/ראוטר
app.use(notFound);

// כל השגיאות שנשלח בשרת
// יגיעו למידלוואר הזה שמגדיר ערוץ שגיאות
// next(...) את השגיאות ע"י הפונקציה
app.use(errorHandling);

// 4. הרצת השרת על הפורט שהגדרנו
const port = 5000;
app.listen(port, () => {
    // פונקציה זו מתבצעת פעם אחת, אחרי שהשרת מורץ
    console.log(`Example app listening on http://localhost:${port}`)
});

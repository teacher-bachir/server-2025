// 1. התקנה
// npm i express

// 2. ES6 ייבוא של
import express, { json, urlencoded } from 'express';
// ייבוא של כל הראוטרים
import productRouter from './routes/products.router.js';

// 3. יצירת השרת
const app = express();

// כל השרת מקבל באדי
// כל סוגי הבקשות
// כל הכתובות
// כל הבקשות שיופיעו אחרי 2 השורות הבאות יקבלו משתנה נוסף לתוכן
// req.body - אוביקט עם כל התוכן שנשלח בבאדי מהלקוח
app.use(json());
app.use(urlencoded());

// 3.1 הגדרת הכתובות של השרת - endpoints

// GET http://loalhost:5000/
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// =========== כל הניתובים ==============
// app.use(...) - מחפש התאמה של תחילת הניתוב
// app.method(...) - מחפש התאמה מלאה - כל הניתוב
// http://localhost:5000/products
// http://localhost:5000/products/123
// http://localhost:5000/products/abc
// http://localhost:5000/products/full
app.use('/products', productRouter);

// 4. הרצת השרת על הפורט שהגדרנו
const port = 5000;
app.listen(port, () => {
    // פונקציה זו מתבצעת פעם אחת, אחרי שהשרת מורץ
    console.log(`Example app listening on http://localhost:${port}`)
});

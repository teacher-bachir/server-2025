// 1. התקנה
// npm i express

// 2. ES6 ייבוא של
import express from 'express';

// const {x} = require('y')
// import {x} from 'y'
const products = [
    { id: 10, name: "aaa", price: 12 },
    { id: 11, name: "bbb", price: 1000 },
    { id: 12, name: "mmm", price: 12 },
    { id: 14, name: "aaa", price: 30 },
];


// 3. יצירת השרת
const app = express();

// 3.1 הגדרת הכתובות של השרת - endpoints

// GET http://loalhost:5000/
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/products', (req, res) => {
    // res.send - יכול להזחיר מידע מכל טיפוס ולא רק מחרוזת
    // res.send(products);

    // res.json - שליחת אוביקט ללקוח
    // בד"כ נשתמש בו
    res.json(products);
});

app.post('/products', (req, res) => {
    const p = { id: Date.now(), name: 'new', price: Math.random() * 100 };
    products.push(p);

    // res.status(...) - פונקציה שמגדירה סטטוס לתגובה
    // json/send חובה לכתוב לפני ההחזרה
    return res.status(201).json(p);
});

// http://loalhost:5000/products/10
// http://loalhost:5000/products/11
// http://loalhost:5000/products/200

// :id - יוצר משתנה בשם איי-די ששומר את הערך שנשלח ביו-אר-אל
app.put('/products/:id', (req, res) => {
    // req.params - URL-אוביקט שמכיל את כל המפתחות והערכים שנשלחו ב
    // הערכים נשלחים תמיד כמחרוזת

    const id = +req.params.id; // + המרת מחרוזת למספר ע"י

    const product = products.find(p => p.id === id);

    if (!product) // לא מצא מוצר עם קוד כזה
    {
        return res.status(404).json({ error: 'product not found' })
    }

    product.name += ' updated';
    product.price = 100 + Math.random() * 10;

    return res.json(product);
});

// 4. הרצת השרת על הפורט שהגדרנו
const port = 5000;
app.listen(port, () => {
    // פונקציה זו מתבצעת פעם אחת, אחרי שהשרת מורץ
    console.log(`Example app listening on http://localhost:${port}`)
});

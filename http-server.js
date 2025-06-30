// 1.
const http = require('http'); // built-in module מודול שאינו צריך התקנה

const products = [
    { id: 10, name: "aaa", price: 12 },
    { id: 11, name: "bbb", price: 1000 },
    { id: 12, name: "mmm", price: 12 },
    { id: 14, name: "aaa", price: 30 },
];


// 2. יצירת שרת באוויר

// / - הודעת ברוך הבא
// /api/products - קבלת כל המוצרים
// /random - מספר רנדומלי
// אחר - שגיאת 404
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    if (req.method === 'GET') {
        switch (req.url) {
            case '/':
                return res.end('welcome');
            case '/api/products': // החזרת כל המוצרים
                return res.end(JSON.stringify(products));
            case '/random':
                return res.end(Math.random() + '');
        }
    }

    // הוספת מוצר
    if (req.url === '/api/products' && req.method === 'POST') {
        const p = { id: Date.now(), name: 'new', price: Math.random() * 100 };
        products.push(p);
        res.statusCode = 201;
        return res.end(JSON.stringify(p)); // המרת אוביקט למחרוזת
    }

    // פונקציה שתתבצע בכל בקשה לשרת
    // req (request) - בקשה, כל המידע ששלח הקליינט
    // res (response) - תגובה, בעזרתו ניתן להחזיר תשובות מהסרבר לקליינט

    // בכל בקשה אחרת - גם מסוג אחר וגם גט עם כתובת אחרת
    res.statusCode = 404;
    res.end('not found'); // החזרת מחרוזת ללקוח
});

// 3. הרצת השרת
server.listen(6000);
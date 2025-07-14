// ============== controllers - פונקציות לוגיות =================
// למשל: חיבור לדטהבייס, הוספה/מחיקה/עדכון

// אפשר כמחלקה כמו סרוויס
/*
class ProductController {
    #products = [
        { id: 10, name: "aaa", price: 12 },
        { id: 11, name: "bbb", price: 1000 },
        { id: 12, name: "mmm", price: 12 },
        { id: 14, name: "aaa", price: 30 },
    ];
};
export default new ProductController();
*/

// אפשר בצורה של פונקציות נפרדות
// וייצוא כל פונקציה בנפרד
let products = [
    { id: 10, name: "aaa", price: 12 },
    { id: 11, name: "bbb", price: 1000 },
    { id: 12, name: "mmm", price: 12 },
    { id: 14, name: "aaa", price: 30 },
];

// /products
// /products?sort=name
// /products?sort=price
// /products?sort=id
export const getAllProducts = (req, res, next) => {
    // כאן ניתן לקבל את כל הנתונים שצורפו לבקשה דרך המידלוואר
    console.log('getAllProducts', req.user2, req.currentDate3);

    // req.query - פרמטרים אופציונליים
    // const sort = req.query.sort;
    const { sort } = req.query;

    // מיון על מערך חדש
    let newP;
    switch (sort) {
        case 'price':
            newP = products.toSorted((p1, p2) => p1.price - p2.price);
            break;
        case 'id':
            newP = products.toSorted((p1, p2) => p1.id - p2.id);
            break;
        case 'name':
            newP = products.toSorted((p1, p2) => p1.name.localeCompare(p2.name));
            break;

        default:
            newP = products;
            break;
    }

    // res.json - שליחת אוביקט ללקוח
    // בד"כ נשתמש בו
    return res.json(newP);
};

export const getProductById = (req, res, next) => {
    const id = +req.params.id;
    const p = products.find(p => p.id === id);

    // עדיף לטפל קודם כל בשגיאות
    if (!p) {
        return next({
            error: new Error(`product ${id} not found!`),
            status: 404
        });
    }
    else {
        res.json(p);
    }
};

export const addProduct = (req, res, next) => {
    // console.log(req.body); // כל מה שנשלח בבאדי

    // const p = { id: Date.now(), name: req.body.name, price: req.body.price };
    const p = {
        id: Date.now(),
        ...req.body, // name: req.body.name, price: req.body.price 
    };

    products.push(p);

    // res.status(...) - פונקציה שמגדירה סטטוס לתגובה
    // json/send חובה לכתוב לפני ההחזרה
    return res.status(201).json(p);
};

// http://loalhost:5000/products/10
// http://loalhost:5000/products/11
// http://loalhost:5000/products/200
export const updateProduct = (req, res, next) => {
    // req.params - URL-אוביקט שמכיל את כל המפתחות והערכים שנשלחו ב
    // הערכים נשלחים תמיד כמחרוזת

    const id = +req.params.id; // + המרת מחרוזת למספר ע"י

    const product = products.find(p => p.id === id);

    if (!product) { // לא מצא מוצר עם קוד כזה
        return next({
            error: new Error(`product ${id} not found!`),
            status: 404
        });
    }

    // עדכון רק אם נשלח הערך - default value
    // product.name =  req.body.name ? req.body.name : product.name;
    product.name = req.body.name || product.name;  // false -> 0/''/false/undefined/null
    product.price = req.body.price ?? product.price; // false -> undefined/null

    return res.json(product);
};

export const deleteProduct = (req, res, next) => {
    const id = +req.params.idx;

    const p = products.find(p => p.id === id);

    // עדיף לטפל קודם כל בשגיאות
    if (!p) {
        // new Error(...) - מחלקה שמורה של גאווהסקריפט שמכילה נתונים על שגיאה

        return next({
            error: new Error(`product ${id} not found!`),
            status: 404
        });
        // את כל השגיאות נשלח דרך הפונקציה נקסט
        // האוביקט יישלח למידלוואר של השגיאות

        // res.status(404).json({ message: 'product not found' });
    }
    else {
        products = products.filter(p => p.id !== id);
        return res.status(204).json();
    }
};

/*
    const sortedValues = values.toSorted(פונקצית השוואה בין 2 ערכים);
    הפונקציה מחזירה אחד מבין הערכים הבאים
    חיובי - אם הראשון גדול מהשני
    שלילי - אם הראשון קטן מהשני
    אפס - אם 2 הערכים שווים

    const values = [10, 10, 21, 2];
    const sortedValues = values.toSorted((a, b) => a - b);
    a - b = 10 - 10 = 0   (first = second)
    a - b = 10 - 21 = -11 (first < second)
    a - b = 21 - 2  = 19  (first > second)
*/
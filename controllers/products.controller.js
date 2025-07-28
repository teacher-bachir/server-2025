// ============== controllers - פונקציות לוגיות =================
// למשל: חיבור לדטהבייס, הוספה/מחיקה/עדכון
import Product from '../models/product.model.js';

// /products
// /products?sort=name
// /products?sort=price
// /products?sort=id
export const getAllProducts = async (req, res, next) => {
    // req.query - פרמטרים אופציונליים
    // const sort = req.query.sort;
    // const { sort } = req.query;

    // TODO: sort data
    try {
        // find - שליפה מהדטהבייס
        const products = await Product.find(); // SELECT * FROM products
        return res.json(products);
    } catch (error) {
        // return next({ error: error });
        return next({ error }); // זהה לשורה שלעיל
    }
};

export const getProductById = async (req, res, next) => {
    // const id = req.params.id;
    const { id } = req.params;
    try {
        // TODO: findOne
        const product = await Product.findById(id);
        if (!product) {
            return next({
                error: new Error(`product ${id} not found!`),
                status: 404
            });
        }
        return res.json(product);
    } catch (error) {
        return next({ error });
    }
};

export const addProduct = async (req, res, next) => {
    try {
        // new Product({ name: 'abc', price: 100, a: 10 }) // לא יכניס תכונות שלא קיימות בסכמה

        // TODO: add complex validations 
        const newP = new Product(req.body); // יצירת מסמך חדש "באוויר" שמתאים לסכמה

        // שמירת המסמך החדש באוסף מוצרים
        await newP.save();
        // בשורה זו האוביקט מכיל את הקוד האוטומטי

        return res.status(201).json(newP);
    } catch (error) {
        return next({ error, status: 400 });
    }
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
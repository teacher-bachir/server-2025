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
        // const products = await Product.find({ price: 50 }); // SELECT * FROM products WHERE price = 50
        return res.json(products);
    } catch (error) {
        // return next({ error: error });
        return next({ error });
        // זהה לשורה שלעיל
    }
};

export const getProductById = async (req, res, next) => {
    // const id = req.params.id;
    const { id } = req.params;
    try {
        // const product = await Product.findById(id);// SELECT * FROM products WHERE _id=id
        const product = await Product.findOne({ _id: id });// SELECT * FROM products WHERE _id=id
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

// http://localhost:5000/products/10
// http://localhost:5000/products/11
// http://localhost:5000/products/200
export const updateProduct = async (req, res, next) => {
    try {
        // req.params - URL-אוביקט שמכיל את כל המפתחות והערכים שנשלחו ב
        // הערכים נשלחים תמיד כמחרוזת

        const { id } = req.params; // + המרת מחרוזת למספר ע"י

        const product = await Product.findByIdAndUpdate(id, {
            $set: req.body, // הוספת/עדכון שדות מסוימים במסמך
            // $unset: { price: true } // מחיקת שדות
        },
            {  // אוביקט עם הגדרות נוספות
                new: true, // החזרת מסמך מעודכן
                runValidators: true // הפעלת בדיקות תקינות
            });

        if (!product) { // לא מצא מוצר עם קוד כזה
            return next({
                error: new Error(`product ${id} not found!`),
                status: 404
            });
        }

        return res.json(product);
    } catch (error) {
        return next({
            error: error,
            status: 400
        });
    }
};

export const deleteProduct = async (req, res, next) => {
    const id = req.params.idx;

    try {
        const product = await Product.findByIdAndDelete(id);

        // עדיף לטפל קודם כל בשגיאות
        if (!product) {
            return next({
                error: new Error(`product ${id} not found!`),
                status: 404
            });
        }
        
        return res.status(204).json();
    } catch (error) {
        next({ error })
    }
};
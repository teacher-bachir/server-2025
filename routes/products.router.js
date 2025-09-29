// ================= routes - ניתובים ==================
// כאן יהיו הכתובות של המשאב המתאים
// והפונקציה עצמה - הלוגיקה תהיה בתוך הקונטרולר

// 1. import - חובה בתחילת העמוד
import { Router } from 'express'
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct, getFullProducts } from '../controllers/products.controller.js';
import { printHello } from '../middlewares/print.middleware.js';
import { auth } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { productJoi } from '../models/product.model.js';

// 2. יצירת ראוטר חדש - למשאב בתוך הפרויקט
// כאן לא כותבים את הניתוב הכללי
// רק את הניתוב החלקי אחרי שם המשאב - מתחיל בסלאש
const router = Router();

router.get('/', printHello, getAllProducts);

router.get('/full', getFullProducts);

router.get('/:id', getProductById);

router.post('/', validateBody(productJoi), addProduct);

// :id - יוצר משתנה בשם איי-די ששומר את הערך שנשלח ביו-אר-אל
router.put('/:id', validateBody(productJoi), updateProduct);

router.delete('/:idx', deleteProduct);

export default router;
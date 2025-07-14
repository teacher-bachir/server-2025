// ================= routes - ניתובים ==================
// כאן יהיו הכתובות של המשאב המתאים
// והפונקציה עצמה - הלוגיקה תהיה בתוך הקונטרולר

// 1. import - חובה בתחילת העמוד
import { Router } from 'express'
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controller.js';
import { printHello } from '../middlewares/print.middleware.js';

// 2. יצירת ראוטר חדש - למשאב בתוך הפרויקט
// כאן לא כותבים את הניתוב הכללי
// רק את הניתוב החלקי אחרי שם המשאב - מתחיל בסלאש
const router = Router();

router.get('/', printHello, getAllProducts);

router.get('/:id', getProductById);

router.post('/', addProduct);

// :id - יוצר משתנה בשם איי-די ששומר את הערך שנשלח ביו-אר-אל
router.put('/:id', updateProduct);

router.delete('/:idx', deleteProduct);

export default router;
// schema - תבנית של השדות שיכולים להיות באוסף

import Joi from "joi";
import { model, Schema } from "mongoose";

// DB-לא ניצור בדיקות תקינות על ה
// unique - רק בדיקה של
const productSchema = new Schema({
    // _id: SchemaTypes.ObjectId, // אם יוצרים שייצור אוטומטית לא ניצור בסכמה
    name: String,
    price: Number,
    date: Date,
    amount: Number,
    isSale: Boolean,
});

// בדיקות תקינות
// חובה לכתוב גם בצד שרת
// כי לכל מה שעושים בצד לקוח ניתן לפרוץ בקלות

// בשרת ניצור בדיקות לא רק במונגו כי
// 1. בדיקות של מונגו רק בעת עדכון, למשל הרשמה היא לא עדכון
// 2. בדיקות של מונגו הם על כל הסכמה, אם רוצים שדות ספציפיים, למשל רק שם וסיסמא
// 3. ניתן לבצע בדיקות מורכבות יותר yup/joi בעזרת

export const productJoi = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    date: Joi.date().default(new Date()),
    amount: Joi.number().integer(),
    isSale: Joi.boolean().default(false)
});

// model - יצירת אוסף בתבנית של הסכמה
// products - שם האוסף
export default model('products', productSchema);
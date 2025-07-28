// schema - תבנית של השדות שיכולים להיות באוסף

import mongoose, { model, Schema, SchemaTypes, } from "mongoose";

const productSchema = new Schema({
    // _id: SchemaTypes.ObjectId, // אם יוצרים שייצור אוטומטית לא ניצור בסכמה
    name: String,
    price: Number,
    date: Date,
    amount: Number,
    isSale: Boolean
});

// model - יצירת אוסף בתבנית של הסכמה
// products - שם האוסף
export default model('products', productSchema);
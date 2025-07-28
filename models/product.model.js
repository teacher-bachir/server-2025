// schema - תבנית של השדות שיכולים להיות באוסף

import mongoose, { model, Schema, SchemaTypes } from "mongoose";

const productSchema = new Schema({
    // _id: SchemaTypes.ObjectId, // אם יוצרים שייצור אוטומטית לא ניצור בסכמה
    name: { type: String, required: true },
    price: { type: Number, min: 0 },
    date: Date,
    amount: Number,
    isSale: { type: Boolean, default: false }
});

// model - יצירת אוסף בתבנית של הסכמה
// products - שם האוסף
export default model('products', productSchema);
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {() => null} next 
 * @returns 
 */
export const notFound = (req, res, next) => {
    return next({
        status: 404,
        error: new Error(`url '${req.url}' ${req.method} not found!`)
    });
};

/**
 * 
 * @param {{ error: Error, status?: number }} err 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {() => null} next 
 * @returns 
 */
export const errorHandling = (err, req, res, next) => {
    // new Error - מחלקה שמורה של גאווהסקריפט שמכילה נתונים על שגיאה

    // err-ניקח את כל הנתונים שנשלחו ב
    // ונחזיר שגיאה בפורמט שנרצה
    // היתרון: כל השגיאות יהיו מאותה תבנית וגם לא תהיה חזרה על קוד
    const message = err.error.message || 'Server Error';
    const status = err.status ?? 500;
    return res.status(status)
        .json({ error: message, fixLink: 'http://localhost:5000/fix.html' });
};
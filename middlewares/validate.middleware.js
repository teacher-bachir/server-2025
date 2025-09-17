// JOI מידלוואר לבדיקת תקינות של באדי ע"י
// (req, res, next) - middleware

// middleware creator - יוצר פונקצית מידלוואר לפי הפרמטרים שקיבל
export const validateBody = function (joiSchema) {
    return (req, res, next) => {
        const { value, error } = joiSchema.validate(req.body);

        // היתה שגיאה
        if (error) {
            return next({ error: { message: error }, status: 400 });
        }

        // לא היתה שגיאה
        return next();
    };
};

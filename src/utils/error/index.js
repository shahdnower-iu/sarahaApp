// bdl al try w catch
export const asyncHandler = (fn) => {
    return (req, res, next) => {
   
    return Promise.resolve(fn(req, res, next)).catch((error) => {
        return next(error);
    });
}
};


export const globalErrorHandling =(err, req, res, next) => {
    return res.status(err["cause"] || 500).json({
        message: err.message,
        stack: err.stack
    });
}
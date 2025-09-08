// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Backend terminal ke liye (sirf ek hi baar log)
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${req.method}] ${req.url} - ${message}`);
    // Agar detailed debugging chahiye:
    // console.error(err.stack);
  }

  // Frontend ko clean response
  res.status(statusCode).json({
    success: false,
    message,   // 👈 sirf yeh frontend pe milega
  });
};

export { errorHandler };

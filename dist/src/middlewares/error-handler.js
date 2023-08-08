export const errorHandler = async (error, req, res, next) => {
    res.status(error.code || 500).json({ error: error.message });
};

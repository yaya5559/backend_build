const processScore = (req, res) => {
    const { userId, score } = req.body;
    if (!userId || score === undefined) {
        return res.status(400).json({ success: false, error: "Invalid data" });
    }
    res.json({ success: true, score });
};

module.exports = { processScore };

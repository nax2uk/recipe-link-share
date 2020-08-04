const errInvalidPaths = (req, res) => {
    res.status(404)
        .send({ msg: "Invalid URL: Your specified path does not exist." });
};

const errStatus405 = (req, res) => {
    res.status(405).send({ msg: `Method Not Allowed: for HTTP ${req.method} at ${req.originalUrl}` })
}

module.exports = { errInvalidPaths, errStatus405 };
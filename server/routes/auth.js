const express = require('express');
const router = express.Router();

router.get('/api/register', (req, resp) => {
    resp.json({ msg: 'GET:register' })
})

module.exports = router;
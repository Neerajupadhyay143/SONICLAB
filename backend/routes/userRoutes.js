const express = require('express');
const router = express.Router();
const pool = require('../db/db')
router.get('/', async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows)
    res.send('this is a user route');
})
router.get('/101', (req, res) => {
    res.send('this is a 101 route ');
})

module.exports = router;
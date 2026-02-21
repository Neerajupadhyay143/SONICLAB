import pool from "../db/db.js"

const getUser = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT name ,email,plan FROM users WHERE id =$1",
            [req.user.id]
        )
        res.status(200).json({
            message: "Users Details",
            user: result.rows[0],
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server Error' })
    }
}

export { getUser };
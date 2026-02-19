import pool from "../db/db"

export const getUser = async (req, res) => {

    try {
        const result = pool.query(
            "SELECT name ,email FROM users WHERE id =$1",
            [req.user.id]
        )
        const data = await res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server Error' })
    }
}
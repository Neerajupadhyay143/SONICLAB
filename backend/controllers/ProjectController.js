import pool from "../db/db.js";

const createProjects = async (req, res) => {
    try {
        // Ensure user is coming from verifyToken
        console.log("Token User:", req.user);
        if (!req.user) return res.status(401).json({ message: "Bhai user hi nahi mila token mein!" });
        const user_id = req.user?.id;
        const { project_name } = req.body;

        if (!project_name) {
            return res.status(400).json({ message: "Sir ji field daalo !" });
        }

        const result = await pool.query(
            'INSERT INTO projects (user_id, project_name) VALUES ($1, $2) RETURNING *',
            [user_id, project_name]
        );

        return res.status(201).json({
            message: "Project Created !",
            project: result.rows[0],
        });

    } catch (error) {
        console.error("DB Error:", error.message); // Exact error console pe dikhega
        return res.status(500).json({ message: "Server Error !", details: error.message });
    }
};



const getProjects = async (req, res) => {
    try {
        const user_id = req.user?.id;
        if (!user_id) return res.status(400).json({ message: "unauthorized users !" });

        const result = await pool.query(
            "SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC",
            [user_id]
        );

        return res.status(200).json({
            message: "Projects Fetch Successfully",
            projects: result.rows, // [0] hata do, poori list bhejo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
};
export { createProjects, getProjects };
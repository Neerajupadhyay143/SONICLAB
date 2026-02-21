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
        const userResult = await pool.query('SELECT plan From users WHERE id = $1', [user_id]);
        const userPlan = userResult.rows[0].plan;

        const ProjectCountResult = await pool.query('SELECT COUNT(*) FROM projects WHERE user_id = $1', [user_id]);
        const projectCount = parseInt(ProjectCountResult.rows[0].count);
        if (userPlan === "free" && projectCount >= 10) {
            return res.status(403).json({ message: "Free plan wale sirf 10 projects bana sakte hain. Upgrade to Pro 🚀" })
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
        console.error("DB Error:", error.message);
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
            projects: result.rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
};


const deleteProject = async (req, res) => {

    try {
        const user_id = req.user.id;
        const project_id = req.params.id;
        const result = await pool.query('DELETE FROM projects WHERE id =$1 AND user_id =$2 RETURNING *', [project_id, user_id]);

        if (result.rows.length === 0) return res.status(401).json({ message: "Project nahi mila ya tumhara nahi hai 😅" });
        return res.status(200).json({ Message: "Project delete ho gaya" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Sever error" });
    }
}
export { createProjects, getProjects, deleteProject };

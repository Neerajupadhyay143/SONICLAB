import pool from "../db/db.js"

export const uploadTrack = async (req, res) => {
    try {
        const { projectId, trackName } = req.body;
        const fileUrl = `/uploads/audio/${req.file.filename}`;

        const trackCout = await pool.query('SELECT count(*) FROM tracks WHERE project_id =$=1', [projectId]);
        if (parseInt(trackCout.rows[0].count) >= 10) {
            return res.status(403).json({ message: "Free Vesrsion main sirf 10 Tracks allowed hain!" })
        }

        const result = await pool.query('INSERT INTO tracks(name ,file_url ,project_id)VALUES ($1, $2, $3) RETURNING *', [trackName, fileUrl, projectId])
        res.status(201).json(result.rows[0]);



    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
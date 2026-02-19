import pool from "../../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
const SECRET = process.env.JWT_SECRET_KEY

// user regestration code 
export const requestRegister = async (req, res) => {

    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
        "INSERT INTO users(name ,email,password) VALUES($1,$2,$3)", [name, email, hashed]
    )
    res.json({ message: 'user Registred!' });
}

// user LOGIN CODE 

export const requestLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
        return res.status(400).json({ message: "user not found" });
    };

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
        return res.status(400).json({ message: "wrong password" });
    }

    const token = jwt.sign(
        { id: user.rows[0].id },
        SECRET,
        { expiresIn: "1h" }
    )
    res.json({ token });
}

// forget code 
export const RequestForgetpassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Email not found" });
        }

        const token = jwt.sign({ id: user.rows[0].id }, SECRET, { expiresIn: "1h" });
        const resetURL = `http://localhost:8000/forget_password?id=${user.rows[0].id}&token=${token}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL || "neerajkumarsharma013@gmail.com",
                to: user.rows[0].email,
                subject: "Reset Your SONICLAB Password ⚡",
                text: `Reset your password here: ${resetURL}`,
                html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Reset Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #05070a;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #05070a;">
        <tr>
            <td align="center" style="padding: 40px 0 40px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #0b0f1a; border: 1px solid #1e293b; border-radius: 24px; border-collapse: separate;">
                    <tr>
                        <td align="center" style="padding: 40px 30px 40px 30px;">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 30px;">
                                        <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0; letter-spacing: -1px;">
                                            SONIC<span style="color: #4f46e5;">LAB</span>
                                        </h1>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 22px; font-weight: bold; padding-bottom: 15px;">
                                        Reset Your Password
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #94a3b8; font-family: Arial, sans-serif; font-size: 15px; line-height: 24px; padding-bottom: 30px;">
                                        Hey there! We received a request to reset your password for your SONICLAB account. Click the button below to set a new one.
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <div>
                                            <a href="${resetURL}" style="background-color: #4f46e5; border-radius: 12px; color: #ffffff; display: inline-block; font-family: sans-serif; font-size: 14px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 200px; -webkit-text-size-adjust: none;">RESET PASSWORD</a>
                                            </div>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 35px;">
                                <tr>
                                    <td align="center" style="color: #64748b; font-family: Arial, sans-serif; font-size: 12px; line-height: 18px;">
                                        If you didn't request this, you can safely ignore this email. This link will expire in 60 minutes.
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
                                <tr>
                                    <td align="center" style="color: #475569; font-family: Arial, sans-serif; font-size: 11px;">
                                        &copy; 2026 SONICLAB Studio. All rights reserved.
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
            });
        } catch (mailErr) {
            console.log("Mail sending failed:", mailErr);
            return res.status(500).json({ message: "Mail sending failed" });
        }

        res.json({ message: "Reset link sent to your email" });

    } catch (err) {
        console.log("Server error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

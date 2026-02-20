import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { uploadTrack } from "./controllers/trackController.js";
import { RequestForgetpassword, requestLogin, requestRegister } from "./controllers/Auth/auth.js";
import userRoute from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoute);
app.post("/register", requestRegister);
app.post("/login", requestLogin);
app.post('/forget_password', RequestForgetpassword)
// app.get('/profile', getUser)
app.get("/", (req, res) => {
    res.send("<h1>Hello , this is an Express js Server Running !</h1>");
});

app.use('/uploads', express.static('uploads'));
app.use('/projects', projectRoutes);
app.use('/api/tracks', uploadTrack);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

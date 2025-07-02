import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import recipesRoutes from './routes/recipe.js';
import { connectDB } from './config/db.js';//must include extension .js
import path from 'path';
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());//to enable communication between frontend and backend
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production") { //this code check if enviornment variable nodeEnv is set to production
    app.use(express.static(path.join(__dirname, "/vite-project/dist")));//it tells express to serve static files such as html,css,images etc file from specific directory
    app.get("/{*splat}",(req,res) => { //this splat defines a route that matches any get Request so this is catching all routes
        res.sendFile(path.resolve(__dirname, "vite-project","dist", "index.html"));
    });
}//so all this is commonly used to single page application to the frontend javascript handle client side routers
//so all Routes should Return a same index.html file but only when run in production enviornment

app.listen(5000,(req,res)=>{
    connectDB();
    console.log(`server started at port ${PORT}`);
})
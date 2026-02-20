import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();

// Connect once (important for serverless)
connectDB();
connectCloudinary();

// middlewares
app.use(express());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// in case some platform rewrites paths with extra slashes, normalise them
app.use((req, res, next) => {
  req.url = req.url.replace(/\/\/+/g, "/");
  next();
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// 🚨 REMOVE app.listen COMPLETELY
// app.listen(port, ()=> console.log('Server started'));

// ✅ EXPORT instead
export default app;
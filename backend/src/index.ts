import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin"; // Import your router file
import validatorRouter from "./routes/validator"
import studentRouter from "./routes/student"
import Puzzle from 'crypto-puzzle';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/validator", validatorRouter);
app.use("/student", studentRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
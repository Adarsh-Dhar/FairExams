import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import {number, z} from "zod"
import studentMiddleware from "../middleware/student";

const prisma = new PrismaClient();
const router = Router();

// Define the CustomRequest interface to extend Request
interface CustomRequest extends Request {
    student?: any; // Define the type of studentData here
}

const emailschema = z.string().email()
const passwordschema = z.string().min(6)


// student signin
router.post("/signin", async (req: Request, res: Response) => {
    const { email, password, examId } = req.body;
    
    try {
        emailschema.parse(email)
        passwordschema.parse(password)
        const existingStudent = await prisma.student.findUnique({
            where : {
                email : email,
                password : password,
                examId : examId
            }
        })

        if(!existingStudent){
            const newStudent = await prisma.student.create({
                data: {
                    email : email,
                    password: password,
                    examId : examId
                }
            });
            console.log(newStudent)
            res.status(201).json({msg : "new student created", shop : newStudent});
        }else{
            res.status(200).json({msg : "student already exists" , shop : existingStudent})
        }
  } catch (error) {
        console.error(error)
    }
});

export default router;
import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import {number, z} from "zod"
import adminMiddleware from "../middleware/admin";

const prisma = new PrismaClient();
const router = Router();

// Define the CustomRequest interface to extend Request
interface CustomRequest extends Request {
    admin?: any; // Define the type of adminData here
}

const emailschema = z.string().email()
const passwordschema = z.string().min(6)


// admin signin
router.post("/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    try {
        emailschema.parse(email)
        passwordschema.parse(password)
        const existingAdmin = await prisma.admin.findUnique({
            where : {
                email : email,
                password : password
            }
        })

        if(!existingAdmin){
            const newAdmin = await prisma.admin.create({
                data: {
                    email : email,
                    password: password
                }
            });
            console.log(newAdmin)
            res.status(201).json({msg : "new admin created", admin : newAdmin});
        }else{
            res.status(200).json({msg : "admin already exists" , admin : existingAdmin})
        }
  } catch (error) {
        console.error(error)
    }
});

router.get("/exam", async (req: Request, res: Response) => {
    try {
        const exams = await prisma.exam.findMany();
        res.status(200).json(exams);
    }catch(error){
        res.status(500).json({error : "internal server error"})
    }
    
});

router.post("/exam",adminMiddleware, async (req: CustomRequest, res: Response) => {
    const {examName, fee, totalMarks, totalQuestions, maxParticipants, applicationDeadline, examDate, examStartTime, examDuration, totalValidators, essentialValidators} = req.body;

    try {
        const admin = req.admin;
        

    const exam = await prisma.exam.create({
        data: {
            name: examName,
            fee: fee,
            totalMarks: totalMarks,
            totalQuestions: totalQuestions,
            maxParticipants: maxParticipants,
            applicationDeadline: applicationDeadline,
            examDate: examDate,
            examStartTime: examStartTime,
            examDuration: examDuration,
            id: admin.id,
            totalValidators: totalValidators,
            essentialValidators: essentialValidators
        }
    });
    res.status(200).json(exam);
    }catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

   
    })


// show all the product from a shop

export default router
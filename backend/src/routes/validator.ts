import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import {number, z} from "zod"
import validatorMiddleware from "../middleware/validator";

const prisma = new PrismaClient();
const router = Router();

// Define the CustomRequest interface to extend Request
interface CustomRequest extends Request {
    validator?: any; // Define the type of validatorData here
}

const emailschema = z.string().email()
const passwordschema = z.string().min(6)


// validator signin
router.post("/signin", async (req: Request, res: Response) => {
    const { email, password, examId} = req.body;
    
    try {
        emailschema.parse(email)
        passwordschema.parse(password)
        const existingValidator = await prisma.validator.findUnique({
            where : {
                email : email,
                password : password,
                examId : examId
            }
        })

        if(!existingValidator){
            const newValidator = await prisma.validator.create({
                data: {
                    email : email,
                    password: password,
                    examId : examId
                }
            });
            console.log(newValidator)
            res.status(201).json({msg : "new validator created", shop : newValidator});
        }else{
            res.status(200).json({msg : "validator already exists" , shop : existingValidator})
        }
  } catch (error) {
        console.error(error)
    }
});



router.post("/problem", validatorMiddleware, async (req: Request, res: Response) => {
    const {question, option1, option2, option3, option4, correctOption,examId} = req.body;
    console.log(question, option1, option2, option3, option4, correctOption,examId)
    try {
        const problem = await prisma.problems.create({
            data: {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correctOption: correctOption,
                examId: examId
            }
        });
        res.status(201).json({msg : "problem created", problem : problem});
    }catch(error){
        res.status(500).json({error : "internal server error"})
    }

})

// show all the product from a shop

export default router
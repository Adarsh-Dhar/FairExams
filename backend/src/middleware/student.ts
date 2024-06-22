import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtPassword = process.env.JWT_PASSWORD || "student";

interface CustomRequest extends Request {
    student?: any; // Define the type of studentData here
}

async function studentMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const email: string = req.headers.email as string;
    const password: string = req.headers.password as string;

    try {
        // Find the student in the database
        const findstudent = await prisma.student.findUnique({
            where: {
                email: email,
                password: password
            }
        });

        // Check if student exists
        if (!findstudent) {
            return res.status(401).json({ error: "Couldn't find the student" });
        }

        // Generate and verify JWT token
        const token = signJwt(email, password);
        if (!token) {
            return res.status(401).json({ error: "Invalid student or password" });
        }

        const verified = verifyJwt(token, jwtPassword);
        if (!verified) {
            return res.status(401).json({ error: "Invalid token" });
        }

        // Attach student data to request object
        req.student = findstudent;

        next(); // Call next middleware
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

function signJwt(email: string, password: string): string | null {
    

    const payload = { email, password };
    const token = jwt.sign(payload, jwtPassword);
    return token;
}

function verifyJwt(token: string, jwtPassword: string): boolean {
    try {
        jwt.verify(token, jwtPassword);
        console.log("Password is verified");
        return true;
    } catch (error) {
        console.error("Error in JWT verification:", error);
        return false;
    }
}

export default studentMiddleware;
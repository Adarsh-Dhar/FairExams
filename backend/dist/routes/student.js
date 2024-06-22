"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const emailschema = zod_1.z.string().email();
const passwordschema = zod_1.z.string().min(6);
// student signin
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, examId } = req.body;
    try {
        emailschema.parse(email);
        passwordschema.parse(password);
        const existingStudent = yield prisma.student.findUnique({
            where: {
                email: email,
                password: password,
                examId: examId
            }
        });
        if (!existingStudent) {
            const newStudent = yield prisma.student.create({
                data: {
                    email: email,
                    password: password,
                    examId: examId
                }
            });
            console.log(newStudent);
            res.status(201).json({ msg: "new student created", shop: newStudent });
        }
        else {
            res.status(200).json({ msg: "student already exists", shop: existingStudent });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
exports.default = router;

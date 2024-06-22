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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const admin_1 = __importDefault(require("../middleware/admin"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const emailschema = zod_1.z.string().email();
const passwordschema = zod_1.z.string().min(6);
// admin signin
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        emailschema.parse(email);
        passwordschema.parse(password);
        const existingAdmin = yield prisma.admin.findUnique({
            where: {
                email: email,
                password: password
            }
        });
        if (!existingAdmin) {
            const newAdmin = yield prisma.admin.create({
                data: {
                    email: email,
                    password: password
                }
            });
            console.log(newAdmin);
            res.status(201).json({ msg: "new admin created", admin: newAdmin });
        }
        else {
            res.status(200).json({ msg: "admin already exists", admin: existingAdmin });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
router.post("/exam", admin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { examName, fee, totalMarks, totalQuestions, maxParticipants, applicationDeadline, examDate, examStartTime, examDuration, totalValidators, essentialValidators } = req.body;
    try {
        const admin = req.admin;
        const exam = yield prisma.exam.create({
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
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// show all the product from a shop
exports.default = router;

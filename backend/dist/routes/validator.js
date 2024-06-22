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
const validator_1 = __importDefault(require("../middleware/validator"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const emailschema = zod_1.z.string().email();
const passwordschema = zod_1.z.string().min(6);
// validator signin
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, examId } = req.body;
    try {
        emailschema.parse(email);
        passwordschema.parse(password);
        const existingValidator = yield prisma.validator.findUnique({
            where: {
                email: email,
                password: password,
                examId: examId
            }
        });
        if (!existingValidator) {
            const newValidator = yield prisma.validator.create({
                data: {
                    email: email,
                    password: password,
                    examId: examId
                }
            });
            console.log(newValidator);
            res.status(201).json({ msg: "new validator created", shop: newValidator });
        }
        else {
            res.status(200).json({ msg: "validator already exists", shop: existingValidator });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
router.get("/exam", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exams = yield prisma.exam.findMany();
        res.status(200).json(exams);
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}));
router.post("/problem", validator_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, option1, option2, option3, option4, correctOption, examId } = req.body;
    console.log(question, option1, option2, option3, option4, correctOption, examId);
    try {
        const problem = yield prisma.problems.create({
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
        res.status(201).json({ msg: "problem created", problem: problem });
    }
    catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
}));
// show all the product from a shop
exports.default = router;

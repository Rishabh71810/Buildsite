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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const prompts_1 = require("./prompts");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const prompt = req.body.prompt;
    try {
        const response = yield groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-70b-8192",
            max_tokens: 200,
            temperature: 0,
        });
        if (!((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content)) {
            throw new Error('Invalid response from Groq API');
        }
        const answer = response.choices[0].message.content.trim().toLowerCase();
        if (answer === "react") {
            res.json({
                prompts: [
                    prompts_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [react_1.basePrompt],
            });
        }
        else if (answer === "node") {
            res.json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [node_1.basePrompt],
            });
        }
        else {
            res.status(403).json({ message: "You can't access this." });
        }
    }
    catch (err) {
        console.error("Template Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    try {
        const response = yield groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: (0, prompts_1.getSystemPrompt)(),
                },
                ...messages,
            ],
            model: "llama3-70b-8192",
            max_tokens: 8000,
            temperature: 0.7,
        });
        res.json({
            response: response.choices[0].message.content,
        });
    }
    catch (err) {
        console.error("Chat Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(3000, () => console.log("Groq API Server running on port 3000"));

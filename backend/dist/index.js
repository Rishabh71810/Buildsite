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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// Default
// Default
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const prompts_1 = require("./prompts");
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield groq.chat.completions
            .create({
            messages: [
                {
                    role: "system",
                    content: (0, prompts_1.getSystemPrompt)()
                },
                {
                    role: "user",
                    content: "create a todo application using react and typescript with a backend",
                },
            ],
            stream: true,
            temperature: 0.7,
            model: "llama-3.3-70b-versatile"
        })
            .then((stream) => __awaiter(this, void 0, void 0, function* () {
            var _a, stream_1, stream_1_1;
            var _b, e_1, _c, _d;
            var _e, _f;
            try {
                for (_a = true, stream_1 = __asyncValues(stream); stream_1_1 = yield stream_1.next(), _b = stream_1_1.done, !_b; _a = true) {
                    _d = stream_1_1.value;
                    _a = false;
                    const chunk = _d;
                    process.stdout.write(((_f = (_e = chunk.choices[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content) || "");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = stream_1.return)) yield _c.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
    });
}
main();

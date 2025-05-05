"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.summarize = summarize;
exports.translate = translate;
const dotenv = __importStar(require("dotenv")); // Proper import for dotenv.
// Load environment variables from .env file.
dotenv.config();
// Manually configure the API key since `configure` is not available.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";
// A placeholder for the AI generation function. Replace this with the actual implementation.
function generate(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // Simulate generating a response (replace this with the actual genai function).
        return Promise.resolve(`Generated response for: ${prompt}`);
    });
}
/**
 * Summarizes the given text using the AI model.
 * @param text The text to summarize.
 * @returns A promise that resolves to the summarized text.
 */
function summarize(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Summarize this text: ${text}`;
        return generate(prompt);
    });
}
/**
 * Translates the given text to the specified target language using the AI model.
 * @param text The text to translate.
 * @param targetLang The target language for the translation (e.g., "fr" for French).
 * @returns A promise that resolves to the translated text.
 */
function translate(text, targetLang) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompt = `Translate this to ${targetLang}: ${text}`;
        return generate(prompt);
    });
}

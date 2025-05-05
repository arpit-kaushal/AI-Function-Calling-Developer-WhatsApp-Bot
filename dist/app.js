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
const whatsapp_web_js_1 = require("whatsapp-web.js"); // Import necessary classes
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal")); // Import the QR code terminal package
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(), // Use LocalAuth to persist the session
});
// Handle the 'qr' event to display the QR code in the terminal
client.on('qr', (qr) => {
    console.log('Scan the QR code below to log into WhatsApp:');
    qrcode_terminal_1.default.generate(qr, { small: true });
});
// Event listener for when the client is ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});
// Event listener for when the client is authenticated
client.on('authenticated', () => {
    console.log('Client is authenticated!');
});
// Event listener for authentication failure
client.on('auth_failure', (msg) => {
    console.error('Authentication failure:', msg);
});
// Event listener for when the client gets disconnected
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
    console.log('Restarting the client...');
    client.initialize(); // Reinitialize the client
});
// Event listener for incoming messages
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Message received: ${message.body}`);
    const lowerCaseMessage = message.body.toLowerCase();
    // Check if the message starts with the command "summarize:"
    if (lowerCaseMessage.startsWith('summarize:')) {
        const textToSummarize = message.body.slice(10).trim(); // Extract the text after "summarize:"
        if (textToSummarize) {
            const summary = `Summary: ${textToSummarize.substring(0, 50)}...`; // Generate a basic summary
            message.reply(summary); // Send the summary as a reply
        }
        else {
            message.reply("Please provide some text to summarize after the 'summarize:' command.");
        }
    }
    // Default response for unrecognized commands
    else {
        message.reply("Sorry, I didn't understand that. Please try again.");
    }
}));
// Initialize the WhatsApp client
client.initialize();

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
exports.createWebSocketServer = createWebSocketServer;
const ws_1 = require("ws"); // Import WebSocketServer from ws library.
/**
 * Creates and starts a WebSocket server.
 * @param handleMessage A function that processes incoming messages and returns a response.
 */
function createWebSocketServer(handleMessage) {
    // Initialize the WebSocket server on port 8080.
    const wss = new ws_1.WebSocketServer({ port: 8080 });
    // Event listener for new WebSocket connections.
    wss.on("connection", (ws) => {
        console.log("WebSocket connection established");
        // Event listener for incoming messages from the client.
        ws.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
            const message = data.toString(); // Convert the raw data to a string.
            console.log("Received:", message);
            try {
                const response = yield handleMessage(message); // Process the message using the provided function.
                ws.send(response); // Send the processed response back to the client.
            }
            catch (error) {
                console.error("Error processing message:", error);
                ws.send("An error occurred while processing your request.");
            }
        }));
        // Event listener for when the connection is closed.
        ws.on("close", () => {
            console.log("WebSocket connection closed");
        });
    });
    console.log("WebSocket server is running on ws://localhost:8080");
}

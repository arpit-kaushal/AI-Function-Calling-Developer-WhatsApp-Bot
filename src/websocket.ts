import { WebSocketServer } from "ws"; // Import WebSocketServer from ws library.

/**
 * Creates and starts a WebSocket server.
 * @param handleMessage A function that processes incoming messages and returns a response.
 */
export function createWebSocketServer(handleMessage: (message: string) => Promise<string>) {
  // Initialize the WebSocket server on port 8080.
  const wss = new WebSocketServer({ port: 8080 });

  // Event listener for new WebSocket connections.
  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");

    // Event listener for incoming messages from the client.
    ws.on("message", async (data) => {
      const message = data.toString(); // Convert the raw data to a string.
      console.log("Received:", message);

      try {
        const response = await handleMessage(message); // Process the message using the provided function.
        ws.send(response); // Send the processed response back to the client.
      } catch (error) {
        console.error("Error processing message:", error);
        ws.send("An error occurred while processing your request.");
      }
    });

    // Event listener for when the connection is closed.
    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  console.log("WebSocket server is running on ws://localhost:8080");
}
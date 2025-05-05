import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { translate } from '@vitalets/google-translate-api'; // Import the `translate` method directly

// Initialize the WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'bot-client', // Optional unique ID for multiple sessions
        rmMaxRetries: 5, // Retry deletion up to 5 times
    }),
    puppeteer: {
        executablePath: require('puppeteer').executablePath(),
        headless: true, // Run without a GUI
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Avoid sandboxing issues
        timeout: 60000, // Increase timeout to handle slower systems
    },
});

// Function to initialize the client with retry logic
let initializing = false;
const initializeClient = () => {
    if (initializing) return; // Prevent multiple initializations
    initializing = true;

    client.initialize().catch((error) => {
        console.error('Error during initialization:', error);
        initializing = false;
        setTimeout(initializeClient, 5000); // Retry after 5 seconds
    });
};

// Handle the 'qr' event to display the QR code in the terminal
client.on('qr', (qr) => {
    console.log('Scan the QR code below to log into WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Event listener for when the client is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
    initializing = false; // Reset initialization status
});

// Event listener for authentication failures
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
    console.log('Reinitializing the client...');
    initializeClient(); // Retry initialization
});

// Event listener for disconnections
client.on('disconnected', (reason) => {
    console.error('Client was disconnected:', reason);
    console.log('Reinitializing the client...');
    initializeClient(); // Reinitialize the client
});

// Event listener for incoming messages
client.on('message', async (message) => {
    const receivedMessage = message.body.trim(); // Normalize and trim the message
    console.log(`Message received: ${receivedMessage}`);

    try {
        // Handle "summarize:" command
        if (receivedMessage.toLowerCase().startsWith('summarize:')) {
            const textToSummarize = message.body.slice(10).trim(); // Extract text after "summarize:"
            if (textToSummarize) {
                const summary = textToSummarize.length > 50
                    ? `Summary: ${textToSummarize.substring(0, 50)}...`
                    : `Summary: ${textToSummarize}`;
                message.reply(summary);
            } else {
                message.reply("Please provide some text to summarize after the 'summarize:' command.");
            }
            return; // Exit after handling the command
        }

        // Handle "translate to <language>:" command
        if (receivedMessage.toLowerCase().startsWith('translate to')) {
            const commandParts = receivedMessage.split(':'); // Split the message into parts
            if (commandParts.length >= 2) {
                const language = commandParts[0].slice(12).trim(); // Extract language from "translate to <language>"
                const textToTranslate = commandParts.slice(1).join(':').trim(); // Extract the text to translate

                // Check if both language and text are provided
                if (language && textToTranslate) {
                    const result = await translate(textToTranslate, { to: language.toLowerCase() });
                    message.reply(`Translation (${language}): ${result.text}`);
                } else {
                    message.reply("Please provide both a target language and text to translate in the format 'translate to <language>: <text>'.");
                }
            } else {
                message.reply("Please provide both a target language and text to translate in the format 'translate to <language>: <text>'.");
            }
            return; // Exit after handling the command
        }

        // Fallback for unsupported commands
        message.reply("Sorry, I didn't understand that. Please try again with supported commands like:\n- `summarize: <text>`\n- `translate to <language>: <text>`");
    } catch (error) {
        console.error('Error processing message:', error);
        message.reply('An error occurred while processing your request. Please try again later.');
    }
});

// Start the WhatsApp client
initializeClient();
# AI Function Calling Developer WhatsApp Bot

This project is a **WhatsApp bot** built using [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js). The bot can summarize text and translate messages into different languages using the [@vitalets/google-translate-api](https://github.com/vitalets/google-translate-api).

## Features

- **Summarization**: Summarizes long text messages into shorter versions.
- **Translation**: Translates text into the specified language.
- **Automatic Reconnection**: Handles disconnections and authentication failures gracefully.
- **Error Handling**: Provides meaningful feedback for invalid commands and errors.

---

## Commands

The bot supports the following commands:

### 1. **Summarize**
- **Command**: `summarize: <text>`
- **Description**: Summarizes the provided text into a shorter version.
- **Example**:
  - Input: `summarize: This is a long message that I want to summarize for better readability.`
  - Output: `Summary: This is a long message that I want to summarize...`

### 2. **Translate**
- **Command**: `translate to <language>: <text>`
- **Description**: Translates the provided text into the specified language.
- **Example**:
  - Input: `translate to fr: Hello, how are you?`
  - Output: `Translation (fr): Bonjour, comment ça va ?`
  - Input: `translate to es: Good morning!`
  - Output: `Translation (es): ¡Buenos días!`

### 3. **Fallback Message**
- If the command is not recognized, the bot responds with:
  ```
  Sorry, I didn't understand that. Please try again with supported commands like:
  - summarize: <text>
  - translate to <language>: <text>
  ```

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** (bundled with Node.js)
- A **WhatsApp account**

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/arpit-kaushal/AI-Function-Calling-Developer-WhatsApp-Bot.git
   cd AI-Function-Calling-Developer-WhatsApp-Bot
   ```

2. **Install Dependencies**:
   Install the required npm packages:
   ```bash
   npm install
   ```

   This will install:
   - `whatsapp-web.js` for interacting with WhatsApp Web
   - `qrcode-terminal` for generating QR codes
   - `@vitalets/google-translate-api` for translations
   - `puppeteer` for headless browser automation

3. **Run the Bot**:
   Start the bot using the following command:
   ```bash
   npx ts-node src/app.ts
   ```

4. **Authenticate**:
   - A QR code will appear in the terminal.
   - Scan the QR code using the **WhatsApp mobile app**.
   - The bot will log in and start listening for messages.

---

## Project Structure

```
my-new-project/
├── src/
│   ├── app.ts                # Main bot logic
├── node_modules/             # Installed dependencies
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

---

## Usage

### Start the Bot
1. Open a terminal and navigate to the project directory:
   ```bash
   cd C:\Users\arpit\Desktop\my-new-project
   ```
2. Start the bot:
   ```bash
   npx ts-node src/app.ts
   ```

### Send Commands
- Open WhatsApp and send a message to the bot using one of the supported commands:
  - `summarize: <text>`
  - `translate to <language>: <text>`

---

## Troubleshooting

### 1. **Puppeteer Errors**
If you encounter errors related to Puppeteer, ensure the following:
- Install required dependencies:
  - On Windows: Install the **latest Microsoft Visual C++ Redistributable**.
  - On Linux:
    ```bash
    sudo apt-get install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
    ```
- Ensure sufficient system resources (RAM, CPU).

### 2. **Session Persistence**
- The bot uses `LocalAuth` to persist the login session.
- If you want to reset the session, delete the `.wwebjs_auth` folder:
  ```bash
  rmdir /s /q .wwebjs_auth  # On Windows
  rm -rf .wwebjs_auth       # On Linux/macOS
  ```

### 3. **Common Errors**
| Error Message                                  | Solution                                                                                      |
|-----------------------------------------------|----------------------------------------------------------------------------------------------|
| `Error: Failed to launch the browser process` | Ensure Puppeteer dependencies are installed (see above). Increase timeout if needed.         |
| `Error: Authentication failed`                | Restart the bot and re-scan the QR code.                                                     |
| `TypeError: translateAPI is not a function`   | Ensure `@vitalets/google-translate-api` is correctly installed and imported in `app.ts`.     |
| `Command not recognized`                      | Ensure the message is formatted correctly as per the supported commands.                     |

---

## Automating Bot Startup

### Create a Batch File (Windows)
1. Open Notepad and paste the following:
   ```cmd
   cd C:\Users\arpit\Desktop\my-new-project
   npx ts-node src/app.ts
   ```
2. Save the file as `start-bot.bat` in your project directory.
3. Double-click the batch file to start the bot.

### Create a Shell Script (Linux/macOS)
1. Create a file named `start-bot.sh`:
   ```bash
   #!/bin/bash
   cd /path/to/my-new-project
   npx ts-node src/app.ts
   ```
2. Make the script executable:
   ```bash
   chmod +x start-bot.sh
   ```
3. Run the script:
   ```bash
   ./start-bot.sh
   ```

---

## Future Enhancements

Some ideas for future development:
- Add more commands (e.g., weather, jokes, etc.).
- Deploy the bot on a server or cloud platform.
- Add logging and monitoring for better debugging.
- Implement a database to store user interactions.

---


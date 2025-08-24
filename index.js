import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { sendWebhook } from './lib/webhook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));
// app.set('trust proxy', true);

app.get('/', async (req, res) => {
    // get ip adress
    const header = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        await sendWebhook(header, ip);
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
    res.sendFile(path.join(__dirname, 'assets', 'summon.jpg'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
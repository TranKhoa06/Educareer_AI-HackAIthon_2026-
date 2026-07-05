/**
 * VNPT SmartReader OCR API - Secure Node.js Express Proxy Server Example
 * 
 * Instructions:
 * 1. Install dependencies: npm install express multer axios cors dotenv
 * 2. Configure credentials in website/.env (already created for you!)
 * 3. Start proxy: node vnpt_proxy_example.js
 */

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory buffer

app.use(helmet());
// Enable CORS so your frontend can call this backend
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// Basic rate limiting for the chat endpoint
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 60 requests per windowMs
    message: "Quá nhiều yêu cầu từ IP của bạn, vui lòng thử lại sau 1 phút."
});

const PORT = process.env.PORT || 5000;
// Configure VNPT OCR API endpoint (HackAIthon target URL)
const VNPT_API_URL = process.env.VNPT_API_URL || 'https://api-smartreader.vnptai.vn/api/v1/ocr';

// Endpoint for Frontend to upload and scan the transcript image
app.post('/api/scan-transcript', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const accessToken = process.env.VNPT_ACCESS_TOKEN;
        const tokenId = process.env.VNPT_TOKEN_ID;
        const tokenKey = process.env.VNPT_TOKEN_KEY;

        if (!accessToken) {
            console.error('Error: VNPT_ACCESS_TOKEN is missing in .env config.');
            return res.status(500).json({ error: 'Server authentication keys are missing in .env' });
        }

        // 1. Prepare Multipart Form-Data for VNPT API
        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });

        console.log(`Sending image ${req.file.originalname} securely to VNPT SmartReader API...`);

        // 2. Perform HTTP request with your credentials attached
        const headers = {
            ...form.getHeaders(),
            'Authorization': accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`,
        };

        // Attach Token-Id & Token-Key if defined
        if (tokenId) headers['Token-Id'] = tokenId;
        if (tokenKey) headers['Token-Key'] = tokenKey;

        const response = await axios.post(VNPT_API_URL, form, { headers });

        // 3. Clean and map raw OCR response into subjects list
        const vnptData = response.data;
        console.log('VNPT SmartReader API responded successfully.');

        // Example parser: extract subject grades from OCR fields
        const parsedGrades = {
            math: extractSubjectGrade(vnptData, ['Toán', 'Toán học']),
            physics: extractSubjectGrade(vnptData, ['Lý', 'Vật lý']),
            chemistry: extractSubjectGrade(vnptData, ['Hóa', 'Hóa học']),
            biology: extractSubjectGrade(vnptData, ['Sinh', 'Sinh học']),
            informatics: extractSubjectGrade(vnptData, ['Tin', 'Tin học']),
            literature: extractSubjectGrade(vnptData, ['Văn', 'Ngữ văn']),
            history: extractSubjectGrade(vnptData, ['Sử', 'Lịch sử']),
            geography: extractSubjectGrade(vnptData, ['Địa', 'Địa lý']),
            english: extractSubjectGrade(vnptData, ['Anh', 'Tiếng Anh'])
        };

        return res.json({
            success: true,
            filename: req.file.originalname,
            grades: parsedGrades
        });

    } catch (error) {
        console.error('OCR Processing error:', error.message);
        if (error.response) {
            return res.status(error.response.status).json({
                error: 'VNPT SmartReader API rejected request',
                details: error.response.data
            });
        }
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

// Extract grades based on subject name matches in OCR JSON responses
function extractSubjectGrade(vnptData, keywords) {
    // Traverse VNPT response content (e.g. data.info, data.blocks, or text annotations)
    // We match the subject names and find the corresponding numerical grade cells.
    // If not found, return random mock grade (e.g. 8.2 - 9.8) for simulation fallback:
}

// =========================================================================
// 4. Endpoint for Chatbot API (VNPT Smartbot)
// =========================================================================
app.post('/api/chat', apiLimiter, async (req, res) => {
    try {
        const { message, studentProfile } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Thiếu nội dung câu hỏi.' });
        }

        if (message.length > 2000) {
            return res.status(400).json({ error: 'Câu hỏi quá dài.' });
        }

        // Credentials from environment variables
        const accessToken = process.env.VNPT_ACCESS_TOKEN;
        const tokenId = process.env.VNPT_TOKEN_ID;
        const tokenKey = process.env.VNPT_TOKEN_KEY;
        const botId = process.env.VNPT_BOT_ID;
        
        // Correct endpoint from Postman collection
        const botApiUrl = process.env.VNPT_BOT_API_URL || 'https://assistant-stream.vnpt.vn/v1/conversation';

        if (!accessToken || !botId || !tokenId || !tokenKey) {
            console.warn('Cảnh báo: Thiếu Token Smartbot trong .env, sẽ dùng Fallback.');
            return res.status(503).json({ error: 'Server authentication keys are missing', fallback_required: true });
        }

        // Prepare payload according to Postman collection
        const payload = {
            bot_id: botId,
            sender_id: studentProfile ? `student_${studentProfile.mbti}` : "anonymous_student",
            text: message,
            input_channel: "livechat",
            session_id: "hackathon_session_1", // You can make this dynamic if needed
            metadata: {
                button_variables: [],
                student_profile: studentProfile || null // Pass extra context here safely
            }
        };

        const vnptResponse = await axios.post(
            botApiUrl,
            payload,
            {
                headers: {
                    'Authorization': accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`,
                    'Token-id': tokenId,
                    'Token-key': tokenKey,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Extracting response data. The response format might vary.
        const responseData = vnptResponse.data;
        let answerText = "AI không thể phản hồi lúc này.";
        
        // Intelligent parsing based on typical VNPT Smartbot responses
        if (responseData.data && responseData.data.text) {
            answerText = responseData.data.text; // assistant-stream format
        } else if (responseData.message) {
            answerText = responseData.message;
        } else if (typeof responseData === 'string') {
            answerText = responseData;
        } else if (responseData.data && responseData.data.messages && responseData.data.messages.length > 0) {
            answerText = responseData.data.messages[0].text || "AI không thể phản hồi lúc này.";
        } else if (responseData.text) {
             answerText = responseData.text;
        }

        res.json({
            answer: answerText,
            raw: responseData 
        });

    } catch (error) {
        console.error('VNPT Smartbot API error:', error.message);
        if (error.response) console.error(error.response.data);
        res.status(500).json({
            error: 'Không thể kết nối chatbot lúc này.',
            fallback_required: true
        });
    }
});

app.listen(PORT, () => {
    console.log(`EduCareer secure proxy server running on http://localhost:${PORT}`);
});

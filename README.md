# EduCareer AI

<p align="center">
  <strong>AI-powered career guidance and competency exploration platform for Vietnamese students</strong>
</p>

<p align="center">
  <a href="https://educareer-ai-hack-a-ithon-2026.vercel.app/">
    Live Demo
  </a>
  ·
  <a href="https://github.com/TranKhoa06/Educareer_AI-HackAIthon_2026-/issues">
    Report a Bug
  </a>
  ·
  <a href="https://github.com/TranKhoa06/Educareer_AI-HackAIthon_2026-/issues">
    Request a Feature
  </a>
</p>

---

## About the Project

EduCareer AI is an open-source educational technology project developed for HackAIthon 2026.

The platform is designed to help Vietnamese middle-school and high-school students better understand their academic strengths, interests, personality traits, practical abilities, and potential career pathways.

Many students must make important decisions about subject combinations, university majors, and future careers while having limited access to personalized career counseling. Career information is often fragmented or too general to reflect the unique abilities and interests of each student.

EduCareer AI aims to address this challenge by combining academic information, self-assessment tools, competency visualization, artificial intelligence, and interactive career experiences in one accessible platform.

The platform is intended to support students during career exploration. It does not replace teachers, career counselors, parents, or professional educational advice.

---

## Project Goals

EduCareer AI aims to:

- Make personalized career exploration more accessible to Vietnamese students.
- Help students better understand their academic strengths and personal abilities.
- Connect academic results, interests, personality traits, and practical skills.
- Explain why a career field may be suitable instead of providing only a list of recommendations.
- Help students identify skills they may need to improve.
- Provide understandable Vietnamese-language career information.
- Support teachers, parents, and career counselors with educational technology.
- Build an open-source community involving developers, educators, students, and researchers.

---

## Main Features

### 1. Academic Transcript Analysis

Students can provide academic information through transcript input and OCR-assisted processing.

The system helps organize academic results and identify potential subject strengths.

Main functions:

- OCR-assisted academic transcript extraction.
- Academic score organization.
- Subject-strength analysis.
- Academic profile generation.
- Input validation and correction.

---

### 2. Career Interest and Personality Assessments

EduCareer AI combines multiple assessment approaches to help students explore different aspects of themselves.

Current assessment components include:

- Holland RIASEC career-interest assessment.
- MBTI-inspired personality dimensions.
- Big Five personality traits.
- Personal values and career preferences.

Assessment results are used as supporting information and should not be interpreted as fixed labels or final conclusions about a student's future.

---

### 3. Personal Competency Map

The competency map combines multiple sources of information, including:

- Academic performance.
- Career interests.
- Personality-related assessment results.
- Personal values.
- Practical activity results.
- Career simulation performance.

The goal is to provide students with an understandable overview of their current strengths and areas for future development.

---

### 4. AI-Assisted Career Guidance

The AI career guidance module analyzes the available student profile and provides personalized career exploration suggestions.

The system may explain:

- Career fields that may be worth exploring.
- Why a field may match the student's current profile.
- Relevant academic strengths.
- Skills that should be developed.
- Possible learning pathways.
- Questions for further self-reflection.

AI-generated suggestions are intended for educational exploration and should not be treated as guaranteed outcomes or professional decisions.

---

### 5. Career Knowledge Base

The platform provides structured information about career fields and educational pathways.

Information may include:

- Career descriptions.
- Typical responsibilities.
- Important skills.
- Suitable academic subjects.
- Educational pathways.
- Related university majors.
- Career opportunities.
- Suggested learning directions.

The knowledge base is being continuously reviewed and expanded.

---

### 6. “A Day in the Career” Simulations

Interactive activities allow students to experience simplified tasks inspired by real career fields.

Current and planned career simulations include:

- Software Engineering.
- Artificial Intelligence.
- Semiconductor Engineering.
- Data Science.
- Cybersecurity.
- Engineering and Technology.
- Business and Economics.
- Healthcare.
- Education.

These activities are simplified educational simulations and do not represent the complete professional experience of each career.

---

### 7. Automated Feedback

Some activities provide structured scores, comments, and improvement suggestions.

The purpose is to help students:

- Recognize current strengths.
- Understand areas that need improvement.
- Receive constructive feedback.
- Explore suitable learning activities.

---

## Target Users

EduCareer AI is designed for:

- Middle-school students exploring future educational pathways.
- High-school students considering university majors and careers.
- Teachers supporting career-orientation activities.
- Career counselors using digital educational tools.
- Parents supporting their children's educational decisions.
- Developers interested in open-source educational technology.
- Researchers exploring responsible AI applications in education.

---

## Technology Stack

The current project uses:

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- VNPT SmartReader API
- VNPT Smartbot
- Vercel

The project currently uses a static web interface together with supporting backend proxy components.

---

## Project Structure

```text
Educareer_AI-HackAIthon_2026-
│
├── Data/                    # Project datasets
├── game/                    # Career simulation activities
├── images/                  # Images and visual resources
├── music/                   # Audio resources
├── pages/                   # Additional website pages
├── tri-thuc-chatbot/        # Career knowledge for the AI chatbot
│
├── index.html               # Main website page
├── ai-tu-van.html           # AI career counseling interface
├── ban-do-nang-luc.html     # Personal competency map
├── ocr-hoc-ba.html          # Academic transcript OCR interface
├── cam-nang-nganh.html      # Career knowledge interface
├── industries-data.js       # Structured career information
├── ocr-handler.js           # OCR processing logic
├── app.js                   # Main application logic
├── style.css                # Main website styles
│
├── vnpt_proxy_example.js    # Node.js API proxy example
├── vnpt_proxy_example.py    # Python API proxy example
├── package.json             # Node.js dependencies
├── .env.example             # Environment variable example
└── vercel.json              # Vercel deployment configuration
```

---

## Getting Started

### Prerequisites

Install:

- Git
- Node.js 18 or later
- npm

---

### Clone the Repository

```bash
git clone https://github.com/TranKhoa06/Educareer_AI-HackAIthon_2026-.git
```

Move into the project directory:

```bash
cd Educareer_AI-HackAIthon_2026-
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a local `.env` file from `.env.example`.

Windows:

```bash
copy .env.example .env
```

macOS or Linux:

```bash
cp .env.example .env
```

Open `.env` and add your own API credentials.

Example:

```env
PORT=5000

VNPT_API_URL=your_vnpt_api_url

VNPT_ACCESS_TOKEN=your_access_token
VNPT_TOKEN_ID=your_token_id
VNPT_TOKEN_KEY=your_token_key

VNPT_BOT_API_URL=your_bot_api_url
VNPT_BOT_ID=your_bot_id
VNPT_INTEGRATION_ID=your_integration_id
```

Never commit your real API tokens or secret credentials to GitHub.

---

### Start the Backend Proxy

```bash
npm start
```

The default local server runs on:

```text
http://localhost:5000
```

---

### Run the Frontend

You can open `index.html` directly or use a local web server.

For Visual Studio Code, the Live Server extension can be used.

---

## Security and Privacy

EduCareer AI may process educational information such as academic scores, interests, and assessment results.

The project aims to follow these principles:

- Collect only information necessary for the requested feature.
- Avoid exposing private student information.
- Never publish API keys or access tokens.
- Validate user input.
- Use environment variables for private credentials.
- Explain how student information is processed.
- Avoid treating AI-generated recommendations as final decisions.

Do not commit the `.env` file to the repository.

---

## Responsible AI Principles

EduCareer AI is designed as a decision-support and career-exploration tool.

The project follows these principles:

- AI should support human decision-making, not replace it.
- Career recommendations should include understandable explanations.
- AI should acknowledge uncertainty when information is incomplete.
- Assessment results should not permanently label students.
- Recommendations should avoid guarantees about academic or career success.
- Students should be encouraged to consult teachers, parents, counselors, and reliable educational sources.
- Important educational information should be reviewed before publication.

---

## Project Status

EduCareer AI is currently under active development.

Current priorities include:

- Improving source-code organization.
- Expanding automated testing.
- Improving mobile responsiveness.
- Improving accessibility.
- Expanding the Vietnamese career knowledge base.
- Reviewing AI-generated guidance quality.
- Improving privacy and security.
- Adding more career simulations.
- Improving documentation for contributors.
- Collecting feedback from students and educators.

The project is currently an early-stage open-source prototype. Features and data may change during development.

---

## Roadmap

### Phase 1 — Hackathon Prototype

- Academic transcript OCR.
- Career-interest assessments.
- Personality-related assessments.
- Personal competency map.
- AI-assisted career counseling.
- Initial career knowledge base.
- Initial career simulation activities.

### Phase 2 — Open-Source Foundation

- Improve README and developer documentation.
- Add contribution guidelines.
- Improve project architecture.
- Add issue and pull-request templates.
- Expand testing.
- Improve accessibility.
- Improve privacy documentation.

### Phase 3 — Educational Validation

- Collect structured student feedback.
- Collect teacher and counselor feedback.
- Review recommendation quality.
- Improve career knowledge accuracy.
- Evaluate usability and accessibility.

### Phase 4 — Community Expansion

- Add more career simulations.
- Expand educational datasets.
- Support external contributors.
- Publish reusable educational resources.
- Build collaboration opportunities with educators and researchers.

---

## Contributing

Contributions are welcome.

You can contribute by:

- Reporting bugs.
- Suggesting new features.
- Improving documentation.
- Improving accessibility.
- Adding test cases.
- Reviewing career information.
- Adding career simulations.
- Improving Vietnamese-language content.
- Reviewing responsible-AI practices.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

---

## Reporting Issues

When reporting a problem, please include:

- A clear description.
- Steps to reproduce the issue.
- Expected behavior.
- Actual behavior.
- Browser and operating system.
- Screenshots when helpful.

Please do not include API keys, access tokens, private student information, or other sensitive data.

---

## Disclaimer

EduCareer AI is an educational career-exploration tool.

The platform does not provide professional psychological assessment, official admission decisions, guaranteed career predictions, medical advice, or legal advice.

Career recommendations are suggestions for exploration and should be considered together with information from teachers, parents, career counselors, educational institutions, and other reliable sources.

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for more information.

---

## Acknowledgements

EduCareer AI was developed as part of HackAIthon 2026.

We appreciate feedback and contributions from students, educators, developers, career counselors, researchers, and members of the open-source community.

---

## Contact

Repository:

https://github.com/TranKhoa06/Educareer_AI-HackAIthon_2026-

Live demo:

https://educareer-ai-hack-a-ithon-2026.vercel.app/

# MediMate - Your Intelligent Healthcare Assistant

MediMate is a specialized AI-powered healthcare platform designed specifically for the Indian context. Unlike general-purpose chatbots, MediMate provides structured, clinically-guided symptom analysis, medicine information, and emergency guidance.

## 🚀 Features

### 1. Symptom Checker (AI Triage)
- **Guided Conversation**: Uses a step-by-step MCQ flow similar to a real doctor's intake form.
- **Clinical Triage**: Narrows down possible conditions and provides actionable next steps.
- **Privacy First**: Encrypted and private triage sessions.

### 2. Medicine Analyzer
- **India-Specific Database**: Search for medicines available in the Indian market (e.g., Dolo 650, Combiflam).
- **Comprehensive Info**: Get details on dosage, timing, side effects, warnings, and storage.
- **Purchase Links**: Direct links to trusted Indian pharmacies like 1mg, PharmEasy, and Netmeds.

### 3. Emergency First Aid Guide
- **Critical Protocols**: Step-by-step guidance for emergencies like heart attacks, choking, and burns.
- **Panic Mitigation**: Built-in "Emergency Calm Regulator" (Box Breathing Pacer) to help users stay focused during crises.
- **Local Context**: Integrated Indian emergency numbers (108, 100, 101).

### 4. Health History & Tracking
- **Visual Timeline**: Automatically tracks symptom logs over time.
- **Health Score**: A visual graph showing health trends over the last 14 days.
- **Streak Tracking**: Encourages consistent health monitoring.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16.2.6](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Engine**: [Groq SDK](https://groq.com/) (using `llama-3.3-70b-versatile` model)
- **Charts**: [Recharts](https://recharts.org/)
- **Content Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)

---

## 💻 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun
- A Groq API Key (Get it from [Groq Cloud](https://console.groq.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd medimate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (NavBar, Footer, ChatBubble, etc.).
- `/lib`: Utility functions, data constants (disease database, first aid data), and system prompts.
- `/public`: Static assets like icons and images.

---

## ⚠️ Disclaimer

MediMate provides general health information and is for educational purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for any medical concerns. In case of a serious emergency, dial **108** immediately.

---
Built for the **Beyond Tomorrow Hackathon**.

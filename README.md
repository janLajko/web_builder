<<<<<<< HEAD
<div align="center">

# 🚀 DivStack AI - Next-Gen AI Website Builder

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI API" />
</p>

**Generate production-ready, beautiful, and fully responsive websites in seconds using the power of Generative AI. Built for developers, designers, and creators.**

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

<br />

## 🌟 Overview

**DivStack AI** is a state-of-the-art AI-powered SaaS platform that transforms natural language prompts into fully functional, uniquely styled websites. Leveraging advanced Large Language Models (LLMs) via OpenRouter, DivStack AI intelligent writes clean HTML, inline Javascript, and Tailwind CSS, presenting a live preview to users instantly.

It features a robust tech stack (PERN stack with React + Vite), a beautiful dark-themed GUI, live code preview, version rollback, and seamless iteration through conversational AI prompts.

## ✨ Key Features

- **🤖 AI-Powered Generation**: Instantly build websites from a single text prompt using top-tier models like `z-ai/glm-4.5-air:free`.
- **💬 Conversational UI/UX**: Ask the AI to make specific layout changes, change color palettes, or rewrite content through an intuitive chat interface.
- **🔄 Live Live Engine**: Real-time rendering of the generated code inside beautiful, responsive device mockups (Desktop, Tablet, Mobile).
- **⏳ Version Control**: Automatically saves iterations. Easily rollback to any previously generated state with a single click.
- **💾 Download & Deploy**: Export clean, production-ready HTML/Tailwind code with zero bloat to host anywhere.
- **💳 Credit System & Auth**: Fully integrated authentication (Better Auth) and credit management system out of the box.
- **✨ Stunning UI**: Premium dark-mode interface inspired by the best developer tools, featuring glassmorphism, micro-animations, and fluid transitions.

## 🛠️ Technology Stack

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Lightning fast development and optimized builds
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling for the application GUI
- [Lucide React](https://lucide.dev/) - Beautiful, consistent icons
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [React Router DOM](https://reactrouter.com/) - Declarative routing

**Backend:**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) - Scalable RESTful API server
- [TypeScript](https://www.typescriptlang.org/) - End-to-end type safety
- [Prisma ORM](https://www.prisma.io/) - Next-generation database ORM
- [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- [Better Auth](https://better-auth.com/) - Secure and modern authentication
- [OpenRouter (OpenAI SDK)](https://openrouter.ai/) - AI model orchestration and routing

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL Database (Local or Cloud like Supabase/Neon)
- OpenRouter API Key (or OpenAI API Key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-website-builder.git
   cd ai-website-builder
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/divstack_db?schema=public"
   DIRECT_URL="postgresql://user:password@localhost:5432/divstack_db?schema=public"
   AI_API_KEY="your_openrouter_or_openai_api_key"
   BETTER_AUTH_SECRET="your_secure_random_string"
   TRUSTED_ORIGINS="http://localhost:5173"
   NODE_ENV="development"
   ```
   Run Prisma migrations to set up your database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 💡 How it Works

1. **Input**: A user submits a prompt describing the website they want (e.g., "A modern landing page for an AI accounting startup with a dark theme and neon green accents").
2. **Enhancement**: The backend uses an AI prompt enhancement step to expand the prompt with missing UI/UX best practices and detailed layout descriptions.
3. **Generation**: The enhanced prompt is sent to the primary LLM, which is instructed to output a single, cohesive HTML file containing Tailwind utility classes.
4. **Rendering**: The raw HTML string is securely evaluated inside an isolated Sandbox/IFrame `ProjectPreview` component, instantly reflecting the generated design to the user.
5. **Iteration**: Subsequent prompts are sent along with the *current* codebase, instructing the AI to intelligently modify and patch the document based on the new request.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✉️ Contact

Divyesh - [@your_twitter](https://twitter.com/your_twitter) - email@sonidivyesh2004@gmail.com  

Project Link: [https://github.com/yourusername/ai-website-builder](https://github.com/yourusername/ai-website-builder)

---
<p align="center">Made with ❤️ by Divyesh</p>
=======
<div align="center">

# 🚀 DivStack AI - Next-Gen AI Website Builder

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI API" />
</p>

**Generate production-ready, beautiful, and fully responsive websites in seconds using the power of Generative AI. Built for developers, designers, and creators.**

[Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

<br />

## 🌟 Overview

**DivStack AI** is a state-of-the-art AI-powered SaaS platform that transforms natural language prompts into fully functional, uniquely styled websites. Leveraging advanced Large Language Models (LLMs) via OpenRouter, DivStack AI intelligent writes clean HTML, inline Javascript, and Tailwind CSS, presenting a live preview to users instantly.

It features a robust tech stack (PERN stack with React + Vite), a beautiful dark-themed GUI, live code preview, version rollback, and seamless iteration through conversational AI prompts.

## ✨ Key Features

- **🤖 AI-Powered Generation**: Instantly build websites from a single text prompt using top-tier models like `z-ai/glm-4.5-air:free`.
- **💬 Conversational UI/UX**: Ask the AI to make specific layout changes, change color palettes, or rewrite content through an intuitive chat interface.
- **🔄 Live Live Engine**: Real-time rendering of the generated code inside beautiful, responsive device mockups (Desktop, Tablet, Mobile).
- **⏳ Version Control**: Automatically saves iterations. Easily rollback to any previously generated state with a single click.
- **💾 Download & Deploy**: Export clean, production-ready HTML/Tailwind code with zero bloat to host anywhere.
- **💳 Credit System & Auth**: Fully integrated authentication (Better Auth) and credit management system out of the box.
- **✨ Stunning UI**: Premium dark-mode interface inspired by the best developer tools, featuring glassmorphism, micro-animations, and fluid transitions.

## 🛠️ Technology Stack

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Lightning fast development and optimized builds
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling for the application GUI
- [Lucide React](https://lucide.dev/) - Beautiful, consistent icons
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [React Router DOM](https://reactrouter.com/) - Declarative routing

**Backend:**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) - Scalable RESTful API server
- [TypeScript](https://www.typescriptlang.org/) - End-to-end type safety
- [Prisma ORM](https://www.prisma.io/) - Next-generation database ORM
- [PostgreSQL](https://www.postgresql.org/) - Robust relational database
- [Better Auth](https://better-auth.com/) - Secure and modern authentication
- [OpenRouter (OpenAI SDK)](https://openrouter.ai/) - AI model orchestration and routing

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL Database (Local or Cloud like Supabase/Neon)
- OpenRouter API Key (or OpenAI API Key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-website-builder.git
   cd ai-website-builder
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/divstack_db?schema=public"
   DIRECT_URL="postgresql://user:password@localhost:5432/divstack_db?schema=public"
   AI_API_KEY="your_openrouter_or_openai_api_key"
   BETTER_AUTH_SECRET="your_secure_random_string"
   TRUSTED_ORIGINS="http://localhost:5173"
   NODE_ENV="development"
   ```
   Run Prisma migrations to set up your database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 💡 How it Works

1. **Input**: A user submits a prompt describing the website they want (e.g., "A modern landing page for an AI accounting startup with a dark theme and neon green accents").
2. **Enhancement**: The backend uses an AI prompt enhancement step to expand the prompt with missing UI/UX best practices and detailed layout descriptions.
3. **Generation**: The enhanced prompt is sent to the primary LLM, which is instructed to output a single, cohesive HTML file containing Tailwind utility classes.
4. **Rendering**: The raw HTML string is securely evaluated inside an isolated Sandbox/IFrame `ProjectPreview` component, instantly reflecting the generated design to the user.
5. **Iteration**: Subsequent prompts are sent along with the *current* codebase, instructing the AI to intelligently modify and patch the document based on the new request.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✉️ Contact

Divyesh - [@your_twitter](https://twitter.com/your_twitter) - email@sonidivyesh2004@gmail.com  

Project Link: [https://github.com/yourusername/ai-website-builder](https://github.com/yourusername/ai-website-builder)

---
<p align="center">Made with ❤️ by Divyesh</p>
>>>>>>> 9b86e8f57cbf210dc48f56447057978fe905fa9b

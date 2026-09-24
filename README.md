# Aman Kumar - Developer Portfolio

A production-quality full-stack developer portfolio built with the MERN stack.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Router, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Nodemailer

## Structure

The project is structured as a monorepo:

- `/client` - Frontend application
- `/server` - Backend REST API

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Development

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables based on `.env.example` in both client and server directories.
4. Run the development servers:
   ```bash
   # Client
   cd client && npm run dev

   # Server
   cd server && npm run dev
   ```

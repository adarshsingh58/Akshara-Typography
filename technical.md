
# Technical Documentation: Akshara Architecture (Full-Stack)

This document explains the codebase structure, component logic, and the transition to a Node.js backend.

## 1. Full-Stack Tech Stack
*   **Frontend:** React 19 + Tailwind CSS (Client-side rendering).
*   **Backend:** Node.js + Express (API layer).
*   **AI Engine:** Google Gemini API integration (Server-side via Node.js).
*   **Communication:** RESTful API using Fetch/JSON.

## 2. File Structure
*   `server.ts`: **New** The Node.js Express server handling AI and business logic.
*   `package.json`: **New** Backend dependency management.
*   `geminiService.ts`: **Refactored** Now acts as a client proxy to the Node.js API.
*   `App.tsx`: Main React entry point.
*   `data.ts`: Shared data structure used by both frontend and backend.

## 3. Why Node.js?
We have moved the AI logic to Node.js for several critical reasons:
1.  **Security:** The `API_KEY` is now kept strictly on the server, preventing exposure in the browser's Network tab.
2.  **Scalability:** We can easily add heavy-lifting tasks like font file subsetting using Node.js libraries in the future.
3.  **Payment Integration:** Sensitive payment callbacks (webhooks) require a persistent backend like Node.js to verify transactions.

## 4. How to Run the Backend
1.  Install dependencies: `npm install`
2.  Ensure `process.env.API_KEY` is set in your environment.
3.  Start the server: `npm start`
4.  The frontend will now point its requests to `http://localhost:3000/api`.

## 5. Adding New Backend Features
To add a new API endpoint:
1.  Open `server.ts`.
2.  Define a new `app.get` or `app.post` route.
3.  Update `geminiService.ts` on the frontend to create a corresponding fetch wrapper.

## 6. Licensing & Payments
The backend features a `/api/license/create` endpoint. In production, this should be integrated with Stripe or Razorpay SDKs to generate real checkout sessions.

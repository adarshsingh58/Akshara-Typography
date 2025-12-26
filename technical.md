
# Technical Documentation: Akshara Architecture (Production-Ready)

This document outlines the full-stack architecture of Akshara, focusing on security, maintainability, and AI integration.

## 1. System Architecture

Akshara is built as a modern full-stack application:
- **Frontend**: React 19 (Client) using modular page-based routing.
- **Backend**: Node.js + Express (API) with production-grade middleware.
- **AI**: Google Gemini 3 Flash for contextual typography analysis.
- **Database**: Abstracted Persistence Layer (Ready for SQL/NoSQL).

## 2. Updated File Structure

### Frontend (`/`)
- `App.tsx`: Central router and layout orchestrator.
- `pages/`: High-level view components (Home, Library, Pairings, etc.).
- `components/`: Reusable UI elements (Navbar, FontCard, PreviewEngine).
- `geminiService.ts`: Client-side API wrapper with auth headers.
- `data.ts` / `types.ts`: Shared schemas and static data.
- `fonts/`: Local font assets directory.
  - `akshara-hind/`: WOFF2 files (regular.woff2, bold.woff2).

### Backend (`/`)
- `server.ts`: Entry point with security middleware, routes, and static file serving for assets.
- `package.json`: Dependency management for backend utilities.

## 3. Production Features

### Security & Abuse Prevention
1. **Rate Limiting**: Implemented a sliding-window rate limiter per IP to prevent AI API abuse and DDoS attempts.
2. **Authentication**: Routes are protected by a `requireAuth` middleware expecting `Authorization: Bearer <token>`.
3. **Helmet & CORS**: Integrated for HTTP header security and controlled cross-origin resource sharing.

### Local Font Delivery
To optimize performance and eliminate dependence on third-party CDNs:
- **Static Serving**: The backend serves fonts from the `/fonts` directory using `express.static`.
- **CSS Integration**: `@font-face` declarations include `font-display: swap` to prevent Flash of Invisible Text (FOIT).
- **Formats**: Using WOFF2 for maximum compression and cross-browser performance.

### AI Integration Logic
We utilize the `gemini-3-flash-preview` model for its low latency and high reasoning capabilities in specialized domains like typography.
- **System Instructions**: The model is constrained to act as a "Professional Typography Analyst".
- **Prompt Engineering**: Dynamic prompts combine headline and body font metadata to produce 60-word concise design rationales.

### Data Persistence
The `PersistenceStore` class implements a repository-style pattern. While currently using in-memory `Maps`, the interface is `async` and ready for transition to MongoDB, PostgreSQL, or Redis without modifying business logic in the routes.

## 4. Development & Deployment

### Environment Variables
The following keys are required in the server environment:
- `API_KEY`: Your Google Gemini API Key.
- `PORT`: (Optional) Defaults to 3000.
- `NODE_ENV`: Set to `production` to hide stack traces in error responses.

### Running the System
1. **Server**: `npm install && npm start` (Starts Express on :3000).
2. **Client**: The frontend expects the API at `localhost:3000/api` and font assets at `localhost:3000/fonts`.

## 5. Future Roadmap
- **Real Payments**: Replace the mock `license/create` route with Stripe/Razorpay Webhooks.
- **Font Subsetting**: Implement a Node.js utility using `opentype.js` to create dynamic WOFF2 subsets based on user request parameters.
- **User Dashboard**: Real-time license management and saved pairing collections using the persistence layer.

# Jaunt Solutions Backend Architecture & Developer Documentation

Welcome to the backend documentation for the **Jaunt Solutions** platform. This Node.js/Express server functions as the administrative and communications engine of the platform, managing contact form ingestion, Google reCAPTCHA validation, secure JSON Web Token (JWT) admin authentication, and automated email operations using the Resend API.

---

## 🛠️ Tech Stack & Dependencies

The backend is built with a lightweight, secure, and production-ready tech stack:

*   **Runtime Environment:** Node.js (v18+)
*   **Web Framework:** Express.js (v4.18.3)
*   **Database ORM:** Prisma Client (v5.10.0)
*   **Database Engine:** Neon Serverless PostgreSQL
*   **Authentication & Security:** 
    *   `jsonwebtoken` (v9.0.3) for admin sessions (24-hour expiration)
    *   Google reCAPTCHA v2/v3 Verification
*   **Email Deliverability:** Resend API integration (using native `fetch` client to minimize dependency overhead)
*   **Cross-Origin Resource Sharing:** `cors` (v2.8.5) (Globally enabled, with restricted origins in production)
*   **Environment Configuration:** `dotenv` (v16.4.5) with hierarchical overrides (loads root `.env` first, then local backend `.env`)

---

## 📂 Project Directory Structure

```text
backend/
├── controllers/
│   ├── adminController.js     # Request handlers for admin auth, stats, messages, and replies
│   └── contactController.js   # Request handler for contact form ingestion and verification
├── lib/
│   ├── prisma.js              # Centralized PrismaClient instance exporter
│   └── recaptcha.js           # Google reCAPTCHA API verification helper
├── middleware/
│   ├── authMiddleware.js      # Bearer token JWT validation middleware for admin routes
│   └── rateLimitMiddleware.js # [Draft/Inactive] Rate-limiting setup (using express-rate-limit)
├── prisma/
│   ├── schema.prisma          # Prisma database schema definition (PostgreSQL)
│   └── migrations/            # SQL migration history files
├── routes/
│   ├── adminRoutes.js         # Routes mapping for administrative dashboard API endpoints
│   └── contactRoutes.js       # Route mapping for public contact form submissions
├── services/
│   ├── adminStatsService.js   # Logic to calculate counts and 30-day submission analytics
│   └── emailService.js        # Outbound HTML email services (New submission alert & admin reply)
├── utils/                     # Reserved for utility functions
├── .env                       # Local environment variables config (ignored in Git)
├── package.json               # Backend manifest, scripts, and dependencies config
├── server.js                  # Main server entrypoint. Configures middlewares, routes, and server listener
└── README.md                  # This file
```

---

## 💾 Database Schema

The PostgreSQL database contains a single main table managed via Prisma ORM:

### `Contact` Model
Defined in [schema.prisma](file:///c:/Users/windows%2010/OneDrive/Documents/GitHub/jaunt/jaunt-solutions-reimagined/backend/prisma/schema.prisma):

| Field | Data Type | Modifiers / Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | `@id`, `@default(autoincrement())` | Primary key, automatically increments. |
| `name` | `String` | None | Contact sender's full name. |
| `email` | `String` | None | Contact sender's email address. |
| `company` | `String?` | Optional (`nullable`) | Company name if provided by the user. |
| `subject` | `String` | None | Inquiry subject title. |
| `message` | `String` | None | Complete body text of the contact inquiry. |
| `createdAt` | `DateTime` | `@default(now())` | Timestamp of form submission. |
| `status` | `String` | `@default("unread")` | Message state; can be `"unread"` or `"read"`. |

---

## 🔑 Environment Configuration

Create a `.env` file in the `backend` folder. The system is designed to load variables from both the root `.env` and the `backend/.env` folders, prioritizing the latter if duplicates exist.

| Variable Name | Purpose | Example / Default Value | Required? |
| :--- | :--- | :--- | :--- |
| `PORT` | Local server port. | `5001` | No (defaults to `5000`) |
| `DATABASE_URL` | Neon PostgreSQL connection string. | `postgresql://user:pass@ep-host.aws.neon.tech/db?sslmode=require` | **Yes** |
| `JWT_SECRET` | Secret key used to sign and verify session JWTs. | `your_secure_random_jwt_secret` | **Yes** (in production) |
| `ADMIN_PASSWORD` | Password required to log in to the admin panel. | `admin` | **Yes** |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA secret key (v2/v3). | `6LeIxAcTAAAAAGG-vFI...` | **Yes** |
| `RESEND_API_KEY` | Resend API Key to send notification and reply emails. | `re_aP4irM...` | No (logs to console if missing) |
| `ADMIN_EMAIL` | Target email where new contact notifications are sent. | `somanamir43@gmail.com` | No (defaults to `yourgmail@gmail.com`) |
| `RESEND_FROM_EMAIL` | Valid verified domain sender for Resend. | `Jaunt Solutions <onboarding@resend.dev>` | No |

---

## 🚀 API Endpoints Reference

All API routes are prefixed by `/api`.

### 1. Public Routes

#### **POST** `/api/contact`
*   **Description:** Submits a new contact form message.
*   **Request Headers:** `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "company": "Example Corp",
      "subject": "Partnership Inquiry",
      "message": "We would like to explore working with Jaunt Solutions.",
      "captchaToken": "g-recaptcha-response-token..."
    }
    ```
*   **Processing Rules:**
    1. Validates that `name`, `email`, `subject`, and `message` are non-empty.
    2. Validates that `email` matches a standard regex pattern.
    3. Verifies `captchaToken` against Google's siteverify endpoint.
    4. Commits submission to the database.
    5. Asynchronously sends an alert email to the configured `ADMIN_EMAIL` via Resend API (non-blocking).
*   **Success Response (`201 Created`):**
    ```json
    {
      "success": true,
      "message": "Message submitted successfully",
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "company": "Example Corp",
        "subject": "Partnership Inquiry",
        "message": "We would like to explore working with Jaunt Solutions.",
        "createdAt": "2026-05-30T09:50:00.000Z",
        "status": "unread"
      }
    }
    ```

#### **POST** `/api/admin/login`
*   **Description:** Authenticates the admin and provides a JWT.
*   **Request Headers:** `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
      "password": "your_admin_password",
      "captchaToken": "g-recaptcha-response-token..."
    }
    ```
*   **Processing Rules:**
    1. Verifies `captchaToken` against Google.
    2. Matches `password` against the environment `ADMIN_PASSWORD`.
    3. If matches, generates a JWT signed with `JWT_SECRET` with `{ role: "admin" }` expiring in 24 hours.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Error Response (`401 Unauthorized`):**
    ```json
    {
      "success": false,
      "message": "Invalid password"
    }
    ```

---

### 2. Protected Routes (Admin Authentication Required)
These endpoints require an `Authorization` header containing the Bearer token:
`Authorization: Bearer <JWT_TOKEN>`

#### **GET** `/api/admin/stats`
*   **Description:** Fetches aggregated metrics and daily analytics for the last 30 days.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "data": {
        "totalMessages": 45,
        "unreadMessages": 12,
        "readMessages": 33,
        "dailySubmissions": [
          { "date": "2026-05-28", "count": 2 },
          { "date": "2026-05-29", "count": 5 },
          { "date": "2026-05-30", "count": 3 }
        ]
      }
    }
    ```

#### **GET** `/api/admin/messages`
*   **Description:** Fetches all contact submissions ordered by creation date descending.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "count": 2,
      "data": [
        {
          "id": 2,
          "name": "Jane Doe",
          "email": "jane.doe@example.com",
          "company": "Example Corp",
          "subject": "Partnership Inquiry",
          "message": "Message content...",
          "createdAt": "2026-05-30T09:50:00.000Z",
          "status": "unread"
        }
      ]
    }
    ```

#### **GET** `/api/admin/messages/:id`
*   **Description:** Retrieves detailed view of a single contact message.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "data": {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "company": "Example Corp",
        "subject": "Partnership Inquiry",
        "message": "Message content...",
        "createdAt": "2026-05-30T09:50:00.000Z",
        "status": "unread"
      }
    }
    ```

#### **PUT** `/api/admin/messages/:id/read`
*   **Description:** Updates the status of a submission to `"read"`.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "message": "Message marked as read",
      "data": {
        "id": 2,
        "status": "read"
      }
    }
    ```

#### **POST** `/api/admin/messages/:id/reply`
*   **Description:** Sends a reply email to the message submitter and marks the status as `"read"`.
*   **Request Body:**
    ```json
    {
      "subject": "Re: Partnership Inquiry - Jaunt Solutions",
      "message": "Thank you for contacting us Jane! We are thrilled to partner up..."
    }
    ```
*   **Processing Rules:**
    1. Looks up the original contact details by ID.
    2. Sends the email using Resend API to the contact's email. The HTML template renders the reply message nicely alongside the blockquoted original inquiry.
    3. Updates the database status of the message to `"read"`.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "message": "Reply sent successfully",
      "data": {
        "id": 2,
        "status": "read"
      }
    }
    ```

#### **DELETE** `/api/admin/messages/:id`
*   **Description:** Permanently deletes a message submission from the database.
*   **Success Response (`200 OK`):**
    ```json
    {
      "success": true,
      "message": "Message deleted successfully"
    }
    ```

---

## 🔄 Core Workflows & System Flows

### 1. Contact Form Submission Flow
```mermaid
sequenceDiagram
    participant User as Website Visitor
    participant FE as React/Vite Frontend
    participant BE as Express API Server
    participant Google as reCAPTCHA API
    participant DB as Neon PostgreSQL
    participant Email as Resend Email Service

    User->>FE: Fills & Submits Contact Form
    FE->>BE: POST /api/contact {name, email, subject, message, company, captchaToken}
    BE->>Google: Verify captchaToken (secret + response)
    alt reCAPTCHA validation fails
        Google-->>BE: success: false
        BE-->>FE: HTTP 400 { success: false, message: "Verification failed" }
        FE-->>User: Show verification error toast
    else reCAPTCHA validation succeeds
        Google-->>BE: success: true
        BE->>DB: prisma.contact.create({ ... })
        DB-->>BE: Return created contact row
        BE-->>FE: HTTP 201 { success: true, message: "Submitted", data }
        FE-->>User: Show success checkmark / popup
        Note over BE, Email: Asynchronous Job (Non-blocking)
        BE->>Email: sendContactEmail() (Admin notification)
        Email-->>BE: Sent confirmation
    end
```

### 2. Admin Dashboard Authentication Flow
```mermaid
sequenceDiagram
    participant Admin as Administrator
    participant FE as React/Vite Admin Page
    participant BE as Express API Server
    participant Google as reCAPTCHA API
    participant JWT as JWT Signer

    Admin->>FE: Inputs Password & Solves Captcha
    FE->>BE: POST /api/admin/login {password, captchaToken}
    BE->>Google: Verify captchaToken (secret + response)
    alt reCAPTCHA validation fails
        Google-->>BE: success: false
        BE-->>FE: HTTP 400 { success: false, message: "Verification failed" }
    else reCAPTCHA validation succeeds
        Google-->>BE: success: true
        BE->>BE: Compare password with ADMIN_PASSWORD
        alt Password is incorrect
            BE-->>FE: HTTP 401 { success: false, message: "Invalid password" }
            FE-->>Admin: Show authentication error
        else Password is correct
            BE->>JWT: jwt.sign({role: "admin"}, JWT_SECRET, {expiresIn: "24h"})
            JWT-->>BE: Return signed token
            BE-->>FE: HTTP 200 { success: true, token }
            FE->>FE: Set token in localStorage & redirect to /admin
        end
    end
```

### 3. Message Reply Flow
```mermaid
sequenceDiagram
    participant Admin as Administrator
    participant FE as React/Vite Admin Page
    participant BE as Express API Server
    participant Auth as Auth Middleware
    participant DB as Neon PostgreSQL
    participant Email as Resend Email Service

    Admin->>FE: Types reply and clicks "Send Reply"
    FE->>BE: POST /api/admin/messages/:id/reply {subject, message} (Auth: Bearer JWT)
    BE->>Auth: Decrypt and verify JWT signature
    alt JWT signature invalid / expired
        Auth-->>FE: HTTP 401 { success: false, message: "Invalid token" }
        FE->>FE: Clear token & redirect to /admin-login
    else JWT valid
        Auth->>BE: Pass control to controller
        BE->>DB: prisma.contact.findUnique({where: {id}})
        DB-->>BE: Return submitter email & details
        BE->>Email: sendReplyEmail({to: email, subject, message, originalMessage})
        Email-->>BE: Outgoing Email Dispatched
        BE->>DB: prisma.contact.update({where: {id}, data: {status: 'read'}})
        DB-->>BE: Return updated contact record
        BE-->>FE: HTTP 200 { success: true, message: "Reply sent", data }
        FE-->>Admin: Show success notice, refresh status indicators
    end
```

---

## 🚀 Local Development Setup

### 1. Install Dependencies
Run the following inside the `backend` directory:
```bash
npm install
```

### 2. Setup Environment Variables
Duplicate `.env.example` to `.env` inside the `backend` folder and populate it with valid keys:
```env
PORT=5001
DATABASE_URL="postgresql://neondb_owner:..."
RESEND_API_KEY="re_..."
ADMIN_EMAIL="somanamir43@gmail.com"
ADMIN_PASSWORD="admin"
JWT_SECRET="jaunt_secret_key_123"
RECAPTCHA_SECRET_KEY="6LeIxAcTAAAAAGG..."
```

### 3. Generate Prisma Client & Migrate Database
Execute database migrations to align your PostgreSQL database schema with Prisma:
```bash
# Generate the type-safe Prisma client
npx prisma generate

# Apply local schema to remote database (automatically seeds if seeds exist)
npx prisma migrate dev --name init
```

### 4. Start Server
Run the Express application:
*   **Development mode (using nodemon):**
    ```bash
    npm run dev
    ```
*   **Production mode:**
    ```bash
    npm start
    ```

---

## ☁️ Hostinger Node.js Deployment Guide

To deploy this backend server using **Hostinger Node.js Hosting**:

1.  **Prepare Production Code:** Ensure your `package.json` contains the `postinstall` hook (`prisma generate`) so that Hostinger runs it during installation.
2.  **Upload Files:** Use SSH, Git integration, or Hostinger's File Manager to upload the `backend` directory files to your host server path (e.g., `/home/username/public_html/backend`).
3.  **Setup Node.js App in Hostinger hPanel:**
    *   Navigate to **Advanced > Node.js** section in your hPanel dashboard.
    *   Click **Create Application**.
    *   Set **Application Root** pointing to your backend folder (e.g. `public_html/backend`).
    *   Specify your custom subdomain as the **Application URL** (e.g., `api.jauntsolutions.com`).
    *   Set **Startup File** to `server.js`.
    *   Under **Node.js Version**, select `18.x` or `20.x`.
4.  **Configure Environment Variables:**
    *   You can set these directly inside Hostinger's Node.js Configuration panel or upload a `.env` file directly into your Node.js application directory.
    *   Ensure your `DATABASE_URL` uses `sslmode=require`.
5.  **Run Migrations:** Open the Terminal or establish SSH connection to your server and run:
    ```bash
    cd public_html/backend
    npx prisma migrate deploy
    ```
6.  **Start application:** Click **Start Application** or **Restart** inside the Hostinger Panel.
7.  **Verify Setup:** Access your api root (e.g., `https://api.jauntsolutions.com/`) in the browser. You should receive `"Jaunt Solutions API is running..."`.
8.  **Frontend Alignment:** In your React frontend application, update `API_URL` config inside `src/pages/Contact.tsx` (and other files) to point to `https://api.jauntsolutions.com` instead of `http://localhost:5001`.

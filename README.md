# MavHousing

MavHousing is a comprehensive housing management platform designed for universities. It facilitates seamless interaction between students, housing staff, and administrators.

## 🚀 Tech Stack

-   **Frontend**: Next.js 15, TypeScript, TailwindCSS, **Shadcn UI**.
-   **Backend**: NestJS (Monorepo structure).
-   **Authentication**: Custom Auth Server with JWT and RBAC (Role-Based Access Control).
-   **Styling**: TailwindCSS with Shadcn components for a premium, accessible UI.

## ✨ Features

-   **Authentication**: Secure Login and Signup flows.
    -   **Password Policy**: Enforces strong passwords (min 10 chars, uppercase, lowercase, number, special char).
    -   **User Persistence**: Users are stored locally in `users.json` (apps/auth-server).
-   **Role-Based Access**:
    -   **Student**: Apply for housing, view lease, report maintenance.
    -   **Staff**: Manage applications, view resident details.
    -   **Admin**: System-wide configuration and user management.
-   **Modern UI**: Built with Shadcn UI for a consistent and professional look.

## 🛠️ Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm

### Installation

1.  Clone the repository.
2.  Install dependencies from the root directory:

```bash
npm install
```

### Running the Application

This project uses a monorepo structure. You need to run the **Auth Server** and the **Web Client** concurrently.

#### 1. Start the Auth Server (Backend)

The authentication server runs on port `3004`.

```bash
# From the root directory
npm run start:auth
```

#### 2. Start the Web Client (Frontend)

The Next.js application runs on port `3000`.

```bash
# Open a new terminal
cd apps/web
npm run dev
```

### Accessing the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

-   **Login**: `/login`
-   **Signup**: `/signup`

## 🧪 Testing Accounts

You can create a new account via the **Signup** page, or use existing data if `users.json` is populated.

**Example flow:**
1.  Go to `/signup`.
2.  Create a **Student** or **Staff** account.
3.  Login with your new credentials.


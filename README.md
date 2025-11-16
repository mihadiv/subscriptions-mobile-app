# 📱 Subscriptions Mobile App  
A React Native (Expo) mobile app for tracking & managing personal subscriptions.  
Includes **authentication**, **local or remote backend API**, and **MySQL database** support.

---

## 🚀 Features
- ✔ User Registration & Login (JWT Authentication)
- ✔ Secure password hashing (bcrypt)
- ✔ Session persistence via AsyncStorage
- ✔ Add subscriptions with duration & expiry auto-calculation
- ✔ View subscription list
- ✔ Works on:
  - iOS Simulator
  - Android Emulator
  - Real iOS / Android phones

---

## 🛠 Tech Stack

### **Frontend**
- React Native (Expo)
- TypeScript
- Expo Router
- Axios
- AsyncStorage

### **Backend**
- Node.js (Express)
- MySQL
- bcryptjs
- jsonwebtoken

---

## 📦 Project Structure

```
/
├── app/                     # Expo Router pages
│   ├── auth/
│   ├── home/
│   ├── subscriptions/
│   ├── .env                 # Mobile environment variables (ignored in Git)
│   └── .env.example         # Template for environment variables
│
├── src/
│   ├── context/AuthContext.tsx
│   └── config/api.ts        # Dynamic API URL config
│
└── api/                     # Backend API
    ├── routes/auth.js
    ├── database.sql
    ├── db.js
    ├── server.js
    ├── package.json
    ├── .env                 # Backend env (ignored)
    └── .env.example         # Template
```

---

# 🗄️ Setting Up the Database 

Before running the backend API, you must set up the MySQL database.

---

## Import the Database Schema

The project includes a SQL file containing the full database structure:

**Location:**  
```
api/database.sql
```

Open your preferred SQL client:

- DBeaver  
- DataGrip  
- MySQL Workbench  
- or terminal (`mysql -u root -p`)

Then execute the script:

```sql
source database.sql;
```

Or manually copy/paste its content.  
This script will:

✔ Create the `subscriptions_app` database  
✔ Create the `users` table  
✔ Create the `subscriptions` table  

---

# 🔧 Environment Variables

## 📱 **Mobile App – `app/.env`**

Used when running on **physical devices**:

```
EXPO_PUBLIC_API_URL=http://192.168.X.X:3000
```

Replace with your computer’s WiFi IP (ex: `192.168.0.143`).

The app *automatically* uses:
- iOS Simulator → `http://localhost:3000`
- Android Emulator → `http://10.0.2.2:3000`

So `.env` is only required for **real phones**.

---

## 🖥 **Backend API – `api/.env`**

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=subscriptions_app

JWT_SECRET=replace_with_a_secure_random_string
```

See `api/.env.example` for a clean reference.

---

# ▶️ Running the Backend 

The backend API must run in its own dedicated terminal:

```sh
cd api
npm install
node server.js
```

The server will be available at:

```
http://localhost:3000
```

---

# 📱 Running the Mobile App 

Open a second terminal window and start the Expo app:

```sh
cd subscriptions-mobile-app
npm install
npx expo start
```

Choose where to run the app:
- **iOS Simulator** → press `i`
- **Android Emulator** → press `a`
- **Physical device** → scan QR code using Expo Go

---

# 🌐 API URL Auto-Detection

```ts
import { Platform } from "react-native";

let API_URL = "http://localhost:3000";  // iOS Simulator

if (Platform.OS === "android") {
  API_URL = "http://10.0.2.2:3000";     // Android Emulator
}

if (process.env.EXPO_PUBLIC_API_URL) {
  API_URL = process.env.EXPO_PUBLIC_API_URL; // Real device
}

export default API_URL;
```

This ensures the app works across all environments without manual editing.

---

# 📌 Testing the API

Below are collapsible sections for each endpoint.

---

<details>
  <summary>🔐 Register — <code>POST /auth/register</code></summary>

### Request  
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456"
}
```
</details>

---

<details>
  <summary>🔑 Login — <code>POST /auth/login</code></summary>

### Request  
```json
{
  "email": "john@test.com",
  "password": "123456"
}
```
</details>

---

<details>
  <summary>➕ Add Subscription — <code>POST /subscriptions/add</code></summary>

### Request  
```json
{
  "user_id": 1,
  "name": "HBO",
  "price": 10.50,
  "start_date": "2025-01-15",
  "duration_months": 12,
  "expiry_date": "2026-01-15"
}
```
</details>

---

<details>
  <summary>📄 List Subscriptions — <code>GET /subscriptions/list/:user_id</code></summary>

### Example  
```
GET http://localhost:3000/subscriptions/list/1
```
</details>

---


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

You can test the backend API using:

- **Yaak** (recommended — simple & clean)
- Postman
- Thunder Client (VSCode extension)
- curl (terminal)

Just make sure your backend server is running:

```sh
cd api
node server.js
```

API base URL:

```
http://localhost:3000
```

---

## 🔐 Authentication Endpoints

<details>
<summary><strong>📌 Register — POST /auth/register</strong></summary>

### **Request**
```
POST http://localhost:3000/auth/register
```

### **Body**
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456"
}
```

### **Success Response (201)**
```json
{
  "message": "User registered successfully"
}
```

### **Error Response (400 — email exists)**
```json
{
  "message": "Email already exists"
}
```

---

</details>

<details>
<summary><strong>📌 Login — POST /auth/login</strong></summary>

### **Request**
```
POST http://localhost:3000/auth/login
```

### **Body**
```json
{
  "email": "john@test.com",
  "password": "123456"
}
```

### **Success Response (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@test.com"
  }
}
```

### **Error Response (400)**
```json
{
  "message": "Invalid email or password"
}
```

</details>

---

## 📦 Subscription Endpoints

<details>
<summary><strong>➕ Add Subscription — POST /subscriptions/add</strong></summary>

### **Request**
```
POST http://localhost:3000/subscriptions/add
```

### **Body**
```json
{
  "user_id": 1,
  "name": "Netflix",
  "price": 12.99,
  "start_date": "2025-01-10",
  "duration_months": 1,
  "expiry_date": "2025-02-10"
}
```

### **Success Response**
```json
{
  "message": "Subscription added successfully!"
}
```

### **Error Response**
```json
{
  "message": "Error adding subscription"
}
```

---

</details>

<details>
<summary><strong>📄 List Subscriptions — GET /subscriptions/list/:user_id</strong></summary>

### **Request**
```
GET http://localhost:3000/subscriptions/list/1
```

### **Success Response**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Netflix",
    "price": "12.99",
    "start_date": "2025-01-10T00:00:00.000Z",
    "duration_months": 1,
    "expiry_date": "2025-02-10T00:00:00.000Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "name": "Spotify",
    "price": "6.99",
    "start_date": "2025-01-15T00:00:00.000Z",
    "duration_months": 1,
    "expiry_date": "2025-02-15T00:00:00.000Z"
  }
]
```

### **Empty Response**
```json
[]
```


</details>

---
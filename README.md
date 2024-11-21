
# Weski Project

## Project Structure

```
/weski-hotels-app  - Front-end React application
/weski-api         - Back-end API built with Node.js and Express
```

## Getting Started

Follow the instructions below to get both the front-end and back-end running locally.

### 1. Weski API (Back-End)

The **Weski API** provides the backend services for the app. It handles hotel data and communicates with the front-end through API requests and Server-Sent Events (SSE).

#### Steps to run the API:

1. **Navigate to the `weski-api` directory**:
   ```bash
   cd weski-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm run start
   ```

   The API should now be running at `http://localhost:8080`.

---

### 2. Weski Hotels App (Front-End)

The **Weski Hotels App** is a React-based application that displays hotel data fetched from the Weski API.

#### Steps to run the app:

1. **Navigate to the `weski-hotels-app` directory**:
   ```bash
   cd weski-hotels-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.


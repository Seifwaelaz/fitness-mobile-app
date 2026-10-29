# Fitness Mobile App

A full-stack fitness tracking mobile application built with React Native and Expo, backed by a Node.js and Express REST API.

## Features

- **User authentication** — Register, log in, and log out.
- **Workout management** — Create workouts, view workout details, edit workouts, and delete workouts.
- **User profiles** — View account information and upload, change, or remove profile pictures.
- **Secure authentication** — Password hashing and JWT-based authentication.
- **Cloud image storage** — Profile pictures stored using Cloudinary.
- **Persistent sessions** — User information stored locally using AsyncStorage.
- **Light and dark themes** — Automatically adapts to the device's system appearance.
- **Responsive mobile UI** — Reusable themed components, loading indicators, and error feedback.

## Tech Stack

### Mobile App

- React Native
- Expo
- Expo Router
- JavaScript
- AsyncStorage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Cloudinary
- Multer

## Project Structure

```text
fitness-mobile-app/
├── frontend/    # React Native and Expo application
└── backend/     # Express REST API
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Expo Go for development, or an appropriate native development setup
- Cloudinary account for profile picture uploads

### 1. Clone the repository

```bash
git clone https://github.com/Seifwaelaz/fitness-mobile-app.git
cd fitness-mobile-app
```

### 2. Configure the backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the environment variables required by the application, including your MongoDB connection string, JWT secret, and Cloudinary credentials.

Start the backend:

```bash
npm run dev
```

### 3. Configure the frontend

In a separate terminal:

```bash
cd frontend
npm install
```

Configure `EXPO_PUBLIC_API_URL` in the frontend environment file to point to your backend API.

Start Expo:

```bash
npx expo start
```

Open the application using Expo Go or an appropriate development build.

## Deployment

The backend API is deployed on Vercel:

https://fitness-mobile-app.vercel.app

## Future Improvements

- Automated testing
- TypeScript support
- Additional workout tracking capabilities

## Author

**Seif Wael**

[GitHub Profile](https://github.com/Seifwaelaz)

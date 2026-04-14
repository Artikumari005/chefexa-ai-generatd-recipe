# Chefexa – AI Recipe Recommendation App

Chefexa is an AI-powered recipe recommendation web application.
When a user enters the ingredients they have, the app generates suitable recipe suggestions using an AI model.

The goal of this project is to help users quickly discover recipes based on available ingredients, reducing food waste and saving time.

# Setup Instructions 🚀

## 1. Get a Gemini API Key (Free)

1. Go to https://aistudio.google.com/app/apikey
2. Sign up/Login with Google account
3. Create new API key (free tier available)

## 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. The example already has a working key - or replace with yours:
   ```
   VITE_GEMINI_API_KEY=AIzaSyAw__K79O0cAzVu86rAADZnzrf37_h5_ec
   ```
3. **Restart your dev server** after changing `.env`

## 3. Run the app

```
npm run dev
```

**Note:** Never commit `.env` (in .gitignore). Share `.env.example`.

# Features🚀

- Input ingredients manually
- AI-generated recipe recommendations
- Fast response using free AI API
- Clean, simple UI
- Scalable (nutrition, images, favorites, etc.)

# AI & API Used

**Provider:** Google Gemini (Free tier)  
**Model:** gemini-1.5-flash  
**Env Var:** `VITE_GEMINI_API_KEY` (required)  
**SDK:** @google/generative-ai

**Production Warning:** Key exposed in browser. For prod, use backend proxy.

# Tech Stack

- HTML / CSS / React.js
- Vite
- Gemini AI API

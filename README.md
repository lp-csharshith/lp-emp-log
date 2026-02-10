
**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Frontend is built locally using Vite.
The generated dist/ folder is committed and deployed to Azure App Service.
Azure does not build frontend during deployment.

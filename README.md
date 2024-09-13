# build-your-own-jarvis

This project sets up a conversational AI assistant called "Jarvis" using React for the frontend and Express.js with the OpenAI API for the backend.

## Getting Started

### Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend/ `

1.  Create a `.env` file in the `backend/` directory and add your OpenAI API key:

    `OPENAI_API_KEY=your_openai_api_key_here`

2.  Install the required dependencies:

    `npm install`

3.  Start the backend server:

    `npm start`

### Frontend Setup

1.  Navigate to the `frontend/` directory:

    `cd frontend/`

2.  Install the required dependencies:

    `npm install`

3.  Start the frontend development server:

    `npm run dev`

Usage
-----

-   Once both the backend and frontend servers are running, you can interact with the Jarvis AI assistant via the frontend interface.
-   The backend communicates with the OpenAI API to generate responses based on the user's input.

Project Structure
-----------------

-   `backend/`: Contains the Express.js server code and API routes.
-   `frontend/`: Contains the React frontend code.

Environment Variables
---------------------

Make sure to add the OpenAI API key in the `.env` file located in the `backend/` directory:

`OPENAI_API_KEY=your_openai_api_key_here`

Notes
-----

-   Ensure that you have [Node.js](https://nodejs.org/) installed on your system.
-   The frontend will be available at `http://localhost:3000` after starting the development server.

Smart Parking System
Overview
The Smart Parking System is a web-based application developed using React.js and JSON Server that simulates a parking management system.
The application allows users to manage parking slots, park vehicles, track occupancy status, and dynamically update slot availability.
This project is developed as part of the CS 303 – Software Engineering course at Indian Institute of Technology Mandi, under the guidance of Dr. Varun Dutt.
________________________________________
Features
•	Vehicle entry with vehicle number, owner name, and slot selection
•	Parking slot management (vacant and occupied states)
•	Vehicle status tracking (parked / left)
•	Automatic update of slot status based on vehicle actions
•	Dashboard view showing overall parking statistics
•	Persistent storage using JSON Server as a mock backend
•	REST API integration using Axios
•	Dynamic UI updates using React Hooks
________________________________________
Tech Stack
•	Frontend: React.js (Vite, Functional Components, Hooks)
•	Backend (Mock): JSON Server
•	HTTP Client: Axios
•	Styling: Tailwind CSS
•	State Management: React Hooks (useState, useEffect, Context API)
________________________________________
Installation and Setup
1. Clone the repository
git clone https://github.com/your-username/smart-parking-system-react.git
cd smart-parking-system-react
2. Install dependencies
npm install
3. Start JSON Server (mock backend)
npx json-server --watch db.json --port 5000
Ensure the server is running at:
http://localhost:5000
4. Start the React application
npm run dev
The application will run at:
http://localhost:5173
________________________________________
Project Structure
smart-parking-system-react
│
├── public
│   ├── campus-iit-mandi.jpg
│   └── logo-iit-mandi.jpg
│
├── src
│   ├── components
│   │   ├── Dashboard.jsx
│   │   ├── Slots.jsx
│   │   ├── Vehicles.jsx
│   │   ├── Alerts.jsx
│   │   ├── Layout.jsx
│   │   ├── Theme.jsx
│   │   └── AxiosData.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── package.json
├── vite.config.js
└── README.md
________________________________________
Database Structure (db.json)
Example structure used by JSON Server:
{
  "vehicles": [
    {
      "id": 1,
      "vehicleNumber": "HP01AB1234",
      "ownerName": "Sample User",
      "selectedSlot": "A1",
      "status": "parked"
    }
  ],
  "slots": [
    {
      "id": 1,
      "slotNumber": "A1",
      "status": "occupied"
    },
    {
      "id": 2,
      "slotNumber": "A2",
      "status": "vacant"
    }
  ]
}
________________________________________
Core Concepts Implemented
•	Component-based UI design
•	RESTful API interaction using Axios
•	CRUD operations with JSON Server
•	Conditional rendering based on slot and vehicle status
•	Theme management using React Context
•	Responsive layout with light and dark mode support
________________________________________
Academic Context
•	Course: CS 303 – Software Engineering
•	Institution: Indian Institute of Technology Mandi
•	Faculty Instructor: Dr. Varun Dutt
This project demonstrates practical application of software engineering principles including modular design, separation of concerns, state management, and API-driven development.
________________________________________
Developer
Developed by Nihal Singh
________________________________________
License
This project is intended for academic and educational use.


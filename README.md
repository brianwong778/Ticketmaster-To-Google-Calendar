<h1 align="center">Ticketmaster to Google Calendar</h1>

<p align="center">
  Integrate your Google Calendar with live events data from Ticketmaster using a seamless authentication and calendar management application.
</p>

<p align="center">
  <img src="https://github.com/IanTsai1/Ticketmaster-To-Google-Calendar/assets/113395187/57451670-e15b-4dd8-a0ac-6b64b971b2d3" alt="Demo GIF">
</p>

## Demo Video
<p align="center">
  <a href="https://youtu.be/1crxym-nfXM?si=RgRm5Bpl7NWhiNZi">View Demo Video</a>
</p>

## How It Works

**Authentication and Initial Setup:**
- **Login Page:** Users are greeted by a login page where they can sign in using Google OAuth2, facilitated by PassportJS.
- **Redirection:** Upon successful authentication, users are redirected to the main page of the application.

**Event Searching and Management:**
- **Welcome Message:** The main page dynamically displays a welcome message retrieved from PostgreSQL.
- **Event Search:** Users can search for events using a search bar that fetches data from the Ticketmaster API, displaying up to 3 results.
- **Event Addition:** By clicking on the "Add Event" button, the chosen event is added to the user's Google Calendar with the correct time, date, and label.

## Technologies Used

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **APIs and Libraries:**
  - Google OAuth2 for authentication
  - PassportJS for handling OAuth with Google
  - Ticketmaster API for event data
  - Google Calendar API for managing calendar events

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository and install dependencies:
   ```bash
   git clone git@github.com:IanTsai1/Ticketmaster-To-Google-Calendar.git
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
   

2. Set up a .env file with needed credentials, including:
    ```bash
     TICKETMASTER_KEY= 
     PORT=3001
     PASSWORD=
     DATABASE_URL=
     CLIENT_ID=
     CLIENT_SECRET=
     REDIRECT_URL=
  
    ```
3. Deploy
   ```bash
   cd ../backend
   npm run deploy:full
   npm run dev



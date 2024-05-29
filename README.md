# Sam-app
Overview:
This web application is designed to assist users in predicting real estate prices, both for buying and renting properties. It includes features for user authentication, profile management, and real estate price prediction based on various property attributes.

Key Features:

User Authentication:

Users can sign up, log in, and log out securely.
Authentication is managed using JWT tokens, ensuring secure sessions.
User data, including email, password, and personal details, are validated and securely stored.
Profile Management:

Users can view and update their profile information, including first name, last name, email, date of birth, phone number, and governorate.
The profile service fetches user data from the server and displays it in the user interface.
Users' online status and account status (active or deleted) are managed in the backend.
Real Estate Price Prediction:

The app allows users to predict the price of properties for both buying and renting.
Users input details such as square meter size, age of the house, total rooms, total bathrooms, floor level, and city.
The app sends these details to the server, which returns a predicted price and, if available, the nearest matching property details.
The nearest match information includes attributes like size, age, rooms, bathrooms, floor, and city, which are displayed to the user.
Interactive User Interface:

The user interface is designed to be intuitive and responsive.
Profile information is displayed using labels that are updated dynamically based on user interaction.
Real estate prediction results, including prices and nearest matches, are displayed in a user-friendly format.
Hover effects and interactive elements provide a seamless user experience.
Backend Integration:

The app communicates with a backend server to handle user authentication, profile updates, and price predictions.
The backend uses Node.js with Express, and data is stored and retrieved using MongoDB.
Secure endpoints handle user data requests, ensuring data privacy and integrity.
Validation and Error Handling:

Input validation is performed using Joi to ensure data integrity and provide user-friendly error messages.
Error handling mechanisms are in place to manage server responses and display appropriate messages to users in case of errors.
Technologies Used:

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Validation: Joi
HTTP Requests: Fetch API

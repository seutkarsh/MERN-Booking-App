# Booking App with MERN Stack

Welcome to our comprehensive Booking App built using the MERN (MongoDB, Express.js, React.js, Node.js) stack! This repository contains the complete source code for a full-fledged booking application.

### Description
This project serves as a fully functional booking application developed using the MERN stack. It offers a range of features for managing hotels, user authentication, image uploads, search and filtering, online payments, and booking management.

### Key Features
1. **User Authentication**: Implement secure login and registration using HTTP cookies and JWT for a seamless user experience.
2. **Hotel Management**: Master adding, editing, and viewing hotels, covering everything from form inputs to state management.
3. **Image Uploads**: Integrate image uploads, a crucial feature for any booking platform.
4. **Search, Sort, & Filter**: Enhance user experience with functionalities to search, sort, and filter hotels, making it easy for users to find their perfect stay.
5. **Online Payments**: Integrate Stripe for secure and efficient hotel booking payments.
6. **Booking Management**: Implement the feature to view and manage bookings, essential for any booking application.
7. **Recent Hotels on Home Page**: Display recently added hotels on the home page, keeping the content dynamic and engaging.
8. **UI Testing with Playwright**: Utilize Playwright for UI testing to ensure the application functions correctly across different browsers and devices.

### Deployment
The Booking App is deployed on Render at the following link: [Booking App on Render](https://mern-booking-app-tcnb.onrender.com)

**Note**: The site may be terminated or deactivated due to billing reasons.

### Getting Started
To get started with the Booking App, follow these steps:
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies for both the frontend and backend:
   ```
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_CONNECTION_URI=<your MongoDB URI>
     CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
     CLOUDINARY_API_KEY=<your cloudinary API Key>
     CLOUDINARY_API_SECRET<your cloudinary API Secret>
     SALT=<your salt for password hashing>
     JWT_SECRET_KEY=<your JWT secret key>
     STRIPE_API_KEY=<your Stripe secret key>
     ```
5. Start the backend server:
   ```
   cd backend
   npm start
   ```
6. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
7. Open your browser and navigate to `http://localhost:3000` to view the Booking App.

### UI Testing with Playwright
To run UI tests using Playwright, follow these steps:
1. Navigate to the `tests` directory.
2. Run the following command:
   ```
   npx playwright test
   ```
3. Playwright will execute the tests and provide feedback on the UI's functionality and performance.

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact
For any inquiries or support, please contact [your email or username].

Feel free to customize this readme file to fit your specific project details and preferences. Happy coding! 🚀

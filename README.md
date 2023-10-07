# BookHabor

## Description

BookHabor is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to browse through collection of books. Users can register, log in, recover forgotten passwords ,list their own books and search for books.

![landing page](https://i.imgur.com/HKBfagZ.png)

## Objectives

1. **User Authentication:**
   - Register: Users can create an account by providing necessary details.
   - Login: Existing users can log in securely.
   - Forgot Password: Users can recover their passwords through a secure email reset process.
  

2. **Book Listing:**
   - Browse Books: Users can view a collection of books available in the system.
   - List Books: Authenticated users can add their own books to the database.
    - Users can also search for the books through the search bar

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind for UI
  - React Router for navigation
  - Fetch for API requests

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database storage
  - Bcrypt.js for password hashing
  - JWT for authentication
  - Nodemailer for password reset emails

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Redclawww/BookHarbour-Trustique-Assignment.git
   cd BookHarbour-Trustique-Assignment
   ```

2. **Install Dependencies:**
   ```bash
   # Install server dependencies
   cd BookHabor Backend
   npm install

   # Install client dependencies
   cd ../BookHabor Frontend
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the `BookHabor Backend` directory and add the following:
     ```
     PORT = 5000
     DATABASE = your_mongodb_uri
     jwtSecret = your_secret_key
     email = your_email_username
     pass = your_email_password
     ```

![env](https://i.imgur.com/fsDbCUB.png)

4. **Run the Application:**
   ```bash
   # Run the server (from the 'BookHabor Backend' directory)
   node index.js

   # Run the client (from the 'BookHabor Frontend' directory)
   npm run dev
   ```

   Access the application at `http://localhost:5173`.

## Folder Structure

- **`BookHabor Frontend`:** Frontend React application.
- **`BookHabor Backend`:** Backend Node.js and Express server.

## How It Works

1. **User Registration:**
   - Navigate to the registration page.
   - Fill in the required details and submit the form.
   - Upon successful registration, users are redirected to the login page.
   ![signup](https://i.imgur.com/z9iTNZa.png)


2. **User Login:**
   - Enter credentials on the login page.
   - Upon successful login, users are redirected to the home page.
   ![login](https://i.imgur.com/lhS6JxI.png)

3. **Forgot Password:**
   - Click on the "Forgot Password" link on the login page.
   - Enter the email address associated with the account.
   - Check the email for a password reset link and follow the instructions.
   ![forgot password](https://i.imgur.com/MufoX1o.png)


4. **Browsing Books:**
   - Access the homepage to view a collection of available books.

   ![book collection](https://i.imgur.com/yegYta8.png)



5. **Listing Own Books:**
   - Authenticated users can navigate to the "List Your Books" section.
   - Fill in the book details and submit the form to add a book to the database.

![list your book](https://i.imgur.com/TSvdOhY.png)





## Feedback

If you have any feedback, please reach out to redclaww02@gmail.com
## Authors

- [@redclawww](https://www.github.com/redclawww)



🍽️ MERN Recipe App

A full-stack MERN application where users can create, view, update, and delete their own recipes.
This project integrates Cloudinary for image uploads, JWT Authentication for secure login, and Tailwind CSS for modern styling.

🚀 Features

🔑 User Authentication (JWT-based)

📸 Cloudinary Image Upload (upload recipe images via link or file)

📝 CRUD Operations for recipes (Create, Read, Update, Delete)

🍴 Recipe Categories (Breakfast, Lunch, Dinner, Desserts)

🎨 Responsive UI with Tailwind CSS

📂 MongoDB Database to store users and recipes

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Image Hosting: Cloudinary

📌 Project Workflow

Users register/login securely using JWT.

Users can add a new recipe with:

Recipe Name

Description

Ingredients

Recipe Category (Breakfast, Lunch, Dinner, Dessert)

Recipe Image (Uploaded via Cloudinary)

Recipes are displayed in the UI with images and details.

Users can edit or delete their own recipes.

Recipes are categorized in the Navbar for easy navigation.

📷 Screenshots --

Add screenshots --
<img width="1310" height="670" alt="image" src="https://github.com/user-attachments/assets/7ea246fa-216f-4c9a-b01f-6997d428e3de" />
<img width="1296" height="664" alt="image" src="https://github.com/user-attachments/assets/59326186-24f2-4c47-89c8-cb17f757c320" />
<img width="1253" height="671" alt="image" src="https://github.com/user-attachments/assets/4a308254-37fa-4707-98c3-3708332bb445" />



⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/aman-29-singh/mern-Recipe-app.git
cd RECEIPE

2️⃣ Install dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

3️⃣ Setup environment variables

Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4️⃣ Run the app
Backend
npm run server

Frontend
npm start

📚 Future Improvements

🍕 Add search and filter functionality for recipes

⭐ Add likes and comments on recipes

📱 Build a mobile app version

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

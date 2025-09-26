# LMSystemWeb - Frontend

A React-based frontend for managing employee leaves, including login, registration, leave application, approval (admin-only), and history tracking.

## 🛠️ Tech Stack

- **React** (v18+)
- **React Router DOM** (v6+)
- **Fetch API** for HTTP requests
- **React Toastify** for notifications
- **Bootstrap** for styling and layout
- **Context API** for state management


## ✨ Features

- 🔐 User Authentication (Login/Register)
- 📝 Apply for Leave
- 📊 View Leave History
- ✅ Admin Leave Approval Dashboard
- 🚪 Logout functionality
- 🔔 Toast notifications for feedback



## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gaurav150925/LMSystemWeb.git
   cd LMSystemWeb
   ```

## Available Scripts

In the project directory, you can run:


### `npm install`

Installs all the dependecy used in the Project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests].

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## ⚙️ Configuration

Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_BASE_URL=https://localhost:7088

```

## 📁 Folder Structure


src/ ├── assets/ # Images, icons, etc. 
     ├── AuthComponents/ # having all the Authentication related components
     ├── components/ # Reusable UI components 
     ├── Config / # having configurable data file 
     ├── Controllers/ # having all the business logic for the components
     ├── services/ # API calls using Fetch 
     ├── Routes/ # Global state (if using Context API) 
     ├── App.js # Main app component 
     ├── index.js # Entry point


## 🧪 Dummy Credentials

You can use the following dummy accounts for testing:

- **Admin**
  - Email: `Testadmin`
  - Password: `admin@123`

- **User**
  - Email: `testuser`
  - Password: `user@123`


## 🐞 Known Issues

- Leave approval page may not refresh automatically after action.
- Toasts may overlap if multiple actions are triggered quickly.
- No role-based routing protection implemented yet.


## 🤝 Contributing

Feel free to fork the repo and submit pull requests. For major changes, please open an issue first to discuss what you'd like to change.

### Steps to Contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request
 check if this is a valid readme complete or anything is required
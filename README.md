
# agriaid – Smart Agriculture Web Application


agriaid is a web-based application designed to empower farmers with smart insights into crop cultivation and fertilizer recommendations. By leveraging real-time data and user inputs, agriaid provides accurate crop analyses and tailored fertilizer suggestions to help optimize yield and promote sustainable farming practices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

## Overview

agriaid is built to assist users (primarily farmers) in making informed decisions by analyzing soil nutrient data, weather parameters, and crop information. The application comprises several components:
  
- **Crop Analysis:** Users can input soil and environmental data to receive recommendations on optimal crops.
- **Fertilizer Recommendations:** Based on the soil analysis, the app suggests suitable fertilizers along with application practices.
- **User Authentication:** Secure registration and login functionalities allow personalized usage and data management.
- **Responsive Design:** A user-friendly, responsive interface built with HTML, CSS, and JavaScript ensures accessibility across devices.

## Features

- **Crop Recommendation Tool:**  
  Analyze soil parameters such as nitrogen, phosphorus, potassium, pH, rainfall, temperature, and humidity to get the best crop options.
  
- **Fertilizer Suggestion System:**  
  Receive customized fertilizer suggestions based on soil health and nutrient deficiencies, along with detailed application practices.

- **User Authentication:**  
  Secure login and registration processes using JWT for token-based authentication and a Node.js/Express backend.

- **Interactive UI:**  
  A modern, responsive design that adapts to various devices, ensuring an engaging user experience.

- **Real-Time Analysis:**  
  Immediate feedback on analysis results with dynamic rendering of crop and fertilizer recommendations.

## Tech Stack

- **Frontend:**  
  - HTML, CSS, JavaScript  
  - Responsive design principles and dynamic page interactions
    
- **Backend**  

  - Node.js + Express  
  - SQLite (local database)  
  - JWT Authentication  
  - Bcrypt password hashing  

## Installation & Setup

  # 1. Clone repo
  ```sh
  git clone https://github.com/bobby-99/agriaid.git
  cd agriaid
  ```
  
# 2. Install dependencies
```sh
npm install
```

# 3. Start the server
```sh
npm start
```

Your server will start on `http://localhost:3000`. Open the project in your browser to view the application.

## Usage

- **Crop Analysis:**  
  Navigate to the Crop Analysis page to input soil nutrient and environmental data. The tool will process your inputs and display recommended crops with confidence scores and supporting data visualizations.

- **Fertilizer Recommendations:**  
  Use the Fertilizer Suggestions page to get fertilizer recommendations based on your soil analysis. The system compares input data with a preloaded dataset to provide tailored advice.

- **User Management:**  
  Register for an account or log in using the dedicated authentication pages. This ensures that your analysis history and recommendations are stored and personalized.




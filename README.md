# Food Order App

A full-stack demo where users can browse meals, add them to a cart, and submit an order. The frontend is built with React + Vite and the backend is a lightweight Express API that serves meal data and stores orders in JSON.

### Features
- **Meal Catalog**: Browse meals with name, description, price, and image.
- **Cart Management**: Add/remove items with quantity aggregation.
- **Checkout Flow**: Modal-based checkout with required fields.
- **Order Submission**: Sends `POST /orders` to persist orders.
- **Static Assets**: Meal images served via Express static middleware.

## Tech Stack
- **Frontend**: React, Vite, JavaScript
- **Backend**: Node.js, Express
- **Data**: JSON files in `backend/data`

## Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**<br />
Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)

**Clone the Repository**
```
git clone https://github.com/maryam-nasir/food-order-app.git
cd food-order-app
```


**Installation**<br />
Open two terminals: one for the backend API and one for the frontend app.

**Backend**<br />
```
npm install
npm run start
```

**Frontend**<br />
```
npm install
npm run dev
```

BE is served at `http://localhost:3000`.<br>
FE is served at `http://localhost:5173`.
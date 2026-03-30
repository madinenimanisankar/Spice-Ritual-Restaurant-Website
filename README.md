# Spice Ritual - Modern Restaurant Pre-Ordering System

Welcome to the **Spice Ritual** frontend repository! This is a modern, production-level ReactJS application designed to upgrade a classic static HTML/CSS restaurant website into a dynamic, feature-rich web app. It allows users to browse menus, manage a shopping cart, and place advance pre-orders before arriving at the restaurant.

## 🚀 Features

- **Component-Based Architecture**: Built using modern React functional components and hooks.
- **Global State Management**: Utilizes the React Context API to manage the Shopping Cart and Admin User Authentication globally.
- **Persistent Data**: The shopping cart and user sessions survive page reloads using browser `localStorage`.
- **Dynamic Routing**: Seamless, single-page application experience crafted with `react-router-dom`.
- **Dummy API Layer**: Features an integrated JSON-based mockup service layer (`dummyData.json`) that mimics asynchronous REST API calls.
- **Advanced Form Validations**: Real-time checkout validations ensuring no past dates or times can be selected for pre-orders.
- **Modern UI/UX**: Custom CSS tailored with modern variables, flexible grids, smooth micro-animations, loading spinners, and toast notifications.
- **Admin Dashboard**: Dummy authentication flow (`admin@spiceritual.com`) leading to a secure menu management portal.

## 💻 Tech Stack

- **Frontend Framework**: React 18 (Vite)
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API + Hooks (`useState`, `useEffect`, `useContext`)
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid)
- **Icons & Notifications**: `react-icons`, `react-toastify`

## 📂 Folder Structure

```
src/
├── assets/          # Static images and logos
├── components/      # Reusable UI pieces (Navbar, Footer, CartItem, MenuCard, Spinner)
├── context/         # Global State Providers (CartContext, AuthContext)
├── data/            # dummyData.json (Mock Database)
├── pages/           # Route views (Home, Menu, Cart, Checkout, Success, Admin)
├── services/        # api.js (Simulated asynchronous network requests)
├── App.jsx          # Application Shell and Routing setup
└── main.jsx         # React DOM Entry point and Global Context Wrappers
```

## 🛠️ How to Run Locally

1. **Clone the repository** (or navigate to the project directory)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open in Browser**: Visit `http://localhost:5173` (or the port specified by Vite).

## 🔮 Future Enhancements

While this is a robust frontend portfolio project, it can easily be scaled into a full-stack application:
- **Backend Integration**: Replace `dummyData.json` with a real backend using Node.js/Express or Python/Django.
- **Database**: Connect to MongoDB or PostgreSQL for real-time inventory and order management.
- **Payment Gateway Integration**: Implement Stripe or Razorpay on the checkout page.
- **Robust Authentication**: Implement JWT-based Auth (e.g., Auth0 or Firebase) for real customer accounts and secure admin routes.

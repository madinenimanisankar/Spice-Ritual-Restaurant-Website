import dummyData from '../data/dummyData.json';

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Fetch all menu items
  getMenuItems: async () => {
    await delay(500); // Simulate loading
    return dummyData.menuItems;
  },

  // Fetch all categories
  getCategories: async () => {
    await delay(300);
    return dummyData.categories;
  },

  // Fetch menu items by category ID
  getMenuItemsByCategory: async (categoryId) => {
    await delay(500);
    if (!categoryId || categoryId === 'all') return dummyData.menuItems;
    return dummyData.menuItems.filter((item) => item.categoryId === categoryId);
  },

  // Simulate placing an order
  placeOrder: async (orderData) => {
    await delay(1000);
    // In a real app, this would post to a server. Here we save to the dummy data array in-memory.
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const newOrder = { id: orderId, ...orderData };

    // Add to our mock database
    dummyData.orders.unshift(newOrder); // Add to beginning of array

    return { success: true, orderId, ...orderData };
  },

  // Simulate user login
  login: async (email) => {
    await delay(600);
    const user = dummyData.users.find(u => u.email === email);
    if (user) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Try admin@spiceritual.com or user@spiceritual.com' };
  },

  // Simulate user registration
  register: async (name, email, password) => {
    await delay(800);

    const existingUser = dummyData.users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already in use. Please login instead.' };
    }

    const newUser = {
      id: `cust_${Math.floor(Math.random() * 10000)}`,
      name,
      email,
      role: 'customer'
    };

    dummyData.users.unshift(newUser);
    return { success: true, user: newUser };
  },

  // Simulate fetching a user's past orders
  getCustomerOrders: async (email) => {
    await delay(600);
    const user = dummyData.users.find(u => u.email === email);
    if (!user) return [];

    return dummyData.orders.filter(order => order.customerInfo.email === email);
  }
};

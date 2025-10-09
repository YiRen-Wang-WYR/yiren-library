import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    role: null
  }),

  getters: {
    isAdmin: (state) => state.role === 'admin',
    isUser: (state) => state.role === 'user',
    currentUser: (state) => state.user
  },

  actions: {
    login(credentials) {
      // Mock login - replace with real API call
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          if (credentials.username === 'admin@library.com' && credentials.password === 'admin123') {
            this.user = {
              id: 1,
              username: 'admin@library.com',
              name: 'Admin User',
              email: 'admin@library.com'
            };
            this.isAuthenticated = true;
            this.role = 'admin';
            resolve(this.user);
          } else if (credentials.username === 'user@library.com' && credentials.password === 'user123') {
            this.user = {
              id: 2,
              username: 'user@library.com',
              name: 'Regular User',
              email: 'user@library.com'
            };
            this.isAuthenticated = true;
            this.role = 'user';
            resolve(this.user);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.role = null;
    },

    checkAuth() {
      // Check if user is authenticated (e.g., check local storage or session)
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        this.user = userData;
        this.isAuthenticated = true;
        this.role = userData.role;
      }
    }
  }
}); 
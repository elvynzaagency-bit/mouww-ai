// Mouww API — Frontend API Helper

const MouwwAPI = {

  baseURL: "/api",

  async request(endpoint, options = {}) {

    try {

      const response = await fetch(
        this.baseURL + endpoint,
        {
          method: options.method || "GET",

          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
          },

          body: options.body
            ? JSON.stringify(options.body)
            : undefined
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "API request failed"
        );
      }

      return data;

    } catch (error) {

      console.error(
        "Mouww API Error:",
        error
      );

      throw error;
    }
  },


  async login(email, password) {

    return this.request(
      "/login",
      {
        method: "POST",

        body: {
          email,
          password
        }
      }
    );
  },


  async getProfile(userId) {

    return this.request(
      `/profile/${userId}`
    );
  },


  async updateProfile(userId, profile) {

    return this.request(
      `/profile/${userId}`,
      {
        method: "PUT",

        body: profile
      }
    );
  },


  async getFriends(userId) {

    return this.request(
      `/friends/${userId}`
    );
  },


  async getStories(userId) {

    return this.request(
      `/stories/${userId}`
    );
  },


  async sendMessage(friendId, message) {

    return this.request(
      "/messages",
      {
        method: "POST",

        body: {
          friendId,
          message
        }
      }
    );
  },


  async createPayment(plan) {

    return this.request(
      "/payment",
      {
        method: "POST",

        body: {
          plan
        }
      }
    );

  }

};

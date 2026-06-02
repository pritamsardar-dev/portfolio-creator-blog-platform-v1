import { Client, Account, ID, Databases, Query } from "appwrite";

import conf from "../conf/conf";

// Generates a persistent device ID to track signups per device
function getDeviceId() {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = "dev_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
}

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const deviceId = getDeviceId();

      // Enforce per-device signup limit
      const deviceCheck = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        "device_registry",
        [Query.equal("deviceId", deviceId)],
      );

      if (deviceCheck.total >= 3) {
        throw new Error(
          "This device has reached the signup limit (3 accounts). Please sign in or use an existing account.",
        );
      }

      let user;

      try {
        user = await this.account.create(ID.unique(), email, password, name);
      } catch {
        throw new Error("Account already exists. Please sign in instead.");
      }

      // Auto-login after account creation
      await this.account.createEmailPasswordSession(email, password);

      // Register device-to-user mapping for limit enforcement
      await this.databases.createDocument(conf.appwriteDatabaseId, "device_registry", ID.unique(), {
        deviceId,
        userId: user.$id,
        createdAt: new Date().toISOString(),
      });

      return user;
    } catch (error) {
      throw new Error(error.message || "Signup failed");
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch {
      throw new Error(
        'Login failed. Check credentials or create a new account. "Forgot password" feature will be added in the next update.',
      );
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async getCurrentUserProfile() {
    try {
      const user = await this.account.get();

      return {
        userId: user.$id,
        authorName: user.name,
        email: user.email,
      };
    } catch {
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("logout error:", error.message);
    }
  }
}

const authService = new AuthService();

export default authService;

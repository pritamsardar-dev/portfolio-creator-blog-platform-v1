import { Client, ID, Databases, Storage, Query } from "appwrite";

import conf from "../conf/conf";
import authService from "./auth";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status }) {
    try {
      const user = await authService.getCurrentUserProfile();

      if (!user) {
        throw new Error("User not authenticated");
      }

      // Enforce per-user post limit before creating
      const existingPosts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", user.userId), Query.limit(13)],
      );

      if (existingPosts?.total >= 12) {
        throw new Error("Maximum post limit reached (12 posts)");
      }

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId: user.userId,
          authorName: user.authorName,
        },
      );
    } catch (error) {
      console.log("createPost error:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getUserPosts(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId), Query.orderDesc("$createdAt"), Query.limit(12)],
      );
    } catch (error) {
      console.log("Appwrite service :: getUserPosts :: error", error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active"), Query.orderDesc("$createdAt"), ...queries],
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  async getFeaturedPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(conf.homePostsLimit),
        ],
      );
    } catch (error) {
      console.log("Appwrite service :: getFeaturedPosts :: error", error);
      return false;
    }
  }

  async getPaginatedPosts({ limit = conf.postsPerPage, offset = 0 } = {}) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(limit),
          Query.offset(offset),
        ],
      );
    } catch (error) {
      console.log("Appwrite service :: getPaginatedPosts :: error", error);
      return false;
    }
  }

  async getRelatedPosts() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(conf.relatedPostsLimit),
        ],
      );
    } catch (error) {
      console.log("Appwrite service :: getRelatedPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;

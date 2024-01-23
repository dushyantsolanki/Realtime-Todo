import { initializeApp } from "firebase/app";
import { config } from "../config/config";

import { getDatabase, ref, push, set, remove, update } from "firebase/database";

// Here i define a class that contains various of method

class RealtimeDatabase {
  app = initializeApp(config);
  database;
  dataRef;
  constructor() {
    this.database = getDatabase(this.app);
    this.dataRef = ref(this.database, "user");
  }
  sendData = async (data) => {
    try {
      const postRef = ref(this.database, "user");
      const newPostRef = push(postRef);
      set(newPostRef, {
        ...data,
      });
    } catch (error) {
      console.log(
        `firebase / services / services.js // sendData :: error: ${error.message} : code : ${error.code}`
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };

  updateData = async (id, data) => {
    try {
      const postRef = ref(this.database, "user/" + id);
      update(postRef, {
        text: data,
      });
    } catch (error) {
      console.log(
        `firebase / services / services.js // sendData :: error: ${error.message} : code : ${error.code}`
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };
  completeData = async (id, data) => {
    try {
      const postRef = ref(this.database, "user/" + id);

      update(postRef, {
        text: data,
        isCompleted: true,
      });
    } catch (error) {
      console.log(
        `firebase / services / services.js // sendData :: error: ${error.message} : code : ${error.code}`
      );
      return { code: error.code, message: error.message, flag: false };
    }
  };
  deleteDoc = async (id) => {
    const dataRef = ref(this.database, "user/" + id);
    const response = await remove(dataRef);
    console.log(response);
  };
}
export const realtime_database = new RealtimeDatabase();

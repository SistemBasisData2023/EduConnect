const { db } = require("../config/connectToDatabase");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../config/firebaseInit");
const mime = require("mime-types");

const uploadHandler = async (req, folderName, fileName) => {
  try {
    const fileExtension = mime.extension(req.file.mimetype);

    const storageRef = ref(
      storage,
      `${folderName}/${fileName}.${fileExtension}`
    );

    // Upload file to Firebase Cloud Storage
    await uploadBytes(storageRef, req.file.buffer);
    console.log("File berhasil diunggah");

    //Get Public URL
    const publicUrl = await getDownloadURL(storageRef);
    console.log(req.file);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const getSubjectNameById = async (subject_id) => {
  try {
    const query = "SELECT name FROM subject WHERE id = $1";
    const result = await db.query(query, [subject_id]);

    if (result.rows.length == 0) {
      throw new Error("Subject Not Found");
    }

    return result.rows[0].name;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const getTaskObjectById = async (task_id) => {
  try {
    const query = "SELECT name, subject_id FROM task WHERE id = $1";
    const result = await db.query(query, [task_id]);

    if (result.rows.length == 0) {
      throw new Error("Subject Not Found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

const checkIdExists = async (table, id) => {
  const query = `
      SELECT EXISTS (
        SELECT 1
        FROM ${table}
        WHERE id = $1
      )
    `;

  try {
    const result = await db.query(query, [id]);
    const exists = result.rows[0].exists;
    return exists;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

module.exports = {
  checkIdExists,
  getSubjectNameById,
  uploadHandler,
  getTaskObjectById,
};

const { db } = require("../config/connectToDatabase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../config/firebaseInit");
const mime = require("mime-types");

const uploadHandler = async (req, folderName, fileName) => {
  try {
    const fileExtension = mime.extension(req.file.mimetype);
    let finalFileName = fileName;

    // If fileName is not provided, use the original file name
    if (!finalFileName) {
      const originalFileName = req.file.originalname;
      const originalFileNameWithoutExtension = originalFileName
        .split(".")
        .slice(0, -1)
        .join(".");
      fileName = originalFileNameWithoutExtension;
    }

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

const getTotalRows = async (req, query) => {
  const search = req.query.search;

  if (search) {
    query += ` WHERE name ILIKE '%${search}%'`;
  }

  console.log(query);

  try {
    const results = await db.query(query);
    return results.rows.length;
  } catch (error) {
    throw new Error(error.message);
  }
};

function paginate(req, query) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 0;
    const search = req.query.search;

    if (search) {
      query += ` WHERE s.name ILIKE '%${search}%'`;
    }

    query += ` LIMIT ${limit} OFFSET ${page * limit}`;
    console.log(query);
    return query;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  checkIdExists,
  getSubjectNameById,
  uploadHandler,
  getTaskObjectById,
  paginate,
  getTotalRows,
};

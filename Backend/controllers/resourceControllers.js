//addResource
//getAllResources
//getResourcesBySubject

const { db } = require("../config/connectToDatabase");
const { uploadHandler, getSubjectNameById } = require("../services/services");
db;

const addResource = async (req, res) => {
  try {
    //Check if there are file to be uploaded
    if (!req.file) {
      throw new Error("Tidak ada file yang diunggah.");
    }

    //Get Data from req.body
    const { fileName, description, subject_id } = req.body;

    //Get Folder Name
    const folderName = (await getSubjectNameById(subject_id)) + "/resources";

    //Upload File
    const url = await uploadHandler(req, folderName, fileName);

    //Add To Database
    const query =
      "INSERT INTO resource (name, url, description, subject_id) VALUES ($1, $2, $3, $4) RETURNING *";

    const result = await db.query(query, [
      fileName,
      url,
      description,
      subject_id,
    ]);

    const response = result.rows[0];

    res.status(200).json({
      message: "Succefully Uploaded Resource",
      error: false,
      newData: response,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const downloadResource = async (req, res) => {
  try {
    const { resource_id } = req.params;

    const query = "SELECT * FROM resource WHERE id = $1";

    const result = await db.query(query, [resource_id]);

    if (result.rows.length < 0) {
      res.status(404).json({ message: "Resource Not Found", error: true });
      return;
    }

    const response = result.rows[0];

    res.redirect(response.url);
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getAllResources = async (req, res) => {
  try {
    //Find All Students
    const query = "SELECT * FROM resource";

    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "resources Not Found" });
      return;
    }

    const resources = results.rows;

    res
      .status(200)
      .json({ message: "Successfully GetAllResources", data: resources });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getResourcesBySubject = async (req, res) => {
  try {
    const subject_id = req.params.subject_id;
    //Query SQL
    const query = `
      SELECT r.id, r.name, r.url, r.description, s.name AS subject, t.name AS teacher
      FROM resource AS r
      INNER JOIN subject AS s ON r.subject_id = s.id
      INNER JOIN teacher AS t ON s.teacher_id = t.id
      WHERE r.subject_id = $1;
    `;

    const results = await db.query(query, [subject_id]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "resources Not Found", error: true });
      return;
    }

    const resources = results.rows[0];

    res.status(200).json({
      message: "Successfully GetResourcesBySubject",
      data: resources,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

module.exports = {
  addResource,
  downloadResource,
  getAllResources,
  getResourcesBySubject,
};

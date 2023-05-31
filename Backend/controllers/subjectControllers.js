const { db } = require("../config/connectToDatabase");
const { checkIdExists } = require("../services/services");

const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const query = "INSERT INTO subject (name) VALUES ($1) RETURNING *";
    const result = await db.query(query, [name]);

    const response = result.rows[0];

    res.status(200).json({
      message: "Create Subject successfully",
      data: response,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getSubjectByID = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM subject WHERE id = $1";
    const result = await db.query(query, [id]);

    if (result.rows.length == 0) {
      res.status(404).json({ message: "Subject Not Found", error: true });
      return;
    }

    const subject = result.rows[0];

    res.status(200).json({
      message: "Successfully GetSubjectByID",
      data: subject,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getSubjectByName = async (req, res) => {
  try {
    const { name } = req.params;
    const query = "SELECT * FROM subject WHERE name = $1";
    const result = await db.query(query, [name]);

    if (result.rows.length == 0) {
      res.status(404).json({ message: "Subject Not Found", error: true });
      return;
    }

    const subject = result.rows[0];

    res.status(200).json({
      message: "Successfully GetSubjectByName",
      data: subject,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const query = "SELECT * FROM subject";
    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Subject Not Found", error: true });
      return;
    }

    const subjects = results.rows;

    res.status(200).json({
      message: "Successfully GetAllSubjects",
      data: subjects,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const addStudent = async (req, res) => {
  try {
    await db.query("BEGIN");
    const { student_id, subject_id } = req.body;

    const isStudentExist = await checkIdExists("student", student_id);
    const isSubjectExist = await checkIdExists("Subject", subject_id);

    if (!isStudentExist || !isSubjectExist) {
      res
        .status(404)
        .json({ message: "Student ot Subject didnt Exist", error: true });
      return;
    }

    const query = `
    INSERT INTO enrollment (student_id, subject_id)
    VALUES ($1, $2)
    RETURNING *
  `;

    const { rows } = await db.query(query, [student_id, subject_id]);
    const response = rows[0];

    await db.query("COMMIT");
    res.status(200).json({
      message: "Successfully addStudent",
      data: response,
      error: false,
    });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(404).json({ message: error.message, error: true });
  }
};

// const checkIdExists = async (table, id) => {
//   const query = `
//     SELECT EXISTS (
//       SELECT 1
//       FROM ${table}
//       WHERE id = $1
//     )
//   `;
//   try {
//     const result = await db.query(query, [id]);
//     const exists = result.rows[0].exists;
//     return exists;
//   } catch (error) {
//     console.error("Error executing query:", error);
//     throw error;
//   }
// };

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectByID,
  getSubjectByName,
  addStudent,
};

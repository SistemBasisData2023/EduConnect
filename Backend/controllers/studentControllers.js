const { db } = require("../config/connectToDatabase");
const { paginate, getTotalRows } = require("../services/services");

const getAllStudent = async (req, res) => {
  try {
    //Find All Students
    let query = `SELECT s.id, s.name as name, s.age, nomor_induk_siswa , c.name as classroom_name, c.id as classroom_id
    FROM student as s
    INNER JOIN classroom as c ON s.classroom_id = c.id`;

    const results = await db.query(query);

    // if (results.rows.length == 0) {
    //   res.status(404).json({ message: "Student Not Found" });
    //   return;
    // }

    const student = results.rows;

    res.status(200).json({
      message: "Successfully GetAllStudent",
      data: student,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    //Find User
    const query = "SELECT * FROM student WHERE id = $1";

    const results = await db.query(query, [id]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Student Not Found" });
      return;
    }
    const student = results.rows[0];

    res
      .status(200)
      .json({ message: "Successfully GetStudentByID", data: student });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStudentByClassroom = async (req, res) => {
  try {
    const { classroom_name } = req.params;

    //Find user with specific class
    let query = `SELECT s.id as id, s.name as name, s.age as age, nomor_induk_siswa , c.name as classroom_name, c.id as classroom_id
    FROM student as s
    INNER JOIN classroom as c ON s.classroom_id = c.id
    WHERE c.name = $1`;

    const results = await db.query(query, [classroom_name]);

    // if (results.rows.length == 0) {
    //   res.status(404).json({ message: "Student Not Found", error: true });
    //   return;
    // }

    const students = results.rows;
    res.status(200).json({
      message: "Successfully GetStudentByClassroom",
      data: students,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getStudentBySubject = async (req, res) => {
  try {
    const { subject_name } = req.params;

    const query = `
    SELECT student.id, student.name, student.nomor_induk_siswa, subject.name as subject_name
    FROM student
    INNER JOIN enrollment ON student.id = enrollment.student_id
    INNER JOIN subject ON subject.id = enrollment.subject_id
    WHERE subject.name = $1
    ORDER BY student.name ASC
  `;

    const results = await db.query(query, [subject_name]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Student Not Found", error: true });
      return;
    }

    const students = results.rows;
    res.status(200).json({
      message: "Successfully GetStudentBySubject",
      data: students,
      error: false,
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 0,
      totalRows: results.rows.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getAllMockData = async (req, res) => {
  try {
    let query = `SELECT * FROM mock_data`;

    const results = await db.query(query);

    // if (results.rows.length == 0) {
    //   res.status(404).json({ message: "Student Not Found" });
    //   return;
    // }

    const student = results.rows;

    res.status(200).json({
      message: "Successfully GetAllStudent",
      data: student,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllStudent,
  getStudentByClassroom,
  getStudentById,
  getStudentBySubject,
  getAllMockData,
};

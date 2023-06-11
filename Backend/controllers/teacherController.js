const { db } = require("../config/connectToDatabase");

const getAllTeachers = async (req, res) => {
  try {
    //Find All teacher
    const query = `SELECT
    teacher.id,
      teacher.name,
      teacher.age,
      teacher.nomor_induk_guru,
      subject.id AS subject_id,
      subject.name AS subject_name,
      classroom.id AS classroom_id,
      classroom.name AS classroom_name
  FROM
      teacher
  LEFT JOIN
      subject ON teacher.ID = subject.teacher_id
  JOIN
      classroom ON teacher.classroom_id = classroom.ID`;

    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Teacher Not Found" });
      return;
    }

    const teacher = results.rows;

    res.status(200).json({
      message: "Successfully GetAllTeacher",
      data: teacher,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const id = req.params.id;
    //Find User
    const query = `SELECT
    teacher.id,
      teacher.name,
      teacher.age,
      teacher.nomor_induk_guru,
      subject.id AS subject_id,
      subject.name AS subject_name,
      classroom.id AS classroom_id,
      classroom.name AS classroom_name
  FROM
      teacher
  JOIN
      subject ON teacher.ID = subject.teacher_id
  JOIN
      classroom ON teacher.classroom_id = classroom.ID WHERE teacher.id = $1`;
    const results = await db.query(query, [id]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    const teacher = results.rows[0];

    res
      .status(200)
      .json({ message: "Successfully GetUserByID", data: teacher });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getTeacherBySubject = async (req, res) => {
  try {
    const name = req.params.name;
    const query = `SELECT teacher.name, subject.name FROM teacher INNER JOIN subject ON teacher.id = subject.teacher_id WHERE subject.name = ${name} `;

    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Teacher Not Found", error: true });
      return;
    }

    const teachers = results.rows[0];

    res.status(200).json({
      message: "Successfully GetUserByID",
      data: teachers,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

// Asynchronous function to fetch teachers not present in the subject table
const getAvailableTeacher = async (req, res) => {
  try {
    const query = `
      SELECT ID, name
      FROM teacher
      WHERE ID NOT IN (SELECT teacher_id FROM subject)
    `;

    const { rows } = await db.query(query);

    const teachers = rows;

    res.status(200).json({
      message: "Successfully GetAvailableTeacher",
      data: teachers,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherBySubject,
  getTeacherById,
  getAvailableTeacher,
};

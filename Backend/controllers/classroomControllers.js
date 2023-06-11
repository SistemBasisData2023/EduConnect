const { db } = require("../config/connectToDatabase");

const createClassroom = async (req, res) => {
  try {
    const { name } = req.body;

    const query = "INSERT INTO classroom (name) VALUES ($1) RETURNING *";
    const result = await db.query(query, [name]);

    const response = result.rows[0];

    res.status(200).json({
      message: "Create Classroom successfully",
      data: response,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getAllClassrooms = async (req, res) => {
  try {
    const query = "SELECT * FROM classroom ORDER BY name ASC";
    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Classrooms Not Found", error: true });
      return;
    }

    const classrooms = results.rows;

    res.status(200).json({
      message: "Successfully GetAllClassrooms",
      data: classrooms,
      error: false,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

module.exports = {
  createClassroom,
  getAllClassrooms,
};

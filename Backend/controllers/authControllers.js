//Guru, Admin, Murid
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../config/connectToDatabase");
const { checkIdExists } = require("../services/services");

const register = async (req, res) => {
  try {
    await db.query("BEGIN");

    //Take data from request body
    const { username, password, role, classroom_id } = req.body;

    //Error Handling
    if (role !== "Teacher" && role !== "Admin" && role !== "Student") {
      res.status(404).json({ message: "Invalid role" });
      return;
    }

    //Hash The Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create New User and Add it to database
    const query =
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *";

    const result = await db.query(query, [username, hashedPassword, role]);

    const user = result.rows[0];

    // const user_id = result.rows[0].id;

    //Check the classroom_id
    if (role !== "Admin") {
      const isClassroomExist = await checkIdExists("classroom", classroom_id);

      if (!isClassroomExist) {
        res.status(404).json({ message: "Classroom didnt Exist", error: true });
        return;
      }
    }

    //Check the Role
    if (role === "Student") {
      const { name, age, nomor_induk_siswa } = req.body;
      const queryStudent =
        "INSERT INTO student (name, age, classroom_id, user_id, nomor_induk_siswa) VALUES ($1, $2, $3, $4, $5)";
      await db.query(queryStudent, [
        name,
        age,
        classroom_id,
        user.id,
        nomor_induk_siswa,
      ]);
    }

    //Name, age, Nomor_Induk_Guru, subject, user_id
    if (role === "Teacher") {
      const { name, age, nomor_induk_guru } = req.body;
      const queryTeacher =
        "INSERT INTO teacher (name, age, nomor_induk_guru, classroom_id, user_id) VALUES ($1, $2, $3, $4, $5)";
      await db.query(queryTeacher, [
        name,
        age,
        nomor_induk_guru,
        classroom_id,
        user.id,
      ]);
    }

    await db.query("COMMIT");
    res.status(200).json({ message: "Register Succesfull", data: user });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(404).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    //Take data from req.body
    const { username, password } = req.body;
    let data;

    //Find admin with the username
    const query = "SELECT * FROM users WHERE username = $1";
    const results = await db.query(query, [username]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    const user = results.rows[0];

    //Check the Password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(404).json({ message: "Wrong Password" });
      return;
    }

    data = user; //Jika Admin

    if (user.role === "Teacher") {
      const teacherQuery = `SELECT subject.ID as subject_id, subject.name as subject_name, teacher.name AS name, teacher.age AS age, teacher.nomor_induk_guru AS nomor_induk_guru, users.username AS username, teacher.id AS id, teacher.classroom_id AS classroom_id, users.role AS role, users.id as user_id
      FROM subject
      JOIN teacher ON subject.teacher_id = teacher.ID
      JOIN users ON teacher.user_id = users.ID
      WHERE users.username = $1`;

      const finalResult = await db.query(teacherQuery, [username]);
      data = finalResult.rows[0];
    } else if (user.role === "Student") {
      const studentQuery = `SELECT student.*, users.username, users.role
      FROM student
      JOIN users ON student.user_id = users.ID
      WHERE users.username = $1`;

      const finalResult = await db.query(studentQuery, [username]);
      data = finalResult.rows[0];
    } else {
      user.name = user.username;
    }

    //Generate Token
    const accessToken = generateAccessToken(user);

    //Create Cookie
    res.cookie("authorization", accessToken, {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60, //24 jam = 60 * 60 * 24 * 1 * 1000
    });

    //Response
    res
      .status(200)
      .json({ message: "Login Succesfull", data: data, token: accessToken });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    //Find All users
    const query = "SELECT * FROM users";

    const results = await db.query(query);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "Users Not Found" });
      return;
    }

    const users = results.rows;

    res.status(200).json({ message: "Successfully GetAllUsers", data: users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    //Find User
    const query = "SELECT * FROM users WHERE id = $1";
    const results = await db.query(query, [id]);

    if (results.rows.length == 0) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }
    const user = results.rows[0];

    res.status(200).json({ message: "Successfully GetUserByID", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("authorization");
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const verifyToken = async (req, res) => {
  const token = req.cookies.authorization;

  if (!token) return res.status(401).json({ message: "Token Missing" });

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });

    // const user = {};

    // // If verification is successful
    // user.username = decoded.username;
    // user.role = decoded.role;
    // user.id = decoded.id;

    // console.log(user);

    // Generate Back User
    const user = await generateBackUser(decoded);

    res.status(200).json({ message: "Success", token: token, user: user });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const generateBackUser = async (user) => {
  let data = {};
  try {
    if (user.role === "Teacher") {
      const teacherQuery = `SELECT subject.ID as subject_id, subject.name as subject_name, teacher.name AS name, teacher.age AS age, teacher.nomor_induk_guru AS nomor_induk_guru, users.username AS username, teacher.id AS id, teacher.classroom_id AS classroom_id, users.role AS role, users.id as user_id
      FROM subject
      JOIN teacher ON subject.teacher_id = teacher.ID
      JOIN users ON teacher.user_id = users.ID
      WHERE users.username = $1`;

      const finalResult = await db.query(teacherQuery, [user.username]);

      data = finalResult.rows[0];
    } else if (user.role === "Student") {
      const studentQuery = `SELECT student.*, users.username, users.role
      FROM student
      JOIN users ON student.user_id = users.ID
      WHERE users.username = $1`;

      const finalResult = await db.query(studentQuery, [user.username]);
      data = finalResult.rows[0];
    } else {
      data.username = user.username;
      data.role = user.role;
      data.id = user.id;
      data.name = user.username;
    }
  } catch (error) {
    throw error;
  }
  //Nedd user.role, user.username

  return data;
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserByID,
  logout,
  verifyToken,
};

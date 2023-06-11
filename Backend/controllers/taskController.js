const { db } = require("../config/connectToDatabase");
const {
  getSubjectNameById,
  uploadHandler,
  getTaskObjectById,
} = require("../services/services");

//Update Timestamp
// const updateStatus = async (req, res) => {
//   try {
//     const currentTime = new Date(); // Get the current time
//     const query = `
//       UPDATE task
//       SET isActive = false
//       WHERE deadline <= $1;`;

//     await pool.query(query, [currentTime]);

//     res.status(200).json({ message: "isActive field updated successfully." });
//   } catch (error) {
//     console.error("Error updating isActive field:", error);
//     res.status(500).json({ message: "Error updating isActive field." });
//   }
// };

//Assign Task to student (POV Teacher)
const assignTask = async (req, res) => {
  try {
    await db.query("BEGIN");
    const { subject_id, task_name, deadline, description } = req.body;

    //Check if there are file to be uploaded
    if (!req.file) {
      throw new Error("Tidak ada file yang diunggah.");
    }

    //Get Folder Name
    const folderName =
      (await getSubjectNameById(subject_id)) + "/tasks/Folder " + task_name;

    //Upload File and Get URL
    const url = await uploadHandler(req, folderName, task_name);

    // Add task to the database
    const addTaskQuery = `
        INSERT INTO task (name, subject_id, deadline, description, url)
        VALUES ($1, $2, $3, $4, $5) RETURNING id
      `;
    const temp = await db.query(addTaskQuery, [
      task_name,
      subject_id,
      deadline,
      description,
      url,
    ]);

    const task_id = temp.rows[0].id;
    console.log(task_id);

    //Assign Task to all the student who took the subject
    const assignQuery = `
    INSERT INTO submission(student_id, task_id)
    SELECT e.student_id, $2
    FROM enrollment e
    WHERE e.subject_id = $1
    `;
    const results = await db.query(assignQuery, [subject_id, task_id]);
    await db.query("COMMIT");
    res.status(200).json({
      message: "Succefully Assign Task",
      error: false,
      data: results.rowCount,
    });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(404).json({ message: error.message, error: true });
  }
};

//Submit Task from student (POV Student)
const submitTask = async (req, res) => {
  try {
    const { task_id, student_id, submission_name } = req.body;
    //Check if there are file to be uploaded
    if (!req.file) {
      throw new Error("Tidak ada file yang diunggah.");
    }

    //Check submission_name
    if (submission_name == null) {
      throw new Error("Error Please Give Submission Name");
    }

    //Get Subject Name and Task Name
    const task = await getTaskObjectById(task_id);
    //Get Subject ID
    const subject_id = task.subject_id;
    console.log(task);
    //Get Task Name
    const task_name = task.name;

    //Get Folder Name
    const folderName =
      (await getSubjectNameById(subject_id)) +
      "/tasks/Folder " +
      task_name +
      "/submission";

    //Upload File and Get URL
    const url = await uploadHandler(req, folderName, submission_name);

    // Memperbarui status tugas menjadi 'submitted' dan menyimpan waktu pengumpulan
    const query = `
        UPDATE submission
        SET name = $5 , is_completed = $4, submitted_at = CURRENT_TIMESTAMP, url = $3
        WHERE student_id = $1 AND task_id = $2
      `;

    const result = await db.query(query, [
      student_id,
      task_id,
      url,
      true,
      submission_name,
    ]);

    //Response
    res.status(200).json({
      message: "Succefully Submit Task",
      error: false,
      data: result.rowCount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};
//Menambahkan nilai pada tugas murid
const addScore = async (req, res) => {
  try {
    const { submission_id, score } = req.body;
    console.log(req.body);

    const query = `UPDATE submission
    SET score = $2
    WHERE ID = $1;
    `;

    const result = await db.query(query, [submission_id, score]);

    //Response
    res.status(200).json({
      message: "Succefully Add Score",
      error: false,
      data: result.rowCount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

//Melihat Task yang sudah disubmit oleh siswa berdasarkan id dari task (POV Teacher)
const getTaskSubmission = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const query = `
    SELECT t.id as task_id, t.name as task_name, t.deadline, t.description, t.is_active, t.url as link_soal,ts.url as link_submission, ts.is_completed, ts.submitted_at, ts.id as submission_id, ts.score as score, ts.name as name
    FROM task t
    LEFT JOIN submission ts ON t.id = ts.task_id
    WHERE t.id = $1 and is_completed = $2
    `;

    const results = await db.query(query, [task_id, true]);
    const submissions = results.rows;

    res.status(200).json({
      message: "Succefully Get Task Submission",
      error: false,
      data: submissions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

//Melihat List Task yang ada pada subject tertentu (POV Student)
const getTaskBySubject = async (req, res) => {
  try {
    const subject_id = req.params.subject_id;
    const student_id = req.params.student_id;
    const query = `SELECT t.*, s.is_completed
    FROM task t
    INNER JOIN submission s ON t.ID = s.task_id
    WHERE s.student_id = $1
    AND t.subject_id = $2;
    `;

    const results = await db.query(query, [student_id, subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetTaskBySubject",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};
const getAllTask = async (req, res) => {
  try {
    const query = `SELECT * FROM task`;

    const results = await db.query(query);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetAllTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getTaskTeacher = async (req, res) => {
  try {
    console.log(req.params);
    const subject_id = req.params.subject_id;
    console.log(subject_id);

    const query = `SELECT * FROM task WHERE subject_id = $1`;

    const results = await db.query(query, [subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetTaskTeacher",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getActiveTask = async (req, res) => {
  const subject_id = req.params.subject_id;
  const student_id = req.params.student_id;

  try {
    const query = `SELECT t.*, s.is_completed
    FROM task t
    INNER JOIN submission s ON t.ID = s.task_id
    WHERE s.student_id = $1
    AND t.subject_id = $2
    AND t.is_active = true
    AND s.is_completed = false`;

    const results = await db.query(query, [student_id, subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetActiveTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getOverdueTask = async (req, res) => {
  const subject_id = req.params.subject_id;
  const student_id = req.params.student_id;

  try {
    const query = `SELECT t.*, s.is_completed
    FROM task t
    INNER JOIN submission s ON t.ID = s.task_id
    WHERE s.student_id = $1
    AND t.subject_id = $2
    AND t.is_active = false
    AND s.is_completed = false`;

    const results = await db.query(query, [student_id, subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetOverdueTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getCompletedTask = async (req, res) => {
  const subject_id = req.params.subject_id;
  const student_id = req.params.student_id;

  try {
    const query = `SELECT t.*, s.is_completed
    FROM task t
    INNER JOIN submission s ON t.ID = s.task_id
    WHERE s.student_id = $1
    AND t.subject_id = $2
    AND s.is_completed = true`;

    const results = await db.query(query, [student_id, subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetCompletedTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getTaskById = async (req, res) => {
  const task_id = req.params.task_id;

  try {
    const query = `SELECT t.*, s.is_completed
    FROM task t
    INNER JOIN submission s ON t.ID = s.task_id
    WHERE t.id = $1`;

    const results = await db.query(query, [task_id]);

    const task = results.rows[0];

    res.status(200).json({
      message: "Succefully GetTaskById",
      error: false,
      data: task,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getActiveTeacherTask = async (req, res) => {
  const subject_id = req.params.subject_id;

  try {
    const query = `SELECT *
    FROM task t
    WHERE t.subject_id = $1
    AND t.is_active = true`;

    const results = await db.query(query, [subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetActiveTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const getOverdueTeacherTask = async (req, res) => {
  const subject_id = req.params.subject_id;

  try {
    const query = `SELECT *
    FROM task t
    WHERE t.subject_id = $1
    AND t.is_active = false`;

    const results = await db.query(query, [subject_id]);

    const tasks = results.rows;

    res.status(200).json({
      message: "Succefully GetActiveTask",
      error: false,
      data: tasks,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

const updateTaskStatus = async (req, res) => {
  // const subject_Id = req.body.subject_Id; // Assuming subjectId is sent in the request body

  try {
    const currentTime = new Date();

    // Update isActive to false for tasks with the given subjectId and deadline < currentTime
    const result = await db.query(
      "UPDATE task SET is_active = false WHERE deadline < $1",
      [currentTime]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found or deadlines have not passed" });
    }

    res.json({ message: "Tasks isActive updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = {
  assignTask,
  submitTask,
  addScore,
  getTaskSubmission,
  getTaskBySubject,
  getAllTask,
  getOverdueTask,
  getActiveTask,
  getCompletedTask,
  getTaskById,
  getAllTask,
  getTaskTeacher,
  getActiveTeacherTask,
  getOverdueTeacherTask,
  updateTaskStatus,
};

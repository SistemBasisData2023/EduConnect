const { db } = require("../config/connectToDatabase");
const {
  getSubjectNameById,
  uploadHandler,
  getTaskObjectById,
} = require("../services/services");

//AssignTask
//SubmitTask
//GetTaskBySubject

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

//Melihat Task yang sudah disubmit oleh siswa berdasarkan id dari task (POV Teacher)
const getTaskSubmission = async (req, res) => {
  try {
    const task_id = req.params.task_id;
    const query = `
    SELECT t.id, t.name, t.deadline, t.description, t.is_active, t.url as link_soal,ts.url as link_submission, ts.is_completed, ts.submitted_at, ts.id
    FROM task t
    LEFT JOIN submission ts ON t.id = ts.task_id
    WHERE t.id = $1 and is_completed = $2
    `;

    const submissions = results.rows;

    const results = await db.query(query, [task_id, true]);
    res.status(200).json({
      message: "Succefully Submit Task",
      error: false,
      data: submissions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

//Melihat List Task yang ada pada subject tertentu (POV Student)
const getTaskBySubject = async () => {
  try {
    const subject_id = req.params.subject_id;
    const query = `SELECT * FROM task WHERE subject_id = $1`;

    const results = await db.query(query, [subject_id]);

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

module.exports = {
  assignTask,
  submitTask,
  getTaskSubmission,
  getTaskBySubject,
};

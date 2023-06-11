-- Create table
CREATE TABLE users (
ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
username varchar(20) UNIQUE NOT NULL,
password text NOT NULL,
role varchar(20) NOT NULL);


CREATE TABLE classroom(
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE teacher (
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50),
    age int NOT NULL,
    nomor_induk_guru varchar(10) NOT NULL,
    classroom_id UUID UNIQUE REFERENCES classroom(ID),
    user_id UUID REFERENCES users(ID),
);

CREATE TABLE subject (
ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
name VARCHAR(30) UNIQUE NOT NULL,
teacher_id REFERENCES teacher(id),
enroll_code varchar(10) UNIQUE,
image_url text,
feedback_score INTEGER
);

CREATE TABLE feedback(
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id  UUID REFERENCES student(id),
    score INTEGER,
    subject_id  UUID REFERENCES subject(id)
)

CREATE TABLE student (
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50),
    age int NOT NULL,
    nomor_induk_siswa varchar(10) NOT NULL,
    classroom_id UUID REFERENCES classroom(ID),
    user_id UUID REFERENCES users(ID)
);

CREATE TABLE enrollment (
  ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES student(ID),
  subject_id UUID REFERENCES subject(ID)
);



-- ALTER TABLE subject 
-- ADD COLUMN teacher_id UUID NOT NULL;

-- ALTER TABLE subject
-- ADD CONSTRAINT fk_teacher
-- FOREIGN KEY (teacher_id)
-- REFERENCES teacher(teacher_id);

CREATE TABLE resource (
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100) NOT NULL,
    url text UNIQUE NOT NULL,
    description text,
    subject_id UUID REFERENCES subject(ID)
)

CREATE TABLE task(
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100) NOT NULL,
    url text,
    description text,
    deadline TIMESTAMP,
    isActive boolean DEFAULT TRUE,
    subject_id UUID REFERENCES subject(ID)
)

CREATE TABLE submission(
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar(100) NOT NULL,
    url text,
    is_completed boolean DEFAULT FALSE,
    score integer,
    submitted_at TIMESTAMP,
    student_id UUID REFERENCES student(ID),
    task_id UUID REFERENCES task(ID)
)

ALTER TABLE submission
ADD COLUMN name varchar(100) NOT NULL;


-- CREATE TABLE data_gaming (
-- ID serial PRIMARY KEY,
-- Nama_game varchar(20) UNIQUE NOT NULL,
-- Jumlah_game int NOT NULL);


-- Command

-- CREATE TABLE users (
-- ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
-- username varchar(20) UNIQUE NOT NULL,
-- password text NOT NULL,
-- role varchar(20) NOT NULL);

-- CREATE TABLE subject (
-- ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
-- name VARCHAR(30) UNIQUE NOT NULL
-- );

-- CREATE TABLE classroom(
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name VARCHAR(30) UNIQUE NOT NULL
-- );

-- CREATE TABLE student (
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name VARCHAR(50),
--     age int NOT NULL,
--     nomor_induk_siswa varchar(10) NOT NULL,
--     classroom_id UUID REFERENCES classroom(ID),
--     user_id UUID REFERENCES users(ID)
-- );

-- CREATE TABLE enrollment (
--   ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--   student_id UUID REFERENCES student(ID),
--   subject_id UUID REFERENCES subject(ID)
-- );

-- SELECT student.name, student.nomor_induk_siswa, classroom.name FROM student
-- INNER JOIN classroom ON student.classroom_id = classroom.id;
-- WHERE classroom.name = "X IPS 1"
-- ORDER BY student.name ASC;

--   SELECT student.id, student.name, student.nomor_induk_siswa, subject.name as subject_name
--     FROM student
--     INNER JOIN enrollment ON student.id = enrollment.student_id
--     INNER JOIN subject ON subject.id = enrollment.subject_id
--     WHERE subject.name = 'Chemistry'
--     ORDER BY student.name ASC

SELECT s.id as id, s.name as name, s.age as age, nomor_induk_siswa , c.name as classroom_name, c.id as classroom_id
FROM student as s
INNER JOIN classroom as c ON s.classroom_id = c.id
WHERE c.name = 'X IPS 1'


-- ALTER TABLE subject 
-- ADD COLUMN teacher_id UUID;

-- SELECT * FROM teacher;

-- CREATE TABLE teacher (
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name VARCHAR(50),
--     age int NOT NULL,
--     nomor_induk_guru varchar(10) NOT NULL,
--     classroom_id UUID REFERENCES classroom(ID),
--     user_id UUID REFERENCES users(ID)
-- );

-- ALTER TABLE subject
-- ADD CONSTRAINT fk_teacher
-- FOREIGN KEY (teacher_id)
-- REFERENCES teacher(ID);

-- UPDATE subject
-- SET teacher_id = '8bca3bc8-fa5c-49bb-b49e-ad7a4f51bae8'
-- WHERE name = 'Chemistry'

-- SELECT teacher.name, subject.name FROM teacher INNER JOIN subject ON teacher.id = subject.teacher_id

-- SELECT s.name AS student_name, t.name AS teacher_name
-- FROM enrollment e
-- JOIN student s ON e.student_id = s.ID
-- JOIN subject sub ON e.subject_id = sub.ID
-- JOIN teacher t ON sub.teacher_id = t.ID
-- WHERE sub.name = 'Math';

-- CREATE TABLE resource (
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name varchar(100) NOT NULL,
--     url text UNIQUE NOT NULL,
--     description text,
--     subject_id UUID REFERENCES subject(ID)
-- )

-- SELECT * FROM resource 
-- INNER JOIN subject
-- ON resource.subject_id = subject.id
-- WHERE resource.subject_id = 'cc9312c7-16ee-41f1-9bd2-0ee451ef76a5'

-- SELECT r.id, r.name, r.url, r.description, s.name as subject, t.name as teacher
-- FROM resource AS r
-- INNER JOIN subject AS s ON r.subject_id = s.id
-- INNER JOIN teacher AS t ON s.teacher_id = t.id
-- WHERE r.subject_id = 'cc9312c7-16ee-41f1-9bd2-0ee451ef76a5';


  
-- CREATE TABLE task(
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     name varchar(100) NOT NULL,
--     url text,
--     description text,
--     deadline TIMESTAMP,
--     isActive boolean DEFAULT TRUE,
--     subject_id UUID REFERENCES subject(ID)
-- )

-- CREATE TABLE submission(
--     ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     url text,
--     is_completed boolean DEFAULT FALSE,
--     score integer,
--     submitted_at TIMESTAMP,
--     student_id UUID REFERENCES student(ID),
--     task_id UUID REFERENCES task(ID)
-- )

--   INSERT INTO submission(student_id, task_id, url)
--   SELECT e.student_id, $2, $3
--   FROM enrollment e
--   WHERE ss.subject_id = $1

-- SELECT t.id, t.name, t.deadline, t.description, t.isactive, t.url as link_soal,ts.url as link_submission, 
--         ts.is_completed, ts.submitted_at, ts.id
--       FROM task t
--       LEFT JOIN submission ts ON t.id = ts.task_id
--       WHERE t.id = '5aabbea9-e55b-40f6-b0b9-426cb1c5d7b3'
      
-- ALTER TABLE submission
-- ADD COLUMN name varchar(100);

-- ALTER TABLE task
-- RENAME COLUMN isactive TO is_active;

-- SELECT t.id, t.name, t.deadline, t.description, t.is_active, t.url as link_soal,ts.url as link_submission, ts.is_completed, ts.submitted_at, ts.id
--     FROM task t
--     LEFT JOIN submission ts ON t.id = ts.task_id
--     WHERE t.id = '5aabbea9-e55b-40f6-b0b9-426cb1c5d7b3' and is_completed = true

SELECT
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
    classroom ON teacher.classroom_id = classroom.ID;
    
    

SELECT
    resource.ID,
    resource.name AS resource_name,
    resource.url,
    resource.description,
    subject.name AS subject_name
FROM
    resource
JOIN
    subject ON resource.subject_id = subject.ID;
    
    
SELECT teacher.*, users.username, users.role
FROM teacher
JOIN users ON teacher.user_id = users.ID
WHERE users.username = $1

SELECT student.*, users.username, users.role
FROM student
JOIN users ON student.user_id = users.ID;


SELECT subject.ID as subject_id, subject.name as subject_name, teacher.name AS name, teacher.age AS age, teacher.nomor_induk_guru AS nomor_induk_guru, users.username AS username, teacher.id AS id, teacher.classroom_id AS classroom_id, users.role AS role, users.id as user_id
FROM subject
JOIN teacher ON subject.teacher_id = teacher.ID
JOIN users ON teacher.user_id = users.ID;

SELECT t.*, s.
FROM task t
INNER JOIN submission s ON t.ID = s.task_id
WHERE s.is_completed = TRUE and s.student_id = 'e36451d2-b778-4e42-b316-fbb2829974eb'



SELECT s.* , t.name as teacher_name
FROM subject as s
JOIN teacher as t ON s.teacher_id = t.id;
WHERE 


SELECT s.*, e.student_id
FROM subject s
INNER JOIN enrollment e ON e.subject_id = s.ID
WHERE e.student_id = 'e36451d2-b778-4e42-b316-fbb2829974eb'

ALTER TABLE subject
ADD enroll_code VARCHAR(10) UNIQUE;


SELECT subject.*, enrollment.student_id, teacher.name AS teacher_name
FROM subject
JOIN enrollment ON subject.ID = enrollment.subject_id
JOIN teacher ON subject.teacher_id = teacher.ID
WHERE enrollment.student_id = '1e3d88e5-1adf-4dd8-affb-0cda13a377d5'

UPDATE submission
    SET score = '90'
    WHERE ID = '44372dd0-6e28-404e-a765-30a73f90695f';
    
    
ALTER TABLE subject
ADD COLUMN image_url TEXT;	

SELECT ID, name
FROM teacher
WHERE ID NOT IN (SELECT teacher_id FROM subject);

ALTER TABLE subject
ADD COLUMN feedback_score INTEGER DEFAULT 0;	

CREATE TABLE feedback(
    ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id  UUID REFERENCES student(id),
    score INTEGER,
    subject_id  UUID REFERENCES subject(id)
)


SELECT
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
      classroom ON teacher.classroom_id = classroom.ID;
      

    
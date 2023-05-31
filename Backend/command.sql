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
teacher_id REFERENCES teacher(id)
);

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
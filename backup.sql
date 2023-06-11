--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classroom; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.classroom (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.classroom OWNER TO ditoraditya04;

--
-- Name: enrollment; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.enrollment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    student_id uuid,
    subject_id uuid
);


ALTER TABLE public.enrollment OWNER TO ditoraditya04;

--
-- Name: feedback; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.feedback (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    student_id uuid,
    score integer,
    subject_id uuid
);


ALTER TABLE public.feedback OWNER TO ditoraditya04;

--
-- Name: mock_data; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.mock_data (
    id integer,
    name character varying(50),
    classroom_name character varying(50),
    age integer,
    nomor_induk_siswa character varying(50)
);


ALTER TABLE public.mock_data OWNER TO ditoraditya04;

--
-- Name: resource; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.resource (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    url text NOT NULL,
    description text,
    subject_id uuid
);


ALTER TABLE public.resource OWNER TO ditoraditya04;

--
-- Name: student; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.student (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50),
    age integer NOT NULL,
    nomor_induk_siswa character varying(10) NOT NULL,
    classroom_id uuid,
    user_id uuid
);


ALTER TABLE public.student OWNER TO ditoraditya04;

--
-- Name: subject; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.subject (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(30) NOT NULL,
    teacher_id uuid,
    enroll_code character varying(10),
    image_url text,
    feedback_score integer DEFAULT 0
);


ALTER TABLE public.subject OWNER TO ditoraditya04;

--
-- Name: submission; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.submission (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url text,
    is_completed boolean DEFAULT false,
    score integer,
    submitted_at timestamp without time zone,
    student_id uuid,
    task_id uuid,
    name character varying(100)
);


ALTER TABLE public.submission OWNER TO ditoraditya04;

--
-- Name: task; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    url text,
    description text,
    deadline timestamp without time zone,
    is_active boolean DEFAULT true,
    subject_id uuid
);


ALTER TABLE public.task OWNER TO ditoraditya04;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.teacher (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50),
    age integer NOT NULL,
    nomor_induk_guru character varying(10) NOT NULL,
    classroom_id uuid,
    user_id uuid
);


ALTER TABLE public.teacher OWNER TO ditoraditya04;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ditoraditya04
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(20) NOT NULL,
    password text NOT NULL,
    role character varying(20) NOT NULL
);


ALTER TABLE public.users OWNER TO ditoraditya04;

--
-- Data for Name: classroom; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.classroom (id, name) FROM stdin;
c3ed0f47-480a-4ce3-81fa-b854a40ba80f	X MIPA 1
b9342308-457c-400a-a081-75c12a1e0a6a	X IPS 1
5a06a035-a332-48b5-8237-bae71423db56	X MIPA 2
a50a16c7-69b4-464a-9817-139f0b3f099b	X IPS 2
401a21c9-57bf-4516-a748-c67e3bf0f73b	X IPS 3
\.


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.enrollment (id, student_id, subject_id) FROM stdin;
d111a00d-4119-4b9a-8875-0f88974ffbc5	e36451d2-b778-4e42-b316-fbb2829974eb	8c109d04-71e6-4b41-9d84-96ed631585a2
09c076fb-2e07-474e-ae55-2ab66f2b0bfc	b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
6a8d70a3-0f65-4fd6-b5e8-62c0d4849805	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	8c109d04-71e6-4b41-9d84-96ed631585a2
b146dd2c-3bbd-4770-a5d1-2f1271a26dbd	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
19c1c35c-15bb-4237-8b54-fe802d0021d0	e36451d2-b778-4e42-b316-fbb2829974eb	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
\.


--
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.feedback (id, student_id, score, subject_id) FROM stdin;
6780029c-b98e-468b-894b-32a2a059ff3e	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	5	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
22b08033-6beb-4389-a8b1-3c9f04f3190a	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	4	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
c669dab7-e8bb-44cb-902f-01169d73f8c8	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	1	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
01c7ba32-071e-4aeb-8053-773015a89a88	e36451d2-b778-4e42-b316-fbb2829974eb	3	8c109d04-71e6-4b41-9d84-96ed631585a2
83133d2b-b006-46d5-b794-a596354d5239	e36451d2-b778-4e42-b316-fbb2829974eb	5	4ffbb173-8d92-4d0b-873e-6c8ab11017bb
fa338aa9-c23e-4e9a-803d-5bbc4bf51858	e36451d2-b778-4e42-b316-fbb2829974eb	5	4ffbb173-8d92-4d0b-873e-6c8ab11017bb
51974163-2cce-44bd-8016-1cc1a392dae7	e36451d2-b778-4e42-b316-fbb2829974eb	5	8c109d04-71e6-4b41-9d84-96ed631585a2
45dd5d0c-43fa-4397-943d-dfb3b9e96a1c	e36451d2-b778-4e42-b316-fbb2829974eb	5	8c109d04-71e6-4b41-9d84-96ed631585a2
9ff7bab8-e3cb-4696-980c-7cef45e2f8d4	e36451d2-b778-4e42-b316-fbb2829974eb	5	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
68f9443e-7fa6-4a0a-ab71-8d0c5075bd66	e36451d2-b778-4e42-b316-fbb2829974eb	1	4ffbb173-8d92-4d0b-873e-6c8ab11017bb
71782b6b-6d3e-408a-9da2-035e062ff259	e36451d2-b778-4e42-b316-fbb2829974eb	1	4ffbb173-8d92-4d0b-873e-6c8ab11017bb
99c42ec4-0314-462b-a487-377ec58601b6	e36451d2-b778-4e42-b316-fbb2829974eb	1	aa21efb5-2280-410b-82ce-8fe787a7d6c1
\.


--
-- Data for Name: mock_data; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.mock_data (id, name, classroom_name, age, nomor_induk_siswa) FROM stdin;
1	Prefeito Octávio de Almeida Neves Airport	BR-MG	1	1990940765
2	Rovaniemi Airport	FI-LL	2	2756721158
3	Lyon Saint-Exupéry Airport	FR-V	3	3488006794
4	Tucuma Airport	BR-AM	4	2049694393
5	Mammoth Yosemite Airport	US-CA	5	6688020785
6	Smith Reynolds Airport	US-NC	6	9149004328
7	Kapalua Airport	US-HI	7	4252356024
8	Astypalaia Airport	GR-81	8	0367635542
9	Islita Airport	CR-G	9	0506515869
10	Les Bases Airport	GP-U-A	10	5567458754
11	Batna Airport	DZ-05	11	9757621161
12	Quatro de Fevereiro Airport	AO-LUA	12	0787691003
13	Simbai Airport	PG-MPM	13	2173024515
14	Warder Airport	ET-SO	14	3999702842
15	Waterloo Airport	AU-NT	15	0054840007
16	Hang Nadim International Airport	ID-RI	16	8710603433
17	Sauce Viejo Airport	AR-S	17	2698314036
18	Tiruchirapally Civil Airport Airport	IN-TN	18	9421956028
19	Walaha Airport	VU-PAM	19	6427539027
20	Los Colonizadores Airport	CO-ARA	20	6449387408
21	Phoenix-Mesa-Gateway Airport	US-AZ	21	5972424010
22	Gardo Airport	SO-BR	22	7605829647
23	Erbil International Airport	IQ-AR	23	9353070902
24	Range Regional Airport	US-MN	24	5236043409
25	Ormoc Airport	PH-LEY	25	3558910788
26	Lamezia Terme Airport	IT-78	26	6095772346
27	Gomez Nino Apiay Air Base	CO-MET	27	3099809659
28	Noumérat - Moufdi Zakaria Airport	DZ-47	28	1383668558
29	Monte Carmelo Airport	BR-MG	29	1846144426
30	Eisenach-Kindel Airport	DE-TH	30	3410676341
31	Valencia Airport	ES-V	31	1366394887
32	Deadhorse Airport	US-AK	32	5213045642
33	Altenburg-Nobitz Airport	DE-TH	33	1745220445
34	Dubai Creek SPB	AE-DU	34	0067907563
35	Baytown Airport	US-TX	35	1134082053
36	Natitingou Airport	BJ-AK	36	4203745128
37	Buchanan Field	US-CA	37	7633595884
38	El Debba Airport	SD-01	38	8184223641
39	Hood Army Air Field	US-TX	39	2333278684
40	São Félix do Xingu Airport	BR-PA	40	3709339022
41	Gurayat Domestic Airport	SA-08	41	8614707215
42	Paruma Airport	GY-CU	42	2830580397
43	Angama Airport	KE-700	43	0810611791
44	Carpentaria Downs Airport	AU-QLD	44	6462608722
45	Manapouri Airport	NZ-STL	45	1565583809
46	Aiken Regional Airport	US-SC	46	5201875653
47	Clovis Municipal Airport	US-NM	47	7491878121
48	Oceanside Municipal Airport	US-CA	48	4227245095
49	Faisalabad International Airport	PK-PB	49	3542242705
50	Mekane Selam Airport	ET-AM	50	5737617424
\.


--
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.resource (id, name, url, description, subject_id) FROM stdin;
b8ef5853-1ea8-4f39-9e62-dffe96a6f03b	Trigonometri	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Fresources%2FTrigonometri.pdf?alt=media&token=cbfcf67e-0456-439a-94ee-2967b3a0e063	Materi Perbandingan Trigonometri \npada Segitiga Siku-siku.	8c109d04-71e6-4b41-9d84-96ed631585a2
cb45397a-fdc8-4880-b3b9-6800c2cc8591	Perubahan Entalpi	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Fresources%2FPerubahan%20Entalpi.pdf?alt=media&token=c70eaf5a-730b-4947-bcbd-6e63c98123f8	Materi Perubahan Entalpi Menjelaskan Tentang 	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
16b76cfa-2419-4aa1-8838-8fc403825fc4	Triganametri	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Fresources%2FTriganametri.pdf?alt=media&token=883d28eb-d2d6-4db9-bf9e-c16908ed9f45	ini adlaah blabalanlaadd	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
58b7628b-53d1-4473-a751-9c7d277f8054	Testing	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Fresources%2FTesting.pdf?alt=media&token=a813f00b-cc12-476b-8146-15376e6f9240	Testing	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
1fe9dbf9-b815-4b28-b034-6e19b34603d2	Testing2	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Fresources%2FTesting2.pdf?alt=media&token=d63f604c-f051-43ee-b8b1-ae1df6755f7f	Testing	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
a550e53f-ec7d-459e-b2bd-e37348313fa2	Perubahan Entalpi	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Fresources%2FPerubahan%20Entalpi.jpeg?alt=media&token=b936669b-27f4-427d-a1f3-1b5f6c26df66	Materi Perubahan Entalpi Menjelaskan Tentang 	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.student (id, name, age, nomor_induk_siswa, classroom_id, user_id) FROM stdin;
e36451d2-b778-4e42-b316-fbb2829974eb	Dito	19	2106733912	b9342308-457c-400a-a081-75c12a1e0a6a	3688ceaf-e425-4027-bf3d-97a2a717f99d
b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	Dito2	19	2106733913	b9342308-457c-400a-a081-75c12a1e0a6a	1de210b9-fb94-43b9-b5c2-6d5495785465
1e3d88e5-1adf-4dd8-affb-0cda13a377d5	Dito3	19	2106733911	c3ed0f47-480a-4ce3-81fa-b854a40ba80f	6f2ee3e7-70af-4364-9930-679bbb72f2a4
\.


--
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.subject (id, name, teacher_id, enroll_code, image_url, feedback_score) FROM stdin;
4ffbb173-8d92-4d0b-873e-6c8ab11017bb	Physics	4419e6d4-64c2-4861-b12d-210f746efaa7	0987	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/SubjectImage%2FPhysicsImage.jpeg?alt=media&token=0fab87ae-9bfc-4377-8d9c-3301fdedc646	3
aa21efb5-2280-410b-82ce-8fe787a7d6c1	Biology	b1edd9c2-3427-4208-84f3-08bd0e6954da	5432	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/SubjectImage%2FBiologyImage.jpeg?alt=media&token=e474b778-245f-496a-b5b7-c55387cfe58f	1
8c109d04-71e6-4b41-9d84-96ed631585a2	Math	82101751-2a61-4dec-b5d4-d888b9848372	1234	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/SubjectImage%2FMathImage.jpg?alt=media&token=1af93161-a984-4b27-849d-c16539f832a8	4
cc9312c7-16ee-41f1-9bd2-0ee451ef76a5	Chemistry	8bca3bc8-fa5c-49bb-b49e-ad7a4f51bae8	1212	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/SubjectImage%2FChemistryImage.png?alt=media&token=3fa973d1-a3d9-4b2c-aa25-ffdb111552b0	4
\.


--
-- Data for Name: submission; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.submission (id, url, is_completed, score, submitted_at, student_id, task_id, name) FROM stdin;
e5f17f00-eb6e-403b-8275-bc58df2bf3fe	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	5aabbea9-e55b-40f6-b0b9-426cb1c5d7b3	\N
44372dd0-6e28-404e-a765-30a73f90695f	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Ftasks%2FFolder%20Tugas%20Matematika%20Modul%201%2Fsubmission%2FProyek%20SBD.pdf.pdf?alt=media&token=aeb7f933-5049-4568-9118-587fa54127da	t	90	2023-06-07 17:58:35.109267	e36451d2-b778-4e42-b316-fbb2829974eb	5aabbea9-e55b-40f6-b0b9-426cb1c5d7b3	Proyek SBD.pdf
9f4bc3bd-b826-4932-941d-8cc3278f6908	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	e17385d6-2f5a-406f-ab9d-ee51b353de3f	\N
22cdf5e4-5ed8-4c18-9c83-ff76818c808a	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Kimia%20Modul%201%2Fsubmission%2FDashboard%20-%20%20Setting%20Button.jpg.jpeg?alt=media&token=38c7d947-4b90-40eb-90de-f428d413907f	t	100	2023-06-09 21:50:44.346565	e36451d2-b778-4e42-b316-fbb2829974eb	e17385d6-2f5a-406f-ab9d-ee51b353de3f	Dashboard -  Setting Button.jpg
da716445-841e-4432-b4a6-52f997c7de14	\N	f	\N	\N	b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	8651c198-6f78-4ffc-b071-6998b2279372	\N
9d05d0d5-e418-4251-a4b7-3441708aee06	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	8651c198-6f78-4ffc-b071-6998b2279372	\N
7778b0d4-b735-4008-8214-8bb27583f027	\N	f	\N	\N	e36451d2-b778-4e42-b316-fbb2829974eb	0b302e0c-a3de-4567-98b8-e491665b97d5	\N
d4987345-68d1-4a1d-a947-8257cce69404	\N	f	\N	\N	b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	0b302e0c-a3de-4567-98b8-e491665b97d5	\N
30a0638b-9ada-4650-bdbd-91fd7a0fcd9e	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	0b302e0c-a3de-4567-98b8-e491665b97d5	\N
5f0782ff-fda1-48ac-b710-d69b5f3bf546	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Modul%202%20Konfigurasi%20Elektron%2Fsubmission%2Fgclass-removebg-preview.png.png?alt=media&token=4f4e5bf4-e702-47da-9da3-4665b97f52ed	t	\N	2023-06-09 23:04:18.360999	e36451d2-b778-4e42-b316-fbb2829974eb	8651c198-6f78-4ffc-b071-6998b2279372	gclass-removebg-preview.png
093fc83d-eb30-4fc5-b2a0-6d4128662839	\N	f	\N	\N	b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	3255b29f-10c0-476c-99f2-693b848412bc	\N
7862bac3-72b9-4acd-9b75-5685fdb3473f	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	3255b29f-10c0-476c-99f2-693b848412bc	\N
aa0cfb9a-2b02-4a97-881e-69c88643dd34	\N	f	\N	\N	e36451d2-b778-4e42-b316-fbb2829974eb	3255b29f-10c0-476c-99f2-693b848412bc	\N
eed1b1c9-7634-4924-8fb6-b8a4b7da050a	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Kimia%20Modul%201%2Fsubmission%2FTugas%20KImia%20Modul%201%20Raditya.pdf.pdf?alt=media&token=a52c84f8-39d6-46fb-9a0e-a9b8dece4063	t	70	2023-06-10 07:12:09.588392	b5a997e4-fb6f-4c85-9ee7-b8b6c6e39939	e17385d6-2f5a-406f-ab9d-ee51b353de3f	Tugas KImia Modul 1 Raditya.pdf
6a9c87f4-b779-4cdb-a31b-0ffcca4929bf	\N	f	\N	\N	e36451d2-b778-4e42-b316-fbb2829974eb	52037dcf-cc9e-43aa-af61-cec003be2650	\N
62d6dc8d-2156-40be-ae21-36a3d6d2bf0a	\N	f	\N	\N	1e3d88e5-1adf-4dd8-affb-0cda13a377d5	52037dcf-cc9e-43aa-af61-cec003be2650	\N
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.task (id, name, url, description, deadline, is_active, subject_id) FROM stdin;
0b302e0c-a3de-4567-98b8-e491665b97d5	Tugas Modul 3 Kimia Organik	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Modul%203%20Kimia%20Organik%2FTugas%20Modul%203%20Kimia%20Organik.pdf?alt=media&token=b71f0d1d-9fd2-459d-a121-0ae645b3a60d	Kimia organik adalah percabangan studi ilmiah dari ilmu kimia mengenai struktur, sifat, komposisi, reaksi, dan sintesis senyawa organik.	2023-06-15 17:00:00	t	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
3255b29f-10c0-476c-99f2-693b848412bc	Tugas Modul 4 Atom	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Modul%204%20Atom%2FTugas%20Modul%204%20Atom.png?alt=media&token=01b65ff0-eb9e-4796-9d94-30e0ccb83e0c	Tugas untuk persiapan UTS	2023-06-23 17:00:00	t	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
5aabbea9-e55b-40f6-b0b9-426cb1c5d7b3	Tugas Matematika Modul 1	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Ftasks%2FFolder%20Tugas%20Matematika%20Modul%201%2FTugas%20Matematika%20Modul%201.pdf?alt=media&token=63a4afd1-ab55-4acd-baee-e1d81fa47a6f	Tugas Matematika Modul 1 Tentang Trigonometri dan Integral	2023-05-31 09:01:02.591	f	8c109d04-71e6-4b41-9d84-96ed631585a2
e17385d6-2f5a-406f-ab9d-ee51b353de3f	Tugas Kimia Modul 1	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Kimia%20Modul%201%2FTugas%20Kimia%20Modul%201.pdf?alt=media&token=afb39406-4b62-4830-9241-c1b2ec6b67d7	Tugas Kimia Modul 1 Tentang Termokimia dan Kimia Organik	2023-06-08 13:24:29.981	f	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
52037dcf-cc9e-43aa-af61-cec003be2650	Tugas Modul 2 Matematika	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Math%2Ftasks%2FFolder%20Tugas%20Modul%202%20Matematika%2FTugas%20Modul%202%20Matematika.pdf?alt=media&token=a16ee550-3aba-4aa8-ac2f-bfcbf26a7568	Belajar mengenai Transformasi Laplace	2023-06-16 00:00:00	t	8c109d04-71e6-4b41-9d84-96ed631585a2
8651c198-6f78-4ffc-b071-6998b2279372	Tugas Modul 2 Konfigurasi Elektron	https://firebasestorage.googleapis.com/v0/b/myfirststorage-1caa0.appspot.com/o/Chemistry%2Ftasks%2FFolder%20Tugas%20Modul%202%20Konfigurasi%20Elektron%2FTugas%20Modul%202%20Konfigurasi%20Elektron.pdf?alt=media&token=7457d0f3-fd3b-4e94-90da-a7870b2d8946	Konfigurasi elektron adalah susunan elektron berdasarkan kulit atau orbital dari suatu atom.	2023-06-08 17:00:00	f	cc9312c7-16ee-41f1-9bd2-0ee451ef76a5
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.teacher (id, name, age, nomor_induk_guru, classroom_id, user_id) FROM stdin;
82101751-2a61-4dec-b5d4-d888b9848372	raditya2	30	1212121232	b9342308-457c-400a-a081-75c12a1e0a6a	5e6826cd-2433-4b5f-b821-f7f009a0166d
8bca3bc8-fa5c-49bb-b49e-ad7a4f51bae8	raditya	30	1212121232	c3ed0f47-480a-4ce3-81fa-b854a40ba80f	b57dca65-f072-4200-94a0-0fcdadaaab40
4419e6d4-64c2-4861-b12d-210f746efaa7	Mr. Bisma	50	2101010922	5a06a035-a332-48b5-8237-bae71423db56	779f2edc-627a-4454-84cf-fe6a4fc09c69
b1edd9c2-3427-4208-84f3-08bd0e6954da	Mr. Dio	25	2101010923	a50a16c7-69b4-464a-9817-139f0b3f099b	54eee768-8379-480a-8a9b-38a7f4383576
37ecdb95-57bb-479d-aaeb-60646ba2443d	Mr. Bintang	40	219832471	401a21c9-57bf-4516-a748-c67e3bf0f73b	87b5ad9a-9db1-4b9b-9bc2-b1d0e4fa17e6
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ditoraditya04
--

COPY public.users (id, username, password, role) FROM stdin;
6d905731-2a06-4b10-8450-87c307b83917	Raditya	$2b$10$.PPb6avHKZOvIJfqS1/uGeWFYkdi8HUr2EmppfRH8S90qx8xlrt9q	Admin
6432f8a2-9f3a-41f0-bb43-52e234524cf9	Raditya2	$2b$10$d2EjnbfQt/LrjTCQZ/OZNOI084Sd/4n0FoLjeozE/DO5cuj7go8Si	Admin
3688ceaf-e425-4027-bf3d-97a2a717f99d	student	$2b$10$oyHI4auukNU7tF1mADjtuOs0ilZauUHX8Eq92/OhvzfeBtcpfzS7G	Student
1de210b9-fb94-43b9-b5c2-6d5495785465	student2	$2b$10$8WiVf63nCRt9g660PeYL0u/TLXCOpwjV4txcwqK0B8xRICXkOtjga	Student
6f2ee3e7-70af-4364-9930-679bbb72f2a4	student3	$2b$10$/x/da1er8efW/YmoYN9g6OIUTZoBnMNap4.DgViAouJSGMbaALQRO	Student
b57dca65-f072-4200-94a0-0fcdadaaab40	teacher	$2b$10$rKEGZNP5lhPAq1HoqZnIgeVGC/WrqzyUCORfyDrUWd4SOKuwy6iVC	Teacher
5e6826cd-2433-4b5f-b821-f7f009a0166d	teacher2	$2b$10$au3zOwj9OYMYsFAJEnjP1ODfGpBfbqkrn/mT4HSgof.5HXhDdnmRG	Teacher
779f2edc-627a-4454-84cf-fe6a4fc09c69	teacher3	$2b$10$J8V37SChaPkS8m7hJp6jYulF1gYF6ApwpLAvrfpQX6iGC3N4Xwv3O	Teacher
54eee768-8379-480a-8a9b-38a7f4383576	teacher4	$2b$10$p/zjU9Wvvnmh82/GLz1MrucVGNwC5gAS87bD.pTXFcjdsAo07J5WO	Teacher
87b5ad9a-9db1-4b9b-9bc2-b1d0e4fa17e6	teacher5	$2b$10$BLLOct/s5Ra2Co3FMwwnWOubD6qn4F8yXhUqzEu8wy6O8978GW6DW	Teacher
\.


--
-- Name: classroom classroom_name_key; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_name_key UNIQUE (name);


--
-- Name: classroom classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.classroom
    ADD CONSTRAINT classroom_pkey PRIMARY KEY (id);


--
-- Name: enrollment enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_pkey PRIMARY KEY (id);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (id);


--
-- Name: resource resource_url_key; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_url_key UNIQUE (url);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


--
-- Name: subject subject_enroll_code_key; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_enroll_code_key UNIQUE (enroll_code);


--
-- Name: subject subject_name_key; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_name_key UNIQUE (name);


--
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (id);


--
-- Name: submission submission_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.submission
    ADD CONSTRAINT submission_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: enrollment enrollment_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: enrollment enrollment_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id);


--
-- Name: feedback feedback_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: feedback feedback_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id);


--
-- Name: subject fk_teacher; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES public.teacher(id);


--
-- Name: resource resource_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id);


--
-- Name: student student_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id);


--
-- Name: student student_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: submission submission_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.submission
    ADD CONSTRAINT submission_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: submission submission_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.submission
    ADD CONSTRAINT submission_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task(id);


--
-- Name: task task_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(id);


--
-- Name: teacher teacher_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_classroom_id_fkey FOREIGN KEY (classroom_id) REFERENCES public.classroom(id);


--
-- Name: teacher teacher_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ditoraditya04
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


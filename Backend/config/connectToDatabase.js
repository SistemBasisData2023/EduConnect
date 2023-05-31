const { Client } = require("pg");

// const db = new Client({
//   //Tambahkan parameter yang sesuai untuk melakukan koneksi dengan database
//   user: "ditoraditya04",
//   host: "ep-curly-star-451500.ap-southeast-1.aws.neon.tech",
//   database: "Testing_Proyek",
//   password: "bCgO5MB0ZoHQ",
//   port: 5432,
//   sslmode: "require",
//   ssl: true,
// });

const db = new Client({
  //Tambahkan parameter yang sesuai untuk melakukan koneksi dengan database
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  sslmode: "require",
  ssl: true,
});

const connectToDB = () => {
  db.connect((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Database berhasil terkoneksi");
  });
};

module.exports = {
  db,
  connectToDB,
};

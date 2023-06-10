const { db } = require("../config/connectToDatabase");

function paginatedResults(query) {
  return async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 0;
      const search = req.query.search;

      //OFFSET = Page * limit

      // Append the WHERE clause for search if a search term is provided
      if (search) {
        query += ` WHERE column_name ILIKE '%${search}%'`; // Replace 'column_name' with the actual column you want to search in
      }

      query += ` LIMIT ${limit} OFFSET ${page * limit}`; // Append the LIMIT and OFFSET clauses to the query

      return query;
    } catch (err) {
      console.error(err);
      res.status(500).send("Error occurred during pagination");
    }
  };
}

// function paginatedResults(table) {
//   return async (req, res, next) => {
//     try {
//       const { limit, offset, search } = req.query; // Get the limit, offset, table name, and search term from the query parameters

//       let query = `SELECT * FROM ${table}`; // Use the dynamic table name in the query

//       // Append the WHERE clause for search if a search term is provided
//       if (search) {
//         query += ` WHERE column_name ILIKE '%${search}%'`; // Replace 'column_name' with the actual column you want to search in
//       }

//       query += ` LIMIT $1 OFFSET $2`; // Append the LIMIT and OFFSET clauses to the query

//       // Execute the query with the provided limit and offset
//       const { rows } = await db.query(query, [limit, offset]);
//       console.log(rows);
//       res.paginatedResults = rows; // Store the retrieved data in a local variable for subsequent middleware or route handlers
//       next(); // Call the next middleware or route handler
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error occurred during pagination");
//     }
//   };
// }

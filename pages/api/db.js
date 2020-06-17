const { Pool, Client } = require("pg");
process.env.PG_CONNNECTION_STRING = "postgresql://postgres:welcome@grepawk.com:5432/grepawk";
const db = {
  connect: function () {
    const client = new Client({ connectionString: process.env.PG_CONNNECTION_STRING });
    return client;
  },
  query: function (query, args = []) {
    //systemctl daemon-reload
    return new Promise((resolve, reject) => {
      const pool = new Pool({
        connectionString: process.env.PG_CONNNECTIOenN_STRING
      });
      pool.query(query, args, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
        pool.end();
        return;
      });
    });
  },
  exec: function (query, args = []) {
    //systemctl daemon-reload
    return new Promise((resolve, reject) => {
      const pool = new Pool({
        connectionString: process.env.PG_CONNNECTION_STRING
      });
      pool.query(query, args, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
        pool.end();
        return;
      });
    });
  }
};

db.query("select now()");

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asdf1234',
  port: 3306,
  database: 'test_db',
})

function getAllMemos(callback) {
  connection.query(`select * from memos order by id desc`, (err, rows, fields) => {
    if (err || rows.length === 0) {
      return callback([]);
    }

    return callback(rows);
  });
}

module.exports = {
  getAllMemos,
}
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asdf1234',
  port: 3306,
  database: 'test_db',
  dateStrings: 'date'
})

function getAllMemos(callback) {
  connection.query(`select * from memos order by id desc`, (err, rows, fields) => {
    if (err || rows.length === 0) {
      return callback([]);
    }

    return callback(rows);
  });
}

function insertMemo(content, callback) {
  connection.query(`insert into memos (content, created_at, updated_at) values ('${content}', now(), now())`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  )
}

module.exports = {
  getAllMemos,
  insertMemo
}
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'nichuiniu'
});

module.exports = {
  insertGushiwen: function(num, title,author,content,dynasty,audiourl,scores,tag){
    console.log('insert Gushiwen into tables')

    let sql  = {num: num, title: title,author:author,content: content, 
    dynasty: dynasty,audiourl:audiourl,scores: scores, tag: tag};

    connection.query('INSERT ignore INTO tbl_nichuiniu_gushiwen SET ?', sql, function(err, results, fields){
          if (err) throw err;
          console.log('The affect row is: ' + results.insertId);
        }
    );
  }
}


// 单独测试使用的方法
// connection.connect();

// var post  = {num: 2, title: 'title',author:'author',content: 'content', 
// dynasty: 'dynasty',audiourl:'audiourl',scores: 1, tag: 'title'};

// connection.query('INSERT ignore INTO tbl_nichuiniu_gushiwen SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ' + results.insertId);
// });

// connection.end();
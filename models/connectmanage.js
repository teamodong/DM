var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'nodejs',
    database: 'nodejs',
    port: 3306
});

var query=function(sql,callback){

    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};


function insert(sql,param,callback){
    connection.query(sql, param, function(err, result) {
        if (err) throw err;
        connection.commit(function(err) {
            if (err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            callback(err,result);//res返回数据
        });
    });
}


function update(sql,arr,callback){
    connection.query(sql,arr,function(err,result){
        if (err) throw err;
        connection.commit(function(err) {
            if (err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            callback(err,result);//res返回数据
        });
    });
}


function deleteB(sql,param,callback){
    connection.query(sql, param, function(err, result) {
        if (err) throw err;
        connection.commit(function(err) {
            if (err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            callback(err,result);//res返回数据
        });
    });
}

exports.query=query;
exports.insert=insert;
exports.update=update;
exports.delete=deleteB;

module.exports = pool;
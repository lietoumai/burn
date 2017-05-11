/**
 * Created by lcx on 2017/4/23.
 */
var mysql = require('mysql');
var option = require('./../dbconfig');
var domain = require('domain');
var domain_sql = domain.create();

domain_sql.on('error',function () {
    console.log('sql error');
});

function getClient(callback) {
    domain_sql.run(function () {
        var pool = mysql.createPool(option);
        pool.connectionLimit=20;
        pool.queueLimit=15;
        pool.getConnection(function (error,client) {
            callback(client);
        })
    });
}
/*

function getClient(callback) {
    domain_sql.run(function () {
        var pool = mysql.createPool(option);
        pool.connectionLimit=20;
        pool.queueLimit=15;
        pool.getConnection(function (error,client) {
            callback(client);
        })
    });
}*/


module.exports = getClient;
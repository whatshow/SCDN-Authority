/* mongoDB连接控制 */
//配置
var mongodb = require('mongodb');
var mongodbConfig = require("../config/dbConfig");
var poolModule = require('generic-pool');                               //数据库连接线程池（提高并发能力）
var mongoClient = mongodb.MongoClient;
var object = require("objectid");
//时间工具
var dateUtil = require("./DateUtil");
/**
 * 配置模块
 */
var mongo_url = 'mongodb://' + mongodbConfig.ecs1.ip + ":" + mongodbConfig.ecs1.port + "/" + mongodbConfig.ecs1.db.xp.dbName;
var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        //连接数据库
        mongoClient.connect(
            mongo_url,
            {
                server:{poolSize:1, auto_reconnect:false}
            },
            function(err,db){
                if(err){
                    fail();
                }else{
                    //进行认证
                    db.authenticate(mongodbConfig.ecs1.db.xp.userName, mongodbConfig.ecs1.db.xp.pwd, function(err, db_result){
                        if(err){
                            //授权失败
                            callback(err);
                        }else{
                            //授权成功，把db对象作为参数传递，最后用来关闭
                            //console.log("授权成功");
                            //console.log(db);
                            callback(err, db);
                        }
                    })
                }
            }
        );
    },
    //当超时则释放连接（新版本完全交给连接池自己完成）
    destroy  : function(obj) {
        /* 这里采用防守编程，不推荐 */
        if(typeof(obj.logout) === 'function'){
            console.log(dateUtil.GetCurrentTimeStr() + " 退出MongoClient");
            obj.logout();
        }else if(typeof(obj.close) === 'function'){
            console.log(dateUtil.GetCurrentTimeStr() + " 关闭db");
            obj.close();
        }else if(typeof(obj.end) === 'function'){
            console.log(dateUtil.GetCurrentTimeStr() + " MongoClient结束");
            obj.end();
        }else{
            console.log(dateUtil.GetCurrentTimeStr() + " 连接池释放结果未释放，连接池得到对象是：");
            console.log(obj);
        }
    },
    max      : 10,//根据应用的可能最高并发数设置
    idleTimeoutMillis : 30000,
    log : false
});
/**
 * 开启连接池
 */
module.exports.start = function(callback){
    pool.acquire(callback);
};
/**
 * 关闭连接池
 */
module.exports.release = function(db){
    pool.release(db);
};

/**
 * objectid模块
 */
module.exports.objectId = object;
const express=require('express');
const bodyParser=require('body-Parser');
const userRouter=require('./routers/user.js');
//创建web服务器
var server=express();
server.listen(3000);
//托管静态资源
server.use(express.static('public'));
//使用bodyparser解析post数据
server.use(bodyParser.urlencoded({
	extended:false
}));
//挂载
server.use('/user',userRouter);
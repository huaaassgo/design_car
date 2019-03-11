const express=require('express');
const pool=require('../pool.js');
//创建用户路由
var router=express.Router();
//注册
//验证用户名
router.post('/register_uname',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	if(!$uname){
		res.send('2');
		return;
	}
	pool.query('SELECT * FROM car_user WHERE uname=?',[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('1');
		}else{
			res.send('0');
		}
	})
})
router.post('/register',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	pool.query('INSERT INTO car_user VALUE (null,?,?,?,?,null)',[$uname,$upwd,$email,$phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}else{
			res.send('0');
		}
	})
})
//导出路由器
module.exports=router;
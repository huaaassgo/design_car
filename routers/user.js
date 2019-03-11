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
//验证密码
router.post('/register_upwd',(req,res)=>{
	var obj=req.body;
	var $upwd1=obj.upwd1;
	var $upwd2=obj.upwd2;
	if(!$upwd1){
		res.send('1_0');
		return;
	}else if(!$upwd2){
		res.send('2_0');
		return;
	}else if($upwd1!=$upwd2){
		res.send('3');
		return;
	}else if($upwd2==$upwd1){
		res.send('1');
		return;
	}
})
//验证邮箱
router.get('/register_email',(req,res)=>{
	var obj=req.query;
	var $email=obj.email;
	var checkemail=$email.indexOf('@');
	if($email==''){
		res.send('0');
		return;
	}else if(checkemail=='-1'){
		res.send('-1');
		return;
	}else{
		res.send('1');
		return;
	}
})
//验证手机
router.get('/register_phone',(req,res)=>{
	var obj=req.query;
	var $phone=obj.phone;
	if(!$phone){
		res.send('0');
		return;
	}else if($phone.length<11||$phone.length>11){
		res.send('2');
		return;
	}else{
		res.send('1');
		return;
	}
})
//注册
router.post('/register',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	if(!$phone){
		res.send('4_0');
		return;
	}
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
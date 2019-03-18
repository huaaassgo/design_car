const express=require('express');
const pool=require('../pool.js');
//创建管理路由
var router=express.Router();
//用户列表
router.get('/user_list',(req,res)=>{
	var obj=req.query;
	pool.query('SELECT * FROM car_user',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//列表删除
router.get('/user_delete',(req,res)=>{
	var obj=req.query;
	var $uid=obj.uid;
	console.log($uid);
	pool.query('DELETE FROM car_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
	})
})
//用户修改前的导入查询
router.get('/user_query',(req,res)=>{
	var obj=req.query;
	console.log(obj);
	var $uid=obj.uid;
	//没有别的数据传输
	// var $uname=obj.uname;
	// var $email=obj.email;
	// var $phone=obj.phone;
	// var $gender=obj.gender;
	// if(!$uname){
	// 	res.send('用户名不能为空');
	// 	return;
	// }
	// if(!$email){
	// 	res.send('邮箱不能为空');
	// 	return;
	// }
	// if(!$phone){
	// 	res.send('手机号不能为空');
	// 	return;
	// }
	pool.query('SELECT * FROM car_user WHERE uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}
	})
})
//用户修改
router.post('/user_update',(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	var $uname=obj.uname;
	var $email=obj.email;
	var $phone=obj.phone;
	if(!$uname){
		res.send('1_0');
		return;
	}
	if(!$email){
		res.send('2_0');
		return;
	}
	if(!$phone){
		res.send('3_0');
		return;
	}
	pool.query('UPDATE car_user SET uname=?,email=?,phone=?',[$uname,$email,$phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
	})
})
//商品列表
router.get('/product_list',(req,res)=>{
	var obj=req.query;
	pool.query('SELECT * FROM car_product',(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//添加商品
router.post('/product_add',(req,res)=>{
	var obj=req.body;
	console.log(obj);
	var $pname=obj.pname;
	var $price=obj.price;
	var $ptxt=obj.ptxt;
	if(!$pname){
		res.send('1_0');
		return;
	}
	if(!$price){
		res.send('2_0');
		return;
	}
	if(!$ptxt){
		res.send('3_0');
		return;
	}
	pool.query('INSERT INTO car_product VALUE (null,?,?,?)',[$pname,$price,$ptxt],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
	})
})
//商品列表删除
router.get('/product_delete',(req,res)=>{
	var obj=req.query;
	console.log($pid);
	pool.query('DELETE FROM car_product WHERE pid=?',[$pid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('1');
		}
	})
})
//商品修改前导入查询
router.get('/product_query',(req,res)=>{
	var obj=req.query;
	console.log(obj);
	var $pid=obj.pid;
	pool.query('SELECT * FROM car_product WHERE pid=?',[$pid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}
	})
})
//导出
module.exports=router;
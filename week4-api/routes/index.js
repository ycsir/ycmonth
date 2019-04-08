var express = require('express');
var router = express.Router();
var Mongo=require('mongodb-curd');
var batabaseName='yang';
var collcationName='week4';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getIndexData', function(req, res, next) {
  Mongo.find(batabaseName,collcationName,function(result){
      if(!result){
        res.send({
            code:0,
            mes:"error"
          })
      }else{
          res.send({
            code:1,
            mes:"success",
            data:result
          })
      }
  })
});


router.post('/getAddData', function(req, res, next) {
  let {name,phone,address}=req.body;
  if(!name||!phone||!address){
    return res.send({code:2,msg:"参数不完整"})
  }
  Mongo.insert(batabaseName,collcationName,req.body,function(result){
    if(!result){
       res.send({
           code:0,
           mes:"error"
        })
    }else{
        res.send({
           code:1,
           mes:"success",
           data:result
        })
    }
  })
});



router.get('/deleteData', function(req, res, next) {
    let {_id}=req.query;
    Mongo.remove(batabaseName,collcationName,{"_id":_id},function(result){
      if(!result){
        res.send({
            code:0,
            mes:"error"
          })
      }else{
          res.send({
            code:1,
            mes:"success",
            data:result
          })
      }
  })
});


router.get('/getupData', function(req, res, next) {
  let {_id}=req.query;
  Mongo.find(batabaseName,collcationName,{"_id":_id},function(result){
      if(!result){
        res.send({
            code:0,
            mes:"error"
          })
      }else{
          res.send({
            code:1,
            mes:"success",
            data:result
          })
      }
  })
});

router.post('/upDatas', function(req, res, next) {
  let {_id,name,phone,address}=req.body;
  if(!name||!phone||!address){
    return res.send({code:2,msg:"参数不完整"})
  }
console.log(req.body)
    Mongo.update(batabaseName,collcationName,[{"_id":_id},{"name":name,"phone":phone,"address":address}],function(result){
      if(!result){
        res.send({
            code:0,
            mes:"error"
          })
      }else{
          res.send({
            code:1,
            mes:"success",
            data:result
          })
      }
  })
});
module.exports = router;

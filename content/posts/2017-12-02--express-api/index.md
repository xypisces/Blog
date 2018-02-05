---
title: Express编写restful风格api
subTitle: 成为全栈工程师的第一步，给你自己写个接口吧。
date: "2017-12-02"
path: "/express-api/"
cover: express.jpg
---

> 前后端分离的大背景，学习node构建为前端提供json格式的数据，遵循restful api的设计风格，有利于前端工程师的进一步深入，向全栈工程师又迈出一小步。

### 环境
- Node.js
- MongoDB

环境安装我就不细讲了，搜索引擎都有，Window配置MongoDB是有点烦的，开发还是尽量来台mac吧.

### 文件目录
```
-app  
  -models //数据库相关
     -bear.js
-package.json //依赖文件
-server.js //node服务
```

步骤是npm init后会生成package.json,然后安装相关依赖
```js
  "dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.2",
    "mongoose": "^4.13.5"
  }
```
### 启动一个node服务
```javascript
// express为node的框架，虽然现在koa好像比较流行，但是还值得入门学一下。
// body-parser可以理解为解析数据的工具
// app.use(path,callback),为指定路径添加中间件，如果没有path,则默认'/'，
var express = require('express');  
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req,res){
  console.log('something is get!!');
  res.json({
    message: 'hello, world!'
  })
})

app.use('/api', router);
app.listen(port);
console.log('magic is coming' + port);
```
### 数据库服务
bear.js
```javascript
// new Schema生成一张表，
// mongoose.model(name,Schema)给表命名
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String
});
module.exports = mongoose.model('Bear', BearSchema);
```
### api编写
server.js
```javascript
....
// 引入mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_api');

var Bear = require('./app/models/bear');
....
//post请求获取数据 req.body.name
//get请求获取数据 req.params.name.
router.route('/bears').post(function(req,res){
    var bear = new Bear();
    bear.name = req.body.name;
      console.log(bear);
    bear.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({
        message: 'bear is created!!!'
      })
    })
  })
  .get(function(req,res){
    Bear.find(function(err,bears){
      if(err){
        res.send(err);
      }
      res.json(bears);
    })
  })

```
### 相关完整代码
server.js
```javascript
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_api');

var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// middleware
router.use(function(req,res,next){
  console.log('something is happen!!');
  next();
})

router.route('/bears').post(function(req,res){
    var bear = new Bear();
    bear.name = req.body.name;
      console.log(bear);
    bear.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({
        message: 'bear is created!!!'
      })
    })
  })
  .get(function(req,res){
    Bear.find(function(err,bears){
      if(err){
        res.send(err);
      }
      res.json(bears);
    })
  })

router.route('/bears/:bear_id').get(function(req,res){
  Bear.findById(req.params.bear_id,function(err,bear){
    if(err){
      res.send(err)
    }
    res.json(bear);
  })
})
.put(function(req,res){
  Bear.findById(req.params.bear_id, function(err, bear){
    if(err){
      res.send(err)
    }
    bear.name = req.body.name;
    bear.save(function(err){
      if(err){
        res.send(err)
      }
      res.json({
        message: 'Bear is update success!!!'
      })
    })
  })
})
.delete(function(req,res){
  Bear.remove({
    _id: req.params.bear_id
  }, function(err,bear){
    if(err){
      res.send(err)
    }
    res.json({
      message: 'delete is success!!!'
    })
  })
})


router.get('/', function(req,res){
  console.log('something is get!!');
  res.json({
    message: 'hello, world!'
  })
})

app.use('/api', router);

app.listen(port);
console.log('magic is coming' + port);
```

总结：师傅领进门，修行看个人，看上去好像挺简单，但是也需要自己手打出来理解还深一点，特别上刚入门的同学，实践出真知啊。
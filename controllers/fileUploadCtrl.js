/**
 * Created by hui on 2016-12-29.
 */
var fs = require('fs');
var path = require('path');

var fileUploadCtrl = {
    /**
     * 通过表单上传图片
     * @param req
     * @param res
     * @param callback
     */
    upload : function(req, res,callback){
        console.log(req.files.fileName);
        // res.send(req.body,req.files,req.files.file.path);
        //get filename
        var filename = req.files.fileName.originalFilename || path.basename(req.files.fileName.path);
        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length);

        //copy file to a common directory
        if(!fs.existsSync('public/images/'+subDir+'/')){
            fs.mkdirSync('public/images/'+subDir+'/')
        }
        var targetPath = 'public/images/'+subDir+'/' +subDir+t+".png";
        //copy file
        fs.createReadStream(req.files.fileName.path).pipe(fs.createWriteStream(targetPath));
        //return file url
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
        callback('/images/'+subDir+'/' +subDir+t+".png")
    },
    base64Upload : function (req,res,callback) {
      /* var form = new multiparty.Form();
        form.parse(req,function (err,fields,files) {
            console.log(fields)
        })*/

        var params = req.body || req.params;
        var imgData = params.imgData.replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer = new Buffer(imgData,"base64");

        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length)
        //如果文件夹是空就创建文件夹
        if(!fs.existsSync('public/images/'+subDir+'/')){
            fs.mkdirSync('public/images/'+subDir+'/')
        }
        fs.writeFile('public/images/'+subDir+'/'+subDir+t+'.png',dataBuffer,function (err) {
            if(err){
                res.send(err)
            }else{
                callback('/images/'+subDir+'/'+subDir+t+'.png');
                //res.send('保存成功！')
            }
        })

    },
    multiFileUpload : function (req,res,cb) {
        var _this=this;
        var urlArray = [];
        var i = 1;
        console.log('进入 ')
        while (i != null){
            if (req.files["file"+i]){
                console.log('上')
                //执行上传
                _this._upload(req, res,i,function (url) {
                    console.log('cb')
                    urlArray.push(url)
                });

            }else{
                i =null;
                cb(urlArray);
                return;
            }
            i++
        }
    }
    , //用绝对路径删除文件
    delFile : function(url){
        console.log(path.dirname(__filename).replace('\controllers','')+ 'common')
        var filePath = path.dirname(__filename).replace('\controllers','') + 'common'+url;
        console.log(filePath)
        fs.unlinkSync(filePath);
    }, //用相对路径删除文件
    delFileTwo : function (url) {
        fs.unlinkSync("public"+url);
    }, //上传队列文件
    _upload : function (req,res,index,callback){
        console.log(req.files)
            //var filename = req.files["file"+index].originalFilename || path.basename(req.files["file"+index].path);
            //path接口可以指定文件的路径和文件名称，"\结尾默认为路径，字符串结尾默认为文件名"
          //  var targetPath = path.dirname("") + '/public/uploadFiles/' + filename;
            //fs创建指定路径的文件并将读取到的文件内容写入
          //  fs.createReadStream(req.files["file"+index].path).pipe(fs.createWriteStream(targetPath));







        var date = new Date;
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        var subDir = ''+y+('00'+m).substring(m.toString().length)+('00'+d).substring(d.toString().length);

        //copy file to a common directory
        if(!fs.existsSync('public/images/'+subDir+'/')){
            fs.mkdirSync('public/images/'+subDir+'/')
        }
        var targetPath = 'public/images/'+subDir+'/' +subDir+t+index+".png";
        //copy file
        fs.createReadStream(req.files["file"+index].path).pipe(fs.createWriteStream(targetPath));
        //return file url
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
        callback('/images/'+subDir+'/' +subDir+t+index+".png")






        }

}

module.exports = fileUploadCtrl;


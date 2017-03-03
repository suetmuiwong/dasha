var ClientPhotos = require('../models/clientPhotos');
var fileUploadCtrl = require('../controllers/fileUploadCtrl');
exports.add = function (req, res) {
    console.log(req);
    var photoSetName = req.query.photoSetName;
    var parentId = req.query.parentId;

        //新增
       var  _photoSetName = new PhotoSetName({
            photoSetName: photoSetName,
           parentId : parentId
        });
        _photoSetName.save(function (err,photoSetName) {
            if(err){
                console.log(err);
            }
            PhotoSetName.findByParentId(parentId,function (err,photoSetName) {
                if (err) console.log(err);
                res.json({
                    code : 200,
                    data : photoSetName
                })
            })
        })


};

exports.addView = function (req,res) {
    var params = req.params;
    res.render('photoSetAdd',{
        title : '增加图片集',
        parentId : params.parentId,
        setNameId : params.setNameId

    })
}

exports.submit = function (req,res) {
    var params = req.body;
    console.log(params);

    fileUploadCtrl.upload(req, res, function (url) {
        var photoObj = params.photo;
        photoObj.url=url;
        if (params.photo._id != undefined){
            //修改
        }else{
            //新增
           var _photo = new ClientPhotos({
               setNameId: photoObj.setNameId,
                parentId: photoObj.parentId,
               url : photoObj.url
            });
            _photo.save(function (err,photo) {
                if(err){
                    console.log(err);
                }
                //重定向到
                res.redirect("/adminEdit");
            })

        }
        console.log(url)
    })
};
exports.list = function (req,res) {
    var parentId = req.params.parentId;
    var setNameId = req.params.setNameId;
    console.log('阿飞');
    console.log(setNameId);
    console.log(parentId);
    ClientPhotos.findByParentIdSetNameId(parentId,setNameId,function (err,photos) {
        console.log(photos);
        res.render('photoSetList',{
            title : '图片集',
            photos : photos

        })
    })

}
var PhotoSetName = require('../models/photoSetName');
var fileUploadCtrl = require('../controllers/fileUploadCtrl')
exports.add = function (req, res) {
    var photoSetName = req.body.photoSetName;
    var parentId = req.body.parentId;
    console.log(photoSetName)
    fileUploadCtrl.base64Upload(req, res, function (url) {
        //新增
        var  _photoSetName = new PhotoSetName({
            photoSetName: photoSetName,
            parentId : parentId,
            url : url
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
    })



};

exports.list = function (req,res) {
    PhotoSetName.fetch(function (err,photoSetNames) {
        if (err) console.log(err);
        res.json({
            code : 200,
            data : photoSetNames
        })
    })
}







exports.detail = function (req,res) {
    
}




exports.localShow = function (req, res) {
    var parentId = req.params.id;
    Photo.findByParentIdChildId(parentId,1,function (err,photos) {
        console.log(photos);
        res.render('pages/destination',{
            title : '景区介绍页',
            parentId : parentId,
            bg : 1,
            photos : photos
        })
    })

};
exports.videoShow = function (req, res) {
  res.render('pages/video',{
    title : '视频花絮页',
    bg : 2
  })
};

exports.picShow = function (req, res) {
    var parentId = req.params.id;
    Photo.findByParentIdChildId(parentId,2,function (err,photos) {
        console.log(photos);
        res.render('pages/photograph',{
        title : '客户照片页',
        parentId : parentId,
        bg : 3,
        photos : photos
  })
})
};

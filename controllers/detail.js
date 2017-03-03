var Photo = require('../models/photo');
var photoSetName = require('../models/photoSetName')
exports.show = function (req, res) {
    var parentId = req.params.id;
    Photo.findByParentIdChildId(parentId,0,function (err,photos) {
        console.log(photos);
        res.render('pages/secondary',{
            title : '详情页',
            parentId : parentId,
            photos : photos
        })
    })

};

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
    photoSetName.findByParentId(parentId,function (err,photos) {
        console.log(photos);
        res.render('pages/photograph',{
        title : '客户照片页',
        parentId : parentId,
        bg : 3,
        photos : photos
  })
})
};

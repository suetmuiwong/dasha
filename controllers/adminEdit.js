var fileUploadCtrl = require('./fileUploadCtrl')
var Photo = require('../models/photo');
exports.index = function(req, res) {
    res.render('indexEdit', {
        title: '后台首页',
        photo : {
            url : "",
            chDesc : "",
            enDesc : "",
            parentId : "",
            childId : ""
        }
    });
};
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
            _photo = new Photo({
                url: photoObj.url,
                chDesc: photoObj.chDesc,
                enDesc: photoObj.enDesc,
                parentId: photoObj.parentId,
                childId: photoObj.childId
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
}
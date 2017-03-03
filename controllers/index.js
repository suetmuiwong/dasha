var Photo = require('../models/photo');
exports.show = function (req, res) {
    var parentId = req.params.id;
    //获取 轮播图
    Photo.findByParentIdChildId(0,0,function (err,banners) {
        console.log(banners);
        Photo.findByParentIdChildId(0,1,function (err,videos) {
            console.log(videos);
            Photo.findByParentIdChildId(0,2,function (err,styles) {
                console.log(styles);
                res.render('index',{
                    title : '首页',
                    banners : banners,
                    videos : videos,
                    styles : styles
                })
            })
        })
    })

};
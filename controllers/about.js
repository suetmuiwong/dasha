var About = require('../models/about');
var fileUploadCtrl = require('../controllers/fileUploadCtrl')
exports.submit = function (req, res) {
    fileUploadCtrl.multiFileUpload(req, res, function (urlArray) {
        console.log(req)
        var params = req.body;
        console.log(urlArray)

            //新增
            var _about = new About({

                topBannerUrl : urlArray[0],
                bottomBannerUrl : urlArray[1],
                showList1 : {
                    url : urlArray[2],
                    text : params.file3Text
                },
                showList2 : {
                    url : urlArray[3],
                    text : params.file4Text
                },
                showList3 : {
                    url : urlArray[4],
                    text : params.file5Text
                },
                showList4 : {
                    url : urlArray[5],
                    text : params.file6Text
                },
                imgText : {
                    url : urlArray[6],
                    text1 : params.imgText1,
                    text2 : params.imgText2
                },
            });
        _about.save(function (err,about) {
                if(err){
                    console.log(err);
                }
                //重定向到
                res.json({
                    msg : 'success'
                });
            })

    })


};


exports.show = function (req, res) {
    var parentId = req.params.id;
    //获取 轮播图
    About.fetch( function (err, about) {
        console.log(about)
        res.render('aboutShow', {
            title: '关于我们',
            about: about[0]
        })
    })
}


// exports.add = function(req, res) {
//   res.render('aboutEdit', { title: '增加关于我们' });
// };
//
// exports.show = function (req, res) {
//   res.render('aboutShow',{
//     title : '关于我们'
//   })
// };
//
// exports.update = function (req, res) {
//   res.render('aboutEdit',{
//     title : '修改关于我们'
//   })
// };



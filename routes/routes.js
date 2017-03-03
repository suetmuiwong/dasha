var DetailCtrl = require('../controllers/detail');
var AbsoutCtrl = require('../controllers/about');
var AdminEditCtrl = require('../controllers/adminEdit');
var multipart = require('connect-multiparty');
var index = require('../controllers/index');
var PhotoSetNameCtrl = require('../controllers/photoSetName');
var ClientPhotosCtrl = require('../controllers/clientPhotos')
module.exports = function (app) {
    app.get('/',index.show)
    app.get('/about',AbsoutCtrl.show);
    // app.get('/aboutEdit',AbsoutCtrl.update);
    app.get('/detail/:id',DetailCtrl.show);
    app.get('/localShow/:id',DetailCtrl.localShow);
    app.get('/video',DetailCtrl.videoShow);
    app.get('/photograph/:id',DetailCtrl.picShow);
    app.get('/adminEdit',AdminEditCtrl.index); //进入后台修改页 上传图片
    app.post('/adminEditSubmit',multipart(),AdminEditCtrl.submit); //提交后台表单
    app.get('/photographDetail/:id',DetailCtrl.detail);
    app.post('/addPhotoSet',multipart(),PhotoSetNameCtrl.add); //增加客户图片组
    app.get('/PhotoSetList',PhotoSetNameCtrl.list); //增加客户图片组
    app.get('/photoSetAddView/:parentId/:setNameId',ClientPhotosCtrl.addView); //进入增加图片集页面
    app.get('/photoSetList/:parentId/:setNameId',ClientPhotosCtrl.list) ;//进入图片集列表页面
    app.post('/photoSetAddSubmit',multipart(),ClientPhotosCtrl.submit); //提交后台表单
    app.post('/photoMulitAddSubmit',multipart(),AbsoutCtrl.submit); //提交后台表单
};
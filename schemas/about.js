var mongoose = require('mongoose');
var PhotoSchema = new mongoose.Schema({
    topBannerUrl : String,
    bottomBannerUrl : String,
    showList1 : {
        url : String,
        text : String
    },
    showList2 : {
        url : String,
        text : String
    },
    showList3 : {
        url : String,
        text : String
    },
    showList4 : {
        url : String,
        text : String
    },
    imgText : {
        url : String,
        text1 : String,
        text2 : String
    },
    meta : {
        CreateAt : {
            type : Date,
            default : Date.now()
        },
        UpdateAt : {
            type : Date,
            default : Date.now()
        }
    }
});

PhotoSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb);
    },
    findByParentId : function (parentId,cb) {
        return this
            .find({parentId:parentId})
            .exec(cb);
    },
    findByParentIdChildId : function (parentId,childId,cb) {
        return this
            .find({parentId:parentId,childId : childId})
            .exec(cb);
    }
};

module.exports = PhotoSchema;
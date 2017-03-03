var mongoose = require('mongoose');
var PhotoSetNameSchema = new mongoose.Schema({
    photoSetName : String,
    parentId : String,
    url : String,
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

PhotoSetNameSchema.statics = {
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

module.exports = PhotoSetNameSchema;
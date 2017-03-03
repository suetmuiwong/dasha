var mongoose = require('mongoose');
var ClientPhotosSchema = new mongoose.Schema({
    setNameId : String,
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

ClientPhotosSchema.statics = {
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
    findByParentIdSetNameId : function (parentId,setNameId,cb) {
        return this
            .find({parentId:parentId,setNameId : setNameId})
            .exec(cb);
    }
};

module.exports = ClientPhotosSchema;
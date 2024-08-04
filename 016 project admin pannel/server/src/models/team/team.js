const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    memberName:String,
    memberCat:String,
    thumbnail:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date
    }
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;
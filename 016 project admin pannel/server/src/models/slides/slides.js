const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    sliderHeading:String,
    sliderSubHeading:String,
    thumbnail:String,
    sliderDes:String,
    
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

const Slider = mongoose.model('slider', sliderSchema);

module.exports = Slider;
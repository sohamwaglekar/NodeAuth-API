const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userref',
        // required: true
    },
    userref: {
        type: String
    },
    Lawyerid: {
        type: String,
        required: true
    },
    Lawyername: {
        type: String,
        required: true
    },
     Lawyeremail: {
        type: String,
        required: true
    },
     LawyerAdress: {
        type: String,
        
    },
     Lawyermobile: {
        type: String,
        required: true
    },
     date: {
        type: String,
        required: true
    },
     time: {
        type: String,
        required: true
    },
     
       descripton: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Order', orderSchema);
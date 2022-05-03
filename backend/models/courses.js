const mongoose = require('mongoose')
const {Schema } = mongoose;

// schema of model @ applications

const courseSchema = new Schema({
  course_name: {
   type: String,
   require: true
  },
  course_depertment: {
   type: String,
   require: true
  },
  lecture: {
   type: String,
   require: true
  },
  students:[
   {
    studentId:{
      type: String,
      ref: 'Student'
    }
   }
  ]
}
,{ versionKey: false })

// export of model @ application

module.exports = mongoose.model('Course',courseSchema)
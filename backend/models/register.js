const mongoose = require('mongoose')

const userStudentSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'teacher']
  },
  // courses: {
  //     type: Array,
  // },
  // notes: {
  //     type: Array,
  // },
  // questions: {
  //     type: Array,
  // },
  // answers: {
  //     type: Array,
  // },
  // timetable: {
  //     type: Array,
  // },
})

module.exports = mongoose.model('userStudent', userStudentSchema)
require("dotenv").config();
const express = require('express');
const router = express.Router();
const Application = require('../models/applications')
const Student = require('../models/students')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile} = require('../s3-functions/s3')




  // add new endpoints here 👇
  // ***********************************************************************************************
  // @method GET
  // @route get/
  // @desc save purchase
  // _____________________________________________
  // *********************************************
  router.post('/admitStudent/:application_id', async (req, res) => {
      const application_id = req.params.application_id
      const ApplicationData = await Application.findById(application_id).lean()
      const {_id : studentApplication_id, ...rest}= ApplicationData

      const newStudent = new Student({...rest, studentApplication_id:studentApplication_id});
      newStudent.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })

  // @method POST
  // @route /admitStudent/:application_id
  // @desc admit Student
  // _____________________________________________
  // *********************************************
  router.get('/getStudent/:studentId', async (req, res) => {
   
    const id = req.params.studentId;
    Student.findOne({studentId: id})
    .populate(['studentApplication_id'])
    .then(data => {
        res.status(200).json(
          { 
            status: 200, 
            data: data, 
            message: "success" 
          });
      })
      .catch(err => {
        res.status(err).json(
          { 
            status: err,  
            message: "error" 
          });
      })
  })

  // @method POST
  // @route apply/
  // @desc sent application
  // _____________________________________________
  // *********************************************
   
  // to be added
  const cpUpload = upload.fields(
    [
      { name: 'user_photo', maxCount: 1 },
      { name: 'motivational_letter', maxCount: 1}
    ]
  )
  router.post('/apply', cpUpload, async (req, res) => {
      console.log('req.body',req.body)
      console.log('req.files',req.files)
      const awsURL = process.env.AWS_URL
      const uploadaUser_photo = await uploadFile(req.files['user_photo'][0])
      const uploadMotivational_letter = await uploadFile(req.files['motivational_letter'][0])
      const user_photo = `${awsURL}${req.files['user_photo'][0].originalname}`
      const motivational_letter = `${awsURL}${req.files['motivational_letter'][0].originalname}`
      const firstName = req.body.fname
      const lastName = req.body.lname
      const gender = req.body.gender
      const email = req.body.email
      const dob = req.body.dob
      const program = req.body.program
      const semester = req.body.semester
      const address = req.body.address
      const newApplication = new Application(
      {firstName, lastName, gender, email, dob, program,semester, address, user_photo,motivational_letter});
    
    newApplication.save().then((doc,err) => {
         if(err){
            return res.status(401).json(
            { 
              status:401, 
              message: "something went wrong. try again later!" 
            })
         }
         res.status(200).json(
            { 
              status:200, 
              message: "ok" 
        })
    })
  })


  // *******************************************************************************************************
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  router.get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for."
    });
  })


module.exports = router;
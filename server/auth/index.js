const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../db/connection.js');
const users = db.get('users');
users.createIndex('mobileNumber', {unique : true});

const router =  express.Router();


router.get('/', (req,res) => {
   res.json({
      message : 'LockKey'
   });  
});


router.post('/signup', (req, res,next) => {
   const result = req.body;
   if(result) {
      users.findOne({
         mobileNumber : req.body.mobileNumber
      }).then(number => {
         if(number) {
            const err = new Error('this number already exist');
            next(err);
         }else {
            bcrypt.hash(req.body.aadharCard.trim(), 12).then(hashedAadhar => {
                 const newUser = {
                  "firstname" : req.body.firstname,
                  "lastname" : req.body.lastname,
                  "mobileNumber" : req.body.mobileNumber,
                  "fullAddress" : req.body.fullAddress,
                  "aadharCard" : hashedAadhar
                 };
                
                 users.insert(newUser).then(insertedUser => {
                    res.json(insertedUser);
                 });
             });
         }
      });
   }else {
      next(result.error);
   }
});


module.exports = router;
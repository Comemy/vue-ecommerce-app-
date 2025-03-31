const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const { errorMessages } = require('vue/compiler-sfc')
const cloudinary = require('cloudinary').v2
const db = require('../db')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    }
    else {
      cb(new Error('not allow other files without image/png or image/jpg or image/jpeg'))
    }
  }
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
// upload image จากเครื่องขึ้น cloud พร้อมลบ file 
const uploadImg = [
  upload.single('image'),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_profiles'
      })
      console.log(result)

      const userId = req.body.userId
      const userName = req.body.userName

      // เก็บ URL กับ public id ของ cloudinary ลง database
      await db.query('UPDATE users SET public_id = ? , userImgUrl = ? , name = ? WHERE id = ?',
        [result.public_id,
        result.secure_url,
          userName,
          userId
        ]
      )

      // ลบไฟล์ local ออก
      fs.unlinkSync(req.file.path)
      res.json({ message: 'Upload success', imageUrl: result.secure_url })
    }
    catch (error) {
      console.error('Error upload file to cloud')
    }
  }
]


module.exports = uploadImg
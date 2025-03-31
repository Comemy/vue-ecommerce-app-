const express = require('express')
const router = express.Router()
const uploadImg = require('../middleware/UploadPic')

router.post('/', uploadImg)

module.exports = router
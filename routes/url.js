const express = require("express")
const {handlegenerateShortUrl} = require("../controllers/url")
const router = express.Router()

router.post("/", handlegenerateShortUrl)

module.exports=router

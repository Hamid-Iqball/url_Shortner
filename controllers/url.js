const shortid = require("shortid")
const URL = require("../models/url")

async function handlegenerateShortUrl(req,res){
  const body = req.body
  if(!body.url){
        return res.status(400).json({error:"URL is required"})
  }
 
    const shortID = shortid.generate()


    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })

    return res.render("home", {
        id:shortID
    })
    
}

module.exports={
    handlegenerateShortUrl
}
const express = require("express")
const connectToMongoDb = require("./connect")
const urlRoute = require("./routes/url")
const path = require("path")
const cookieParser = require("cookie-parser")
const URL = require("./models/url")
const staticRouter = require("./routes/StaticRouter")
const userRoute = require("./routes/user")
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")
const app = express()
const PORT = 8001

connectToMongoDb("mongodb://127.0.0.1:27017/shortUrl").then(()=>console.log("mongoDB Connected")).catch(()=>console.log("There is an error connecting mongodb"))

    app.set('view engine', "ejs")
    app.set('views', path.resolve("./view"))


    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cookieParser())

    app.use("/url",restrictToLoggedinUserOnly, urlRoute)
    app.use("/user", userRoute)
    app.use("/", staticRouter)
    



    app.get("/test",async(req,res)=>{
        const allUrls = await URL.find({})
        return res.render("/", {
            urls:allUrls
        })
    })

    app.get("/:shortId", async(req,res)=>{
    const shortId = req.params.shortId
   
    try {
        const entry = await URL.findOneAndUpdate({
            shortId
        },{$push:{
            visitHistory:{
                timestamp:Date.now().toString()
            }
        }}, { new: true })

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

       
        return res.redirect(entry.redirectURL)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
})
app.listen(PORT,()=>console.log(`Server Started at ${PORT} Successfully`))
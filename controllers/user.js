const User = require("../models/users")
const {v4:uuidv4} = require("uuid")
const {setUser , getUser} = require("../service/auth")
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("signup", {
                error: "Email is already registered. Try logging in instead."
            });
        }

        await User.create({
            name,
            email,
            password
        });

        return res.redirect("/login");
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).send("Internal Server Error");
    }
}



async function handleUserLogin(req,res){
    const { email, password}= req.body
 
    const user = await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            error:"Invalid Username or password"
        })
    }

    
    const token = setUser(user)
    res.cookie("uid", token)
    return res.redirect("/")

}





module.exports = {handleUserSignUp, handleUserLogin}
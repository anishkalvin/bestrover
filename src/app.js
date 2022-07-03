const express = require("express")
const app =express()
const port = process.env.PORT || 8000
const path = require("path")
const hbs = require("hbs")
const nodemailer= require("nodemailer")
const bodyParser = require("body-parser")

const encoder =bodyParser.urlencoded()
const transpoter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"anishkalvin17@gmail.com",
        pass:"ctsaiibnfpdhqfzu"
    }
})


app.set('view engine', 'hbs');
app.set('views','./public/templates/views')

var partialPath =path.join(__dirname,"../public/templates/partials")
hbs.registerPartials(partialPath)

var staticPath =path.join(__dirname, "../public/templates/views")
app.use(express.static(staticPath))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/rajasthan",(req,res)=>{
    res.render("rajasthan")
})

app.get("/kedar",(req,res)=>{
    res.render("kedar")
})

app.get("/pending",(req,res)=>{
    res.render("pending")
})

app.get("/gallery",(req,res)=>{
    res.render("gallery")
})
app.get("/faq",(req,res)=>{
    res.render("faq")
})

app.post("/contact",encoder, (request, respond) => {
    let mailOption ={
        from:"anishkalvin17@gmail.com",
        to:request.body.email,
        subject:"kalvin Rover",
        text:"your query recived .thanks to share your query with us !!! our team will be contact you ,I will be greatful to you for giving your time."
    }
    transpoter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    mailOption ={
        from:"anishkalvin17@gmail.com",
        to:"anishkalvin17@gmail.com",
        subject:"one query received",
        text:
        `
        Name :${request.body.name}
        Phone :${request.body.phone}
        Email :${request.body.email}
        subject :${request.body.subject}
        message :${request.body.message}
        `
    }
    transpoter.sendMail(mailOption,(error,data)=>{
        if(error)
        console.log(error)
    })
    respond.render("contact",{show:true,msg:"thanks to share your query with us"})
})
app.get("**", (request, respond) => {
    respond.render("error")
})
app.listen(port,()=>{
    console.log("server is running 8000...")
})
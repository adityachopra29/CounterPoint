const express = require("express")
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express()
app.set('view engine', 'ejs');
const PORT = 3000

app.use(bodyParser.urlencoded({extended:true}));   
app.use(express.static("public"))
// app.use(express.static("views"))


app.get("/", async(req, res) => {
    res.render("index")
})

app.post("/", async (req, res) => {

    var motion = req.body.Motion;
    console.log(motion)
    
    // this is the api call to youchatgpt 
    // this prints the output on console

    const forMotion = "Give me reasons to support the motion " + motion
    const againstMotion = "Give me reasons to oppose the motion " + motion 
    
    const forData = {
      "question": forMotion,
      "max_response_time": 30
    }
    
    const againstData = {
      "question": againstMotion,
      "max_response_time": 30
    }

    const KEY = '0672ee8eb3mshcf891ffd6ee0a62p185381jsnb9ab7d93b0dc'
    
  //Filling FOR the motion
  const forOptions = {
    method: 'POST',
    url: 'https://you-chat-gpt.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
    },
    data: JSON.stringify(forData)
  };

  const forMotionReq=async ()=>{
    try{
      const res= await axios.request(forOptions)
      // console.log(res.data.answer)
      return res.data.answer

    }
    catch(error){
      console.log(error)
    }
  }
 
  const forTempData=await forMotionReq()

  //Filling AGAINST the motion
  const againstOptions = {
    method: 'POST',
    url: 'https://you-chat-gpt.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
    },
    data: JSON.stringify(againstData)
  };

  const againstMotionReq=async ()=>{
    try{
      const res= await axios.request(againstOptions)
      // console.log(res.data.answer)
      return res.data.answer

    }
    catch(error){
      console.log(error)
    }
  }
 
  const againstTempData=await againstMotionReq()

  res.render("answer", {For_motion : forTempData, Against_motion : againstTempData, Motion : motion})
})

app.listen(PORT, () => {
    console.log(`logged in at port ${PORT}`)
})
const mongoose = require('mongoose');
var express = require('express');

const app = express();
const config = require('./config/database')
const cors = require('cors');
app.use(cors());
const port = 4000
app.use(express.json())

const http = require('http')
const server = http.createServer(app);

app.use("/images", express.static("uploads"));
//app.use(express.static('uploads'))

const customer = require("./routes/customer.js")
const product = require("./routes/products");
const admin = require("./routes/admin")
const imageJs =require("./routes/fileupload")
//connect with mongoose
const connection = mongoose.connect(config.database);
if(connection){
    console.log("database connected")
}else{
    console.log("database is not connected")
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test',(req, res) => {
    testFun()
    res.send("ok")
});

app.use("/image",imageJs)
app.use("/products",product)
app.use("/cus",customer)
app.use("/admin",admin)

// web socket
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"]
    }
  }
);
const userArr = ["first"]
io.on('connection', (socket) => {
    console.log('a user connected');
    userArr["first"]=socket.id
    testFun()
    console.log(socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('admin message', (msg) => {
        console.log('message: ' + msg);
        io.emit('admin message', msg);
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });


});

const testFun = ()=>{
    io.to(userArr["first"]).emit("connected", {
        msg:"you are connected",
        id:userArr["first"]
    })
}

server.listen(port,() => {
    console.log('Example app listening on port ${port}')
})

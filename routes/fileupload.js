const express = require('express');
const router = express.Router()
const multer = require('multer');
const cors = require('cors')

const path = require('path');


router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'static')))


var storage = multer.diskStorage({
    destination: function (req, file , cb){
        cb(null, "./uploads");
    },

      filename: function (req, file, cb)
       {
          cb(null, Date.now() + path.extname(file.originalname));
       },
    });

var upload = multer({ storage: storage}).single('file');

router.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            
            console.log(err);
        }
        console.log(req.file)
        if((req.file.mimetype=='image/png'||req.file.mimetype=='image/jpeg') ){
            res.json({
                message:"Worked",
                imageName:req.file.filename

            })
            res.end()
        }else{
            res.json({
                message:"not worked"
            })
        }
        
        //console.log(res)
        
    })
})

module.exports = router


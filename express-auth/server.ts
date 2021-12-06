import express from "express"
const app = express();
const apiRouter = require('./routes/index.ts')
const database = require('./db/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use('/api', apiRouter);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
//  }));
 

database.connect((err)=>{
    if(!err){
        console.log("Database Connected...");
    }
    else{

        console.log(err)
    }
    
});


app.listen(process.env.PORT || '3000',()=>{
    console.log(`Server has started on port: ${process.env.PORT || '3000'} .... `)
})
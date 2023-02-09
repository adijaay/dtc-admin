
const express = require('express')
const app = express()
const {croute} = require('./fetch/Croute')
// const mysql = require('mysql')
const cors = require('cors')
// const bodyParser = require('body-parser')
// const {db} = require('./config/db');
// const SequelizeStore = require('connect-session-sequelize');
// const multer = require('multer');
var session = require('express-session');
const { aroute } = require('./auth/Aroute');
const { groute } = require('./fetch/Groute');

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://192.168.6.235:3000', 'http://192.168.6.235:3002']
}));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000, extended: true})); 

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });

// const upload = multer({storage:multer.memoryStorage()});

// const sessionStore = SequelizeStore(session.Store);


// const store = new sessionStore({
//     db: db
// });

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use('/uploads', express.static(process.cwd() + '/uploads'));
app.use('/resize', express.static(process.cwd() + '/resize'));
app.use(croute);
app.use(aroute);
app.use(groute);


app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });

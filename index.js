require('dotenv').config();

const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const authRouter = require('./routers/authrouter'); // import the auth router

const app = express();

app.use(cors());             // cors is used to allow cross-origin requests
app.use(helmet());          // helmet is used to secure the app by setting various HTTP headers
app.use(cookieParser());    // cookie-parser is used to parse cookies from the request
app.use(express.json()); // express.json() is used to parse JSON bodies from incoming requests
app.use(express.urlencoded({ extended: true })); // express.urlencoded() is used to parse URL-encoded bodies from incoming requests

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.use('/api/auth', authRouter); // this is used to use the auth router for all the requests that start with /api/auth 

app.get('/',(req,res) => {
    res.json({message: 'Hello World!'});
})

app.listen(8000, () => {
	console.log('listening...');
});
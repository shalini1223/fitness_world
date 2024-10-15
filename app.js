import express from 'express';
import 'dotenv/config';

import {logger} from './src/core/util/logger/logger.js';
import { initializeSecrets } from './src/core/util/aws/secretmanager';
import connectDB from './src/core/db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

await initializeSecrets();

//wraps express app in middlewqare to setup cors


app.get('/check', function(req, res) {
    res.writeHead(200,{
        'Content-Type': 'text/html'
    });
    res.write('sucess');
    res.end();
});

app.use('/public', express.static('public'));

app.listen(PORT, () =>{
    
});
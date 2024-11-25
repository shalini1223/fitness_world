import express from 'express';
/**
 * Cross-origin resource sharing cors is a security feature that
 * restricts cross-origin HTTP request that are inititaed from 
 * scripts running in browser
 */
import cors from 'cors';
/**
 * Morgan is Http request loger middelware for nodejs
 * it simplifies the process of logging requests to our application
 */
import morgan from 'morgan';
/**
 * Express rate limit is simple yet effective rate limiter for 
 * express based nodejs applications it is designed to help
 * protect your application from brute-force attacks and 
 * other maliciuos behaviour
 */

import { rateLimit} from 'express-rate-limit';
/**
 * Helmet helps you to secure your express apps by setting various Http headers
 */
import helmet from 'helmet';
/**
 * Dotenv is zero dependency module that loads environment variables
 */

/**
 * Compression is Nodejs module taht provides middleware for compressing responses in your express applications
 */
import compression from 'compression';

/**
 * i18next is an internalization-framework written in javascript
 */
import i18next from 'i18next';
import i18nMiddleware from 'i18next-http-middleware';

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import {globalExceptionhandler} from '../exceptions/global.exception.handler.js';
import {routes} from '../../routes/routes.js';
import {NotFoundException} from '../exceptions/commom.exception.js';

/**
 * wraps express application in middelware to sert up cors
 */

export const middelware = (app)=>{
    /** compress response in applications */
    app.use(compression());
    /**
     * Parse incoming request bodies in middelware before your handlers
     * avaialble under req.body property
     */
    app.use(express.json());
    /**
     * Parse incoming resource sharing (CORD) is security feature that 
     * restricts cross-origin HTTP request that are initiated from
     * scripts running in browser
     */

    app.use(
        cors({
            origin:"*"
        })
    );
    /**
     * Morgan is http request logger middelware for nodejs
     * it simplifies process of logging requests to your application
     */
    app.use(morgan('dev'));
    /**
     * Only allows 100 request per minutes fro single IP address
     * This simple ,yet effective rate limiter for express based
     * nodejs application it is designed to help protect your appl from brute attack
     */

    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-7',
        legacyHeaders:false
    });
    app.use(helmet());
    /**
     * i18nect is internalization-framework written in js
     */

app.use('/api/v1', routes);

/**
 * handle 404 error
 */
    app.use((req,res,next) =>{
        throw new NotFoundException();
    });
    /**
     * Global exception handler
     */
    app.use(globalExceptionhandler);
}
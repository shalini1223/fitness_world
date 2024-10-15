/**
 * pino is logger for nodejs applications.
 * It is designed to be very low overhead way to go log message and
 *  it is optimized for running in production environment
 */

import pino from 'pino';

const logger = pino({
    transport:{
        target:'pino-pretty'
    }
});

export { logger };

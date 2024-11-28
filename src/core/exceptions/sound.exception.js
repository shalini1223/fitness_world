/**
 * class represent an exception for audion file upload
 * @extends Error
 */

export class AudioUploadException extends Error {
    /**
     * create audio file upload extension
     * @param {string} message - The exception msg
     */
    constructor(message){
        super(message);
        this.name = 'AudioUploadexception'; // set name of exception
        this.message = message || 'Audio file not found,try again';
    }
}

/**
 * class representing an exception for when an audio title already exists
 * @extends Error
 */
export class AudioTitleExistsException extends Error {
    /**
     * create audio titleexception
     * @param {string} message - exception msg
     */
    constructor(message){
        super(message);
        this.name = 'AudioTitleExistsexception'; // set name of exception
        this.message = message || 'Audio title already exists';
    }
}

/**
 * class representing an exception for when audio not found
 * @extends Error
 */
export class AudioNotFoundException extends Error {
    /**
     * create audio titleexception
     * @param {string} message - exception msg
     */
    constructor(message){
        super(message);
        this.name = 'AudioNotFoundException'; // set name of exception
        this.message = message || 'Audio Not found';
    }
}

export class AudiuoShortAudioUrlExistsException extends Error{
    constructor(message){
        super(message);
        this.name = 'AudioShortAudioUrlException'; // set name of exception
        this.message = message || 'Short audio is greater than 3 min';
    }
}
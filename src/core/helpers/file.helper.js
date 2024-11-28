import multer from 'multer';
import MP3Duration from 'get-mp3-duration';

export const upload = multer({
    dest:'uploads/',
    limits:{fileSize:1024 * 1024 * 100},
        storage:multer.memoryStorage()
});
export const getMP3Duration = (buffer) => {
    const duration = MP3Duration(buffer);
    return Math.floor(duration/1000);
};
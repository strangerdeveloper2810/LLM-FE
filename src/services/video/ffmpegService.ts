import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
        await ffmpeg.load();
    }
};

const writeFileToFFmpeg = async (fileName: string, fileUrl: string) => {
    const fileData = await fetchFile(fileUrl);
    ffmpeg.writeFile(fileName, fileData);
};

const readFileFromFFmpeg = async (fileName: string): Promise<Blob> => {
    const data = await ffmpeg.readFile(fileName); // Đảm bảo sử dụng await
    return new Blob([data], { type: 'video/mp4' }); // Trả về Blob
};

export {
    ffmpeg,
    loadFFmpeg,
    writeFileToFFmpeg,
    readFileFromFFmpeg
}
import { ffmpeg, loadFFmpeg, writeFileToFFmpeg, readFileFromFFmpeg } from './ffmpegService';
import { createSlideImage } from './slideService';

/**
 * Tạo video từ slides và narration
 * @param slides Mảng văn bản của các slides
 * @param narration URL của file âm thanh
 * @param audioDuration Thời lượng của file âm thanh (giây)
 * @returns URL của video đã tạo
 */
export const generateVideoWithWasm = async (
    slides: string[],
    narration: string,
    audioDuration: number // Thời lượng âm thanh
): Promise<string> => {
    await loadFFmpeg();

    // Tạo slides và ghi vào FFmpeg
    for (let i = 0; i < slides.length; i++) {
        const slideImage = await createSlideImage(slides[i]);
        await writeFileToFFmpeg(`slide${i}.png`, slideImage);
    }

    // Ghi file narration vào FFmpeg
    await writeFileToFFmpeg('narration.mp3', narration);

    // Tính toán thời lượng hiển thị mỗi slide
    const slideDuration = audioDuration / slides.length;

    // Tạo file danh sách slides với thời lượng
    const slideListContent = slides
        .map(
            (_, i) => `file 'slide${i}.png'\nduration ${slideDuration.toFixed(2)}`
        )
        .join('\n');
    ffmpeg.writeFile('slides.txt', new TextEncoder().encode(slideListContent));

    // Tạo video từ slides và narration
    await ffmpeg.exec([
        '-f', 'concat', '-safe', '0', '-i', 'slides.txt', // Input slides
        '-i', 'narration.mp3', // Input âm thanh
        '-pix_fmt', 'yuv420p', '-c:v', 'libx264', // Định dạng video
        '-shortest', // Đảm bảo video khớp độ dài âm thanh
        'output.mp4',
    ]);

    // Đọc video từ FFmpeg
    const videoBlob = await readFileFromFFmpeg('output.mp4');

    // Tạo URL từ Blob
    return URL.createObjectURL(videoBlob);
};

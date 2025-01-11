import { OpenAI } from "openai"

const client = new OpenAI({
    apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

/**
 * Hàm gọi API GPT để tạo văn bản
 * @param prompt Nội dung prompt do người dùng nhập
 * @returns Văn bản được tạo bởi GPT
 */

const generateText = async (prompt: string): Promise<string> => {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // Model GPT bạn muốn sử dụng
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: 700, // Giới hạn số token (để kiểm soát chi phí)
            temperature: 0.7, // Độ sáng tạo

        });

        return response.choices[0].message.content || "No text generated.";
    } catch (error: unknown) {
        console.error("Error generating text:", error);
        throw new Error("Failed to generate text.");
    }
};

/**
 * Hàm gọi API DALL·E để tạo hình ảnh từ văn bản
 * @param prompt Văn bản mô tả hình ảnh
 * @returns URL của hình ảnh được tạo
 */
const generateImage = async (prompt: string): Promise<unknown> => {
    try {
        const response = await client.images.generate({
            prompt, // Nội dung mô tả hình ảnh
            n: 3, // Số lượng hình ảnh cần tạo
            size: "1024x1024", // Kích thước hình ảnh
        });

        return response.data[0].url; // Trả về URL của hình ảnh đầu tiên
    } catch (error: unknown) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image.");
    }
};

/**
 * Hàm tạo audio từ văn bản
 * @param text Nội dung văn bản cần chuyển thành giọng nói
 * @returns URL của file audio (hoặc buffer nếu cần tải về)
 */
const generateAudio = async (text: string, voiceOptions: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"): Promise<string> => {
    try {
        const mp3 = await client.audio.speech.create({
            model: "tts-1", // Model TTS
            voice: voiceOptions, // Giọng đọc (có thể thay đổi theo nhu cầu)
            input: text, // Nội dung văn bản
        });

        // Lấy dữ liệu âm thanh dưới dạng ArrayBuffer
        const arrayBuffer = await mp3.arrayBuffer();

        // Tạo Blob từ ArrayBuffer
        const audioBlob = new Blob([arrayBuffer], { type: "audio/mp3" });

        // Tạo URL từ Blob
        const audioUrl = URL.createObjectURL(audioBlob);

        return audioUrl; // Trả về URL âm thanh
    } catch (error: unknown) {
        console.error("Error generating audio:", error);
        throw new Error("Failed to generate audio.");
    }
};


/**
 * Tạo giọng đọc từ văn bản
 * @param text Nội dung văn bản
 * @param voice Giọng đọc được chọn
 * @returns URL file âm thanh
 */
const generateNarration = async (
    text: string,
    voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"
): Promise<string> => {
    const audio = await client.audio.speech.create({
        model: "tts-1",
        voice,
        input: text,
    });

    const arrayBuffer = await audio.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
    return URL.createObjectURL(blob);
};

export { generateText, generateImage, generateAudio, generateNarration };


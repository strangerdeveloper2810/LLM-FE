/**
 * Tạo slide hình ảnh từ đoạn văn bản
 * @param text Nội dung văn bản
 * @returns URL hình ảnh của slide
 */
const createSlideImage = async (text: string): Promise<string> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1280; // Chiều rộng canvas
    canvas.height = 720; // Chiều cao canvas

    if (ctx) {
        // Nền trắng
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cài đặt font chữ
        ctx.fillStyle = '#000000';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top'; // Căn chỉnh từ trên xuống

        // Tự động chia text thành nhiều dòng
        const maxLineWidth = canvas.width * 0.8; // Chiều rộng tối đa của dòng (80% chiều rộng canvas)
        const lines = wrapText(ctx, text, maxLineWidth);

        // Tính toán để căn giữa văn bản theo chiều dọc
        const lineHeight = 40; // Khoảng cách giữa các dòng
        const totalTextHeight = lines.length * lineHeight;
        const startY = (canvas.height - totalTextHeight) / 2; // Bắt đầu vẽ từ giữa

        // Vẽ từng dòng lên canvas
        lines.forEach((line, i) => {
            ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
        });
    }

    return canvas.toDataURL('image/png'); // Trả về URL của hình ảnh
};

/**
 * Chia text thành nhiều dòng dựa trên chiều rộng canvas
 * @param ctx Context của canvas
 * @param text Văn bản đầu vào
 * @param maxLineWidth Chiều rộng tối đa của dòng
 * @returns Mảng các dòng text
 */
const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxLineWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;

        if (width < maxLineWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }

    lines.push(currentLine);
    return lines;
};

export { createSlideImage };

import { chunk, map, join } from 'lodash';

/**
 * Chia văn bản thành các đoạn nhỏ (slide content)
 * @param text Văn bản đầu vào
 * @param maxLength Độ dài tối đa của mỗi đoạn
 * @returns Mảng các đoạn văn bản
 */
const splitTextIntoChunks = (text: string, maxLength: number = 100): string[] => {
    const words = text.split(' '); // Tách văn bản thành mảng từ
    const chunks = chunk(words, Math.ceil(maxLength / 5)); // Ước lượng 1 từ ~ 5 ký tự
    return map(chunks, (chunk) => join(chunk, ' ')); // Ghép lại thành từng đoạn
};
export { splitTextIntoChunks }
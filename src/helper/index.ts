const getAudioDuration = async (audioUrl: string): Promise<number> => {
    const audio = new Audio(audioUrl);
    return new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
    });
};

export { getAudioDuration }
import { FC, JSX, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { splitTextIntoChunks, generateVideoWithWasm } from '../services/video';

interface VideoGeneratorProps {
  text: string;
  narration: string;
  audioDuration: number; // Thời lượng audio
}

const VideoGenerator: FC<VideoGeneratorProps> = ({
  text,
  narration,
  audioDuration,
}): JSX.Element => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateVideo = async () => {
    setLoading(true);
    setVideoUrl(null);

    try {
      const slides = splitTextIntoChunks(text);
      const video = await generateVideoWithWasm(
        slides,
        narration,
        audioDuration,
      );
      setVideoUrl(video);
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateVideo}
        disabled={loading}
      >
        {loading ? 'Generating Video...' : 'Generate Video'}
      </Button>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {videoUrl && (
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1">Generated Video:</Typography>
          <video
            controls
            src={videoUrl}
            style={{ width: '100%', maxWidth: '500px' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default VideoGenerator;

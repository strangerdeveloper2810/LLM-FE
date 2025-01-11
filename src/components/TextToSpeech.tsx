import { FC, JSX, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { generateAudio } from '../services/openaiService';

// Định nghĩa kiểu giọng đọc hợp lệ
type VoiceType = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

interface TextToSpeechProps {
  text: string; // Văn bản đầu vào
  onAudioGenerated: (url: string) => void; // Callback để truyền URL audio
}

const TextToSpeech: FC<TextToSpeechProps> = ({
  text,
  onAudioGenerated,
}): JSX.Element => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState<VoiceType>('alloy'); // Default voice is "alloy"

  const handleGenerateAudio = async () => {
    setLoading(true);
    setAudioUrl(null); // Reset âm thanh trước đó
    try {
      const url = await generateAudio(text, voice); // Gọi API tạo audio với giọng đọc
      setAudioUrl(url); // Lưu URL của file audio
      onAudioGenerated(url); // Gọi callback với URL audio
    } catch (error) {
      console.error(error);
      alert('Failed to generate audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      {/* Dropdown Chọn Giọng Đọc */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="voice-select-label">Select Voice</InputLabel>
        <Select
          labelId="voice-select-label"
          value={voice}
          onChange={(e) => setVoice(e.target.value as VoiceType)} // Ép kiểu
          label="Select Voice"
        >
          {/* Các giọng đọc do OpenAI cung cấp */}
          <MenuItem value="alloy">Alloy</MenuItem>
          <MenuItem value="echo">Echo</MenuItem>
          <MenuItem value="fable">Fable</MenuItem>
          <MenuItem value="onyx">Onyx</MenuItem>
          <MenuItem value="nova">Nova</MenuItem>
          <MenuItem value="shimmer">Shimmer</MenuItem>
        </Select>
      </FormControl>

      {/* Nút Generate Audio */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateAudio}
        disabled={loading}
      >
        {loading ? 'Generating Audio...' : 'Generate Audio'}
      </Button>

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Hiển thị URL Âm Thanh */}
      {audioUrl && (
        <Box mt={4} textAlign="center">
          <Typography variant="subtitle1" gutterBottom>
            Generated Audio:
          </Typography>
          <audio
            controls
            src={audioUrl}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            Your browser does not support the audio element.
          </audio>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.open(audioUrl, '_blank')}
            >
              Download Audio
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TextToSpeech;

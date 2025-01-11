import { FC, JSX, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  InputForm,
  ImageGenerator,
  TextToSpeech,
  VideoGenerator,
} from './components';
import { generateText } from './services/openaiService';
import { getAudioDuration } from './helper'; // Hàm tính thời lượng audio
import ReactMarkdown from 'react-markdown';

const AppComponent: FC = (): JSX.Element => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // Lưu URL audio
  const [audioDuration, setAudioDuration] = useState<number | null>(null); // Lưu thời lượng audio
  const [loading, setLoading] = useState(false);
  const [generateImage, setGenerateImage] = useState(false);
  const [generateAudio, setGenerateAudio] = useState(false);
  const [generateVideo, setGenerateVideo] = useState(false);

  // Hàm gọi OpenAI API để tạo text
  const handleGenerate = async (input: string) => {
    setText(input);
    setLoading(true);
    setGenerateImage(false);
    setGenerateAudio(false);
    setGenerateVideo(false);
    try {
      const generatedText = await generateText(input);
      setResult(generatedText);
    } catch (error) {
      console.error(error);
      setResult('Failed to generate text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý sau khi audio được tạo
  const handleAudioGenerated = async (url: string) => {
    setAudioUrl(url); // Lưu URL của audio
    const duration = await getAudioDuration(url); // Tính thời lượng audio
    setAudioDuration(duration); // Lưu thời lượng audio
  };

  const handleGenerateImage = () => {
    if (!text.trim()) {
      alert('Please enter text to generate an image.');
      return;
    }
    setGenerateImage(true);
  };

  const handleGenerateAudio = () => {
    if (!result.trim()) {
      alert('No generated text available for audio conversion.');
      return;
    }
    setGenerateAudio(true);
  };

  const handleGenerateVideo = () => {
    if (!result.trim() || !audioUrl || !audioDuration) {
      alert('No generated text or audio available for video creation.');
      return;
    }
    setGenerateVideo(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom color="primary">
          Multimodal Project
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your text below to generate content (video script, audio, or
          images).
        </Typography>
      </Box>

      {/* InputForm để nhập nội dung */}
      <InputForm onGenerate={handleGenerate} />

      {/* Hiển thị trạng thái đang xử lý */}
      {loading && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }} color="text.secondary">
            Generating content, please wait...
          </Typography>
        </Box>
      )}

      {/* Hiển thị kết quả văn bản đã tạo */}
      {!loading && result && (
        <Box
          mt={4}
          p={3}
          bgcolor="#f9f9f9"
          borderRadius={2}
          boxShadow={2}
          sx={{
            maxHeight: '400px', // Giới hạn chiều cao tối đa
            overflowY: 'auto', // Thêm thanh cuộn dọc
          }}
        >
          <Typography variant="h5" gutterBottom color="secondary">
            Generated Text:
          </Typography>
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <Typography
                  variant="subtitle1"
                  color="primary"
                  gutterBottom
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <Typography variant="body1" color="text.primary" {...props} />
              ),
              li: ({ ...props }) => (
                <Typography
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  {...props}
                  sx={{ ml: 2 }}
                />
              ),
            }}
          >
            {result}
          </ReactMarkdown>
        </Box>
      )}

      {/* Nút Generate */}
      {!loading && text && (
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateImage}
            sx={{ mr: 2 }}
          >
            Generate Image
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateAudio}
            sx={{ mr: 2 }}
          >
            Generate Audio
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleGenerateVideo}
            disabled={!audioUrl || !audioDuration}
          >
            Generate Video
          </Button>
        </Box>
      )}

      {/* Hiển thị ImageGenerator */}
      {generateImage && <ImageGenerator prompt={text} />}

      {/* Hiển thị TextToSpeech */}
      {generateAudio && (
        <TextToSpeech text={result} onAudioGenerated={handleAudioGenerated} />
      )}

      {/* Hiển thị VideoGenerator */}
      {generateVideo && audioUrl && audioDuration && (
        <VideoGenerator
          text={result}
          narration={audioUrl}
          audioDuration={audioDuration}
        />
      )}
    </Container>
  );
};

export default AppComponent;

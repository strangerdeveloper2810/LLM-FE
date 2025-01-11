import { FC, JSX, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

interface InputFormProps {
  onGenerate: (text: string) => void;
}

const InputForm: FC<InputFormProps> = ({ onGenerate }): JSX.Element => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim()) {
      onGenerate(inputText);
      setInputText('');
    }
  };

  return (
    <Box mt={2} component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Enter your text"
            placeholder="Describe the content you want to generate..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12 }} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            sx={{ px: 4 }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;

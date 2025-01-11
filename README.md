# Multimodal Mini Project

## **Overview**

This project is a multimodal application that generates educational content from a block of text. It leverages OpenAI's APIs for text generation, image creation, and text-to-speech functionality. Additionally, it uses `ffmpeg.wasm` to create videos combining slides and audio narration.

### **Features**

1. **Text Generation**:

   - Input a block of text to generate summarized or educational content using OpenAI's GPT models.

2. **Image Generation**:

   - Create visual representations (e.g., slides or diagrams) from the generated text using OpenAI's DALL-E.

3. **Text-to-Speech Narration**:

   - Convert the generated text into spoken audio using OpenAI's text-to-speech capabilities.

4. **Video Generation**:
   - Combine the generated slides and narration into a video using `ffmpeg.wasm`.

### **Tech Stack**

- **Frontend**: React with TypeScript
- **Styling**: Material-UI (MUI)
- **APIs**: OpenAI (GPT, DALL-E, Text-to-Speech)
- **Video Processing**: `ffmpeg.wasm`

---

## **Setup Instructions**

### **1. Prerequisites**

Ensure you have the following installed:

- Node.js (v18+)
- pnpm (v8+)

### **2. Clone the Repository**

```bash
git clone <repository_url>
cd LLM-FE
```

### **3. Install Dependencies**

```bash
pnpm install
```

### **4. Set Up Environment Variables**

Create a `.env` file in the root directory with the following variables:

```env
PUBLIC_OPENAI_API_KEY=<your_openai_api_key>
```

### **5. Run the Application**

```bash
pnpm dev
```

The application will be accessible at `http://localhost:3000`.

---

## **Folder Structure**

```
LLM-FE/
├── src/
│   ├── components/       # UI components
│   │   ├── ImageGenerator.tsx
│   │   ├── InputForm.tsx
│   │   ├── TextToSpeech.tsx
│   │   ├── VideoGenerator.tsx
│   ├── helpers/          # Utility functions
│   │   └── index.ts
│   ├── services/         # Logic and API integrations
│   │   ├── video/
│   │   │   ├── ffmpegService.ts
│   │   │   ├── slideService.ts
│   │   │   ├── textProcessing.ts
│   │   │   ├── videoGenerator.ts
│   │   ├── openaiService.ts
│   ├── themes/           # MUI theme configuration
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Entry point
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── rsbuild.config.ts     # RSPack configuration
```

---

## **How It Works**

### **Text Generation**

- The user inputs text into the form.
- OpenAI's GPT API generates a simplified or summarized version of the input.

### **Image Generation**

- The generated text is used to create slides or visual diagrams via OpenAI's DALL-E API.

### **Audio Generation**

- The generated text is converted into audio narration using OpenAI's text-to-speech API.
- Users can select from multiple voice options (e.g., Alloy, Echo, Nova).

### **Video Generation**

- Slides and narration are combined into a cohesive video using `ffmpeg.wasm`.
- Each slide's duration is calculated based on the total audio length.

---

## **Key Features in Code**

### **1. OpenAI API Integration**

File: `src/services/openaiService.ts`

- Handles text, image, and text-to-speech API calls.

### **2. Video Creation**

File: `src/services/video/videoGenerator.ts`

- Combines slides and narration into a video using `ffmpeg.wasm`.

### **3. Modular Components**

Folder: `src/components`

- Each feature (Text, Image, Audio, Video) is encapsulated in a reusable component.

---

## **Future Improvements**

- Add a progress bar for video generation.
- Enhance slide visuals with dynamic styles.
- Implement authentication for API usage tracking.

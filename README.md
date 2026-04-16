# Therapy Session Processing App

A Next.js application for processing therapy session audio recordings. Upload audio files to automatically transcribe, summarize, and vectorize therapy sessions for analysis and record-keeping.

## Features

- **Audio Upload**: Upload therapy session recordings in various audio formats
- **Automatic Transcription**: Convert speech to text with speaker identification
- **Session Summarization**: Generate concise summaries of therapy sessions
- **Vectorization**: Process transcripts for AI-powered analysis and search
- **Session Management**: View and track the status of all uploaded sessions
- **Real-time Status Updates**: Monitor processing progress from upload to completion

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React components with modern design
- **Backend Integration**: RESTful API for session processing

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Sessions**: Use the main page to upload audio recordings of therapy sessions
2. **Monitor Progress**: Track transcription, summarization, and vectorization status
3. **View Sessions**: Browse all processed sessions on the sessions page
4. **Access Details**: Click on individual sessions to view transcripts, summaries, and speaker information

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with upload
│   └── sessions/          # Sessions management
│       ├── page.tsx       # Sessions list
│       └── [id]/          # Individual session details
│           └── page.tsx
├── components/            # Reusable React components
│   ├── AudioUpload.tsx    # File upload component
│   ├── StatusBadge.tsx    # Status indicator
│   └── TranscriptView.tsx # Transcript display
├── lib/                   # Utility functions and types
│   ├── api.ts            # API client functions
│   └── types.ts          # TypeScript type definitions
└── public/               # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Contributing

1. Follow the existing code style and TypeScript types
2. Ensure all components are properly typed
3. Test UI components across different screen sizes
4. Keep API calls abstracted in `lib/api.ts`

export interface Session {
  id: string;
  therapist_id: string;
  filename: string;
  original_filename: string;
  audio_file_url: string;
  audio_file_type: string | null;
  status: 'pending' | 'transcribing' | 'summarizing' | 'vectorizing' | 'completed' | 'failed';
  upload_timestamp: string;
  transcript: string | null;
  summary: string | null;
  speakers: SpeakerSegment[] | null;
  speaker_count: number;
  vector_status: 'pending' | 'processing' | 'completed' | 'failed';
  embedding: number[] | null;
}

export interface SpeakerSegment {
  speaker: string;
  start: number;
  end: number;
  text: string;
}

export interface UploadResponse {
  id: string;
  status: string;
  message: string;
}

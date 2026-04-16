'use client';

import { SpeakerSegment } from '@/lib/types';

interface TranscriptViewProps {
  transcript: string | null;
  speakers: SpeakerSegment[] | null;
}

export default function TranscriptView({ transcript, speakers }: TranscriptViewProps) {
  if (!transcript && !speakers) {
    return (
      <div className="text-gray-500 text-center py-8">
        Transcript not available yet
      </div>
    );
  }

  // If we have speaker segments, display them with labels
  if (speakers && speakers.length > 0) {
    return (
      <div className="space-y-4">
        {speakers.map((segment, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-blue-700">{segment.speaker}</span>
              <span className="text-xs text-gray-500">
                {formatTime(segment.start)} - {formatTime(segment.end)}
              </span>
            </div>
            <p className="text-gray-700">{segment.text}</p>
          </div>
        ))}
      </div>
    );
  }

  // Otherwise, display plain transcript
  return (
    <div className="prose max-w-none">
      <p className="whitespace-pre-wrap text-gray-700">{transcript}</p>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

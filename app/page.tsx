import AudioUpload from '@/components/AudioUpload';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Therapy Session Processing
          </h1>
          <p className="text-lg text-gray-600">
            Upload an audio recording of a therapy session to transcribe, summarize, and vectorize
          </p>
        </div>

        <div className="mb-8 text-center">
          <Link
            href="/sessions"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Sessions
          </Link>
        </div>

        <AudioUpload />
      </div>
    </div>
  );
}

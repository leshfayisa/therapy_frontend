'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSession } from '@/lib/api';
import { Session } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import TranscriptView from '@/components/TranscriptView';
import Link from 'next/link';

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSession();
    // Poll for updates if session is still processing
    const interval = setInterval(() => {
      if (session && ['pending', 'transcribing', 'summarizing', 'vectorizing'].includes(session.status)) {
        loadSession();
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [sessionId, session?.status]);

  const loadSession = async () => {
    try {
      setLoading(true);
      const data = await getSession(sessionId);
      setSession(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error || 'Session not found'}</p>
            <Link
              href="/sessions"
              className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
            >
              ← Back to sessions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/sessions"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to sessions
        </Link>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{session.original_filename}</h1>
              <StatusBadge status={session.status} />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Uploaded: {new Date(session.upload_timestamp).toLocaleString()}
            </p>
          </div>

          <div className="px-6 py-4 space-y-6">
            {/* Processing Status */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Processing Status</h2>
              <div className="flex gap-4">
                <StatusBadge status={session.status} label={`Status: ${session.status}`} />
                <StatusBadge
                  status={session.vector_status}
                  label={`Vectorization: ${session.vector_status}`}
                />
              </div>
            </div>

            {/* Summary */}
            {session.summary && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Summary</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-700">{session.summary}</p>
                </div>
              </div>
            )}

            {/* Transcript */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Transcript</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                <TranscriptView transcript={session.transcript} speakers={session.speakers} />
              </div>
            </div>

            {/* Processing indicator */}
            {['pending', 'transcribing', 'summarizing', 'vectorizing'].includes(session.status) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  <p className="text-sm text-yellow-800">
                    Session is being processed. This page will update automatically...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

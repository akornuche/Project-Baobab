'use client';

import Link from 'next/link';

export default function ConfirmedPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Confirmation Sent!
          </h1>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation email to {searchParams.email || 'your email address'}. 
            Please check your inbox and click the link to confirm your subscription.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

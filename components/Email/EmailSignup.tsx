'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface EmailSignupProps {
  placement?: 'footer' | 'modal' | 'inline';
  source?: string;
}

export function EmailSignup({ 
  placement = 'inline', 
  source = 'website' 
}: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          source: source || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast({
          title: 'Success!',
          description: data.message,
        });
        setEmail('');
        setName('');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to subscribe',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
        <div className="text-green-600 mb-2">🎉</div>
        <p className="text-green-700 font-medium">
          You're on the list! We'll be in touch soon.
        </p>
      </div>
    );
  }

  const baseClasses = 'flex flex-col gap-3';
  const footerClasses = 'max-w-md mx-auto';
  const inlineClasses = 'w-full max-w-md';

  return (
    <form 
      onSubmit={handleSubmit}
      className={`${baseClasses} ${placement === 'footer' ? footerClasses : inlineClasses}`}
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {placement !== 'footer' && (
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name (optional)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}

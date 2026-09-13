'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewGuidePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [domainId, setDomainId] = useState('');
  const [subdomainId, setSubdomainId] = useState('');
  const [content, setContent] = useState({
    quickAnswer: '',
    overview: '',
    definitions: '',
    requirements: [] as string[],
    timeline: [] as string[],
    regulatory: '',
    commonMistakes: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          subtitle,
          domainId,
          subdomainId,
          content,
        }),
      });

      if (response.ok) {
        router.push('/dashboard/guides');
      } else {
        console.error('Failed to create guide');
      }
    } finally {
      setLoading(false);
    }
  };

  const addRequirement = () => {
    setContent(prev => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const updateRequirement = (index: number, value: string) => {
    setContent(prev => {
      const newRequirements = [...prev.requirements];
      newRequirements[index] = value;
      return { ...prev, requirements: newRequirements };
    });
  };

  const removeRequirement = (index: number) => {
    setContent(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const addTimelineStep = () => {
    setContent(prev => ({ ...prev, timeline: [...prev.timeline, ''] }));
  };

  const updateTimelineStep = (index: number, value: string) => {
    setContent(prev => {
      const newTimeline = [...prev.timeline];
      newTimeline[index] = value;
      return { ...prev, timeline: newTimeline };
    });
  };

  const removeTimelineStep = (index: number) => {
    setContent(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index),
    }));
  };

  const addMistake = () => {
    setContent(prev => ({ ...prev, commonMistakes: [...prev.commonMistakes, ''] }));
  };

  const updateMistake = (index: number, value: string) => {
    setContent(prev => {
      const newMistakes = [...prev.commonMistakes];
      newMistakes[index] = value;
      return { ...prev, commonMistakes: newMistakes };
    });
  };

  const removeMistake = (index: number) => {
    setContent(prev => ({
      ...prev,
      commonMistakes: prev.commonMistakes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Guide</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a new guide with structured content blocks
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-500">URL-friendly version of title</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={domainId}
                  onChange={(e) => setDomainId(e.target.value)}
                >
                  <option value="">Select Domain</option>
                  <option value="1">Government</option>
                  <option value="2">Business</option>
                  <option value="3">Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subdomain</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={subdomainId}
                  onChange={(e) => setSubdomainId(e.target.value)}
                >
                  <option value="">Select Subdomain</option>
                  <option value="1">Business Registration</option>
                  <option value="2">Identity & Civil Documents</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Answer */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Quick Answer Box</h2>
            <textarea
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Summarize the answer in 3-4 sentences"
              value={content.quickAnswer}
              onChange={(e) => setContent(prev => ({ ...prev, quickAnswer: e.target.value }))}
            />
          </div>

          {/* Overview */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Overview</h2>
            <textarea
              required
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Explain what this is and why it matters"
              value={content.overview}
              onChange={(e) => setContent(prev => ({ ...prev, overview: e.target.value }))}
            />
          </div>

          {/* Definitions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Understanding the Basics (Definitions)</h2>
            <textarea
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Define 2-4 key terms a newcomer wouldn't know"
              value={content.definitions}
              onChange={(e) => setContent(prev => ({ ...prev, definitions: e.target.value }))}
            />
          </div>

          {/* Requirements */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Requirements</h2>
            <div className="space-y-2">
              {content.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addRequirement}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Requirement
            </button>
          </div>

          {/* Timeline */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Timeline & Steps</h2>
            <div className="space-y-2">
              {content.timeline.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={step}
                    onChange={(e) => updateTimelineStep(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeTimelineStep(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTimelineStep}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Step
            </button>
          </div>

          {/* Regulatory */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">The Regulatory Picture</h2>
            <textarea
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Legal basis, governing act, compliance obligations"
              value={content.regulatory}
              onChange={(e) => setContent(prev => ({ ...prev, regulatory: e.target.value }))}
            />
          </div>

          {/* Common Mistakes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Common Mistakes</h2>
            <div className="space-y-2">
              {content.commonMistakes.map((mistake, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={mistake}
                    onChange={(e) => updateMistake(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeMistake(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addMistake}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Mistake
            </button>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? 'Creating...' : 'Create Guide'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/guides')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
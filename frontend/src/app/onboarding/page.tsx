'use client';

import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to Psychora
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Choose your interests
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select topics you'd like to learn about
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Cognitive Psychology', 'Behavioral Psychology', 'Social Psychology', 'Developmental Psychology'].map((topic) => (
                <button
                  key={topic}
                  className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Set your learning goals
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              How much time can you dedicate to learning?
            </p>
            <div className="space-y-2">
              {['5-10 minutes per day', '10-20 minutes per day', '20-30 minutes per day', '30+ minutes per day'].map((goal) => (
                <button
                  key={goal}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white text-left"
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

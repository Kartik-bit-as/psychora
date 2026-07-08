'use client';

import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">{user?.streakCount || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{user?.xp || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{user?.level || 1}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

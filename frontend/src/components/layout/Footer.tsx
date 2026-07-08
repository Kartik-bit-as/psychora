export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Psychora. Learn minds, not just theories.</p>
      </div>
    </footer>
  );
}

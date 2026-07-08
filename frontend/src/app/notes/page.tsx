export default function NotesPage() {
  return (
    <div className="min-h-screen bg-[#0f0a15] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">📝 Notes & Insights</h1>
        <p className="text-white/50 mb-8">Capture your psychology learnings and reflections.</p>

        <div className="grid gap-4">
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-[#f78a43]/10 flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <h3 className="text-white font-medium">Quick Note</h3>
                <p className="text-white/40 text-sm">Jot down something you learned today</p>
              </div>
            </div>
            <textarea
              className="w-full h-32 bg-white/5 rounded-lg border border-white/10 p-4 text-white placeholder-white/20 resize-none focus:outline-none focus:border-[#f78a43]/50"
              placeholder="Today I learned about..."
            />
            <button className="mt-3 px-4 py-2 bg-[#f78a43] text-white rounded-lg text-sm font-medium hover:bg-[#f78a43]/90 transition-colors">
              Save Note
            </button>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-6">
            <h3 className="text-white font-medium mb-2">📚 Your Notes</h3>
            <p className="text-white/40 text-sm">No notes yet. Start writing above!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

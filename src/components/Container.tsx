export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-600 min-h-screen w-full px-4 py-10 lg:px-36">
      {children}
    </main>
  );
}

import { useCallback, useMemo, useState } from 'react';
import type { Note } from './types/note';
import { loadNotes, saveNotes } from './lib/storage';
import { AppShell } from './components/AppShell';
import { NotesList } from './components/NotesList';
import { NoteEditor } from './components/NoteEditor';

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function matchesQuery(note: Note, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return note.title.toLowerCase().includes(q) || note.body.toLowerCase().includes(q);
}

function sortNotes(a: Note, b: Note): number {
  if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
  const at = new Date(a.updatedAt).valueOf();
  const bt = new Date(b.updatedAt).valueOf();
  return bt - at;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const persist = useCallback((updater: (prev: Note[]) => Note[]) => {
    setNotes((prev) => {
      const next = updater(prev);
      saveNotes(next);
      return next;
    });
  }, []);

  const selectedNote = useMemo(() => {
    if (!selectedId) return null;
    return notes.find((n) => n.id === selectedId) ?? null;
  }, [notes, selectedId]);

  const visibleNotes = useMemo(() => {
    return notes.filter((n) => matchesQuery(n, query)).slice().sort(sortNotes);
  }, [notes, query]);

  const createNote = useCallback(() => {
    const now = nowIso();
    const note: Note = {
      id: newId(),
      title: '',
      body: '',
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
      locale: 'ja',
    };
    persist((prev) => [note, ...prev]);
    setSelectedId(note.id);
  }, [persist]);

  const updateNote = useCallback(
    (id: string, patch: Pick<Note, 'title' | 'body' | 'isFavorite'>) => {
      const updatedAt = nowIso();
      persist((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt } : n)));
    },
    [persist],
  );

  const deleteNote = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((n) => n.id !== id));
      setSelectedId(null);
    },
    [persist],
  );

  return (
    <AppShell>
      {selectedNote ? (
        <NoteEditor
          key={selectedNote.id}
          note={selectedNote}
          onBack={() => setSelectedId(null)}
          onUpdate={updateNote}
          onDelete={deleteNote}
        />
      ) : (
        <NotesList
          notes={visibleNotes}
          query={query}
          onQueryChange={setQuery}
          onOpenNote={setSelectedId}
          onCreateNote={createNote}
        />
      )}
    </AppShell>
  );
}

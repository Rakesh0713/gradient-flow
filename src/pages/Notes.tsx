import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Pin, StickyNote as StickyNoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NoteCard, Note } from "@/components/shared/NoteCard";
import { Modal } from "@/components/shared/Modal";
import { NoteForm } from "@/components/forms/NoteForm";

// Mock notes data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discussed the Q4 project timeline and deliverables. Key points: - Launch date moved to December - Need additional resources for testing - Marketing campaign to start in November",
    isPinned: true,
    createdAt: "2024-07-27",
    color: "bg-yellow-100 border-yellow-200"
  },
  {
    id: "2", 
    title: "Book Recommendations",
    content: "1. Atomic Habits by James Clear\n2. The Psychology of Money by Morgan Housel\n3. Thinking, Fast and Slow by Daniel Kahneman",
    isPinned: false,
    createdAt: "2024-07-26",
    color: "bg-blue-100 border-blue-200"
  },
  {
    id: "3",
    title: "Weekend Plans",
    content: "Visit the farmer's market, try the new coffee shop downtown, and finish reading the design system documentation.",
    isPinned: false,
    createdAt: "2024-07-25",
    color: "bg-green-100 border-green-200"
  },
  {
    id: "4",
    title: "Recipe Ideas",
    content: "Pasta with roasted vegetables, homemade pizza with fresh basil, grilled salmon with lemon herb seasoning",
    isPinned: true,
    createdAt: "2024-07-24",
    color: "bg-pink-100 border-pink-200"
  },
  {
    id: "5",
    title: "Learning Goals",
    content: "1. Complete React advanced patterns course\n2. Learn TypeScript fundamentals\n3. Practice CSS Grid and Flexbox\n4. Build a personal portfolio website",
    isPinned: false,
    createdAt: "2024-07-23",
    color: "bg-purple-100 border-purple-200"
  }
];

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  const handleCreateNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setIsModalOpen(false);
  };

  const handleEditNote = (noteData: Omit<Note, 'id' | 'createdAt'>) => {
    if (!editingNote) return;
    
    setNotes(notes.map(note => 
      note.id === editingNote.id 
        ? { ...noteData, id: editingNote.id, createdAt: editingNote.createdAt }
        : note
    ));
    setEditingNote(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleTogglePin = (noteId: string) => {
    setNotes(notes.map(note =>
      note.id === noteId
        ? { ...note, isPinned: !note.isPinned }
        : note
    ));
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingNote(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(undefined);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sticky Notes</h1>
          <p className="text-muted-foreground">
            Quick notes and reminders for instant access
          </p>
        </div>
        
        <Button
          variant="gradient"
          size="lg"
          onClick={openCreateModal}
          className="group shadow-elegant"
        >
          <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
          Add New Note
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card"
        />
      </motion.div>

      {/* Notes Content */}
      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <StickyNoteIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchTerm ? "No notes found" : "No notes yet"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? "Try adjusting your search terms"
              : "Create your first sticky note to get started"
            }
          </p>
          {!searchTerm && (
            <Button variant="gradient" onClick={openCreateModal}>
              <Plus className="mr-2 h-4 w-4" />
              Create Note
            </Button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Pinned Notes */}
          {pinnedNotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Pin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Pinned Notes</h2>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {pinnedNotes.map((note, index) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    delay={index * 0.05}
                    onEdit={openEditModal}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Notes */}
          {unpinnedNotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pinnedNotes.length > 0 ? 0.3 : 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <StickyNoteIcon className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold text-foreground">All Notes</h2>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {unpinnedNotes.map((note, index) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    delay={(pinnedNotes.length + index) * 0.05}
                    onEdit={openEditModal}
                    onDelete={handleDeleteNote}
                    onTogglePin={handleTogglePin}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingNote ? "Edit Note" : "Create New Note"}
        size="lg"
      >
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? handleEditNote : handleCreateNote}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

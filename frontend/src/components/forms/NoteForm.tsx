import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/components/shared/NoteCard";

interface NoteFormProps {
  note?: Note;
  onSubmit: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const colorOptions = [
  { value: "bg-yellow-100 border-yellow-200", label: "Yellow", preview: "bg-yellow-100" },
  { value: "bg-blue-100 border-blue-200", label: "Blue", preview: "bg-blue-100" },
  { value: "bg-green-100 border-green-200", label: "Green", preview: "bg-green-100" },
  { value: "bg-pink-100 border-pink-200", label: "Pink", preview: "bg-pink-100" },
  { value: "bg-purple-100 border-purple-200", label: "Purple", preview: "bg-purple-100" },
];

export function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [formData, setFormData] = useState({
    title: note?.title || "",
    content: note?.content || "",
    color: note?.color || colorOptions[0].value,
    isPinned: note?.isPinned || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter note title..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your note..."
          rows={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: color.value })}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${color.preview} ${
                formData.color === color.value
                  ? "border-primary scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              title={color.label}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="gradient" className="flex-1">
          {note ? "Update Note" : "Create Note"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
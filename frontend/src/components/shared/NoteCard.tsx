import { motion } from "framer-motion";
import { Pin, Trash2, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  color?: string;
}

interface NoteCardProps {
  note: Note;
  delay?: number;
  onEdit?: (note: Note) => void;
  onDelete?: (noteId: string) => void;
  onTogglePin?: (noteId: string) => void;
}

const noteColors = [
  "bg-yellow-100 border-yellow-200",
  "bg-blue-100 border-blue-200", 
  "bg-green-100 border-green-200",
  "bg-pink-100 border-pink-200",
  "bg-purple-100 border-purple-200"
];

export function NoteCard({ 
  note, 
  delay = 0, 
  onEdit, 
  onDelete, 
  onTogglePin 
}: NoteCardProps) {
  const colorClass = note.color || noteColors[Math.floor(Math.random() * noteColors.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      layout
      className="h-full"
    >
      <Card className={cn(
        "group hover-lift transition-all duration-300 relative overflow-hidden h-full",
        "shadow-card hover:shadow-hover flex flex-col",
        colorClass
      )}>
        <CardContent className="p-4 h-full flex flex-col">
          {/* Pin indicator */}
          {note.isPinned && (
            <div className="absolute top-2 right-2">
              <Pin className="h-4 w-4 text-primary fill-current" />
            </div>
          )}

          {/* Content */}
          <div className="space-y-3 h-full flex flex-col">
            <h3 className="font-semibold text-foreground line-clamp-2 pr-6 flex-shrink-0">
              {note.title}
            </h3>
            
            <div className="custom-scrollbar overflow-y-auto flex-1 min-h-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {note.content}
              </p>
            </div>
            
            <div className="flex items-center justify-between flex-shrink-0 pt-2 border-t border-border/30">
              <span className="text-xs text-muted-foreground">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              
              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onTogglePin?.(note.id)}
                  className={cn(
                    "h-7 w-7",
                    note.isPinned ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <Pin className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit?.(note)}
                  className="h-7 w-7 text-muted-foreground hover:text-primary"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete?.(note.id)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import { Calendar, Clock, Trash2, Edit, CheckCircle, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  deadline: string;
  category?: string;
}

interface TaskCardProps {
  task: Task;
  delay?: number;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onToggleStatus?: (taskId: string) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-red-100 text-red-800 border-red-200"
};

export function TaskCard({ 
  task, 
  delay = 0, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: TaskCardProps) {
  const isCompleted = task.status === 'completed';
  const isOverdue = new Date(task.deadline) < new Date() && !isCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      layout
    >
      <Card className={cn(
        "group hover-lift transition-all duration-300",
        "bg-card border-border shadow-card hover:shadow-hover",
        isCompleted && "opacity-75 bg-muted/50",
        isOverdue && "border-l-4 border-l-destructive"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Status Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleStatus?.(task.id)}
                className="flex-shrink-0 mt-1 h-6 w-6 p-0 hover:bg-transparent"
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                )}
              </Button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={cn(
                    "font-semibold text-foreground truncate",
                    isCompleted && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", priorityColors[task.priority])}
                  >
                    {task.priority}
                  </Badge>
                </div>

                <p className={cn(
                  "text-sm text-muted-foreground mb-3 line-clamp-2",
                  isCompleted && "line-through"
                )}>
                  {task.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className={cn(
                      isOverdue && "text-destructive font-medium"
                    )}>
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {task.category && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{task.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit?.(task)}
                className="h-8 w-8 text-muted-foreground hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete?.(task.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
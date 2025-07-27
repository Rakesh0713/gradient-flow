import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/shared/Modal";
import { TaskForm } from "@/components/forms/TaskForm";
import { Task } from "@/components/shared/TaskCard";

// Mock tasks with deadlines
const mockTasksWithDeadlines: Task[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync",
    priority: "high",
    status: "pending", 
    deadline: "2024-07-29",
    category: "Work"
  },
  {
    id: "2",
    title: "Project Review", 
    description: "Review Q3 deliverables",
    priority: "medium",
    status: "pending",
    deadline: "2024-07-31",
    category: "Work"
  },
  {
    id: "3",
    title: "Doctor Appointment",
    description: "Annual checkup",
    priority: "medium",
    status: "pending",
    deadline: "2024-08-02",
    category: "Personal"
  }
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasksWithDeadlines);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.deadline === dateStr);
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    if (!selectedDate) return;
    
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      deadline: dateStr
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
    setSelectedDate(null);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your tasks by date
          </p>
        </div>
      </motion.div>

      {/* Calendar Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card shadow-card">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-foreground">
                {months[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map(day => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="p-2 h-24" />;
                }

                const tasksForDay = getTasksForDate(day);
                const isTodayDate = isToday(day);

                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-2 h-24 border rounded-lg cursor-pointer transition-colors
                      hover:bg-muted/50 relative overflow-hidden
                      ${isTodayDate ? 'bg-primary/10 border-primary' : 'border-border'}
                    `}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className={`
                      text-sm font-medium mb-1
                      ${isTodayDate ? 'text-primary' : 'text-foreground'}
                    `}>
                      {day}
                    </div>
                    
                    {/* Tasks for this day */}
                    <div className="space-y-1">
                      {tasksForDay.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className={`
                            text-xs px-1 py-0.5 rounded text-white truncate
                            ${task.priority === 'high' ? 'bg-red-500' : 
                              task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                          `}
                        >
                          {task.title}
                        </div>
                      ))}
                      {tasksForDay.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{tasksForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks
                .filter(task => new Date(task.deadline) >= today)
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .slice(0, 5)
                .map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(task.deadline).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        task.priority === 'high' ? 'border-red-200 text-red-800 bg-red-50' :
                        task.priority === 'medium' ? 'border-yellow-200 text-yellow-800 bg-yellow-50' :
                        'border-green-200 text-green-800 bg-green-50'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDate(null);
        }}
        title={`Create Task for ${selectedDate?.toLocaleDateString()}`}
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedDate(null);
          }}
        />
      </Modal>
    </div>
  );
}
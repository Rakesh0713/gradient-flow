import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { TaskCard, Task } from "@/components/shared/TaskCard";
import { Modal } from "@/components/shared/Modal";
import { TaskForm } from "@/components/forms/TaskForm";

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the Q4 project proposal for the new client initiative",
    priority: "high",
    status: "pending",
    deadline: "2024-07-30",
    category: "Work"
  },
  {
    id: "2", 
    title: "Review team feedback",
    description: "Go through all team feedback from the last sprint retrospective",
    priority: "medium",
    status: "completed",
    deadline: "2024-07-28",
    category: "Work"
  },
  {
    id: "3",
    title: "Plan weekend trip",
    description: "Research and book hotels for the upcoming weekend getaway",
    priority: "low",
    status: "pending",
    deadline: "2024-08-02",
    category: "Personal"
  },
  {
    id: "4",
    title: "Update portfolio website",
    description: "Add recent projects and update the design to reflect current skills",
    priority: "medium",
    status: "pending",
    deadline: "2024-08-05",
    category: "Personal"
  }
];

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completionRate: Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
  };

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
  };

  const handleEditTask = (taskData: Omit<Task, 'id'>) => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...taskData, id: editingTask.id }
        : task
    ));
    setEditingTask(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleStatus = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            You have {stats.pending} pending tasks and {stats.completed} completed today.
          </p>
        </div>
        
        <Button
          variant="gradient"
          size="lg"
          onClick={openCreateModal}
          className="group shadow-elegant"
        >
          <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
          Add New Task
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={CheckCircle}
          delay={0.1}
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          trend={{ value: 12, isPositive: true }}
          delay={0.2}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          delay={0.3}
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          delay={0.4}
        />
      </div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Recent Tasks</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first task
            </p>
            <Button variant="gradient" onClick={openCreateModal}>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                delay={index * 0.1}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
        size="lg"
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
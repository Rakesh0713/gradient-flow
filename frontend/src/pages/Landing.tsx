import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Calendar, StickyNote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: CheckCircle,
    title: "Smart Task Management",
    description: "Advanced prioritization, automated reminders, and intelligent deadline tracking to keep you on top of your work"
  },
  {
    icon: Calendar,
    title: "Unified Calendar View", 
    description: "Seamlessly integrate tasks, deadlines, and events in one comprehensive calendar interface"
  },
  {
    icon: StickyNote,
    title: "Dynamic Sticky Notes",
    description: "Color-coded, pinnable notes with rich text formatting and instant search capabilities"
  },
  {
    icon: Users,
    title: "Enterprise Collaboration",
    description: "Real-time team synchronization, role-based permissions, and integrated communication tools"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content: "TaskFlow has revolutionized how our team manages projects. The intuitive interface and powerful features have increased our productivity by 40%.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Freelance Designer",
    content: "As a freelancer juggling multiple clients, TaskFlow keeps me organized and ensures I never miss a deadline. The calendar integration is game-changing.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Marketing Director",
    content: "The collaboration features in TaskFlow have streamlined our marketing campaigns. Our team coordination has never been better.",
    rating: 5
  }
];

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "2M+", label: "Tasks Completed" },
  { number: "99.9%", label: "Uptime" },
  { number: "4.9/5", label: "User Rating" }
];

export function Landing() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign in
    navigate("/dashboard");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign up
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">TaskFlow</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => setIsSignInOpen(true)}
              >
                Sign In
              </Button>
              <Button 
                variant="gradient" 
                onClick={() => setIsSignUpOpen(true)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Transform Your Productivity with
                <span className="bg-gradient-to-r from-primary to-accent-light bg-clip-text text-transparent">
                  {" "}Professional Task Management
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the power of intelligent task organization, seamless team collaboration, 
                and data-driven insights. TaskFlow empowers professionals and teams to achieve more 
                with less effort through cutting-edge productivity technology.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button 
                  size="xl" 
                  variant="gradient" 
                  onClick={() => setIsSignUpOpen(true)}
                  className="group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="xl" variant="outline">
                  View Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 gradient-primary opacity-10 rounded-full transform translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-accent opacity-10 rounded-full transform -translate-x-48 translate-y-48" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-light/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for professionals who demand excellence. Every feature is designed to enhance 
              productivity and streamline workflows for individuals and teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover-lift bg-card border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their productivity with TaskFlow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover-lift bg-card border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 text-yellow-400 text-lg">★</div>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-foreground">TaskFlow</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      <Modal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        title="Sign In"
      >
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" required />
          </div>
          <Button type="submit" variant="gradient" className="w-full">
            Sign In
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignInOpen(false);
                setIsSignUpOpen(true);
              }}
              className="text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        title="Sign Up"
      >
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="Enter your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" placeholder="Create a password" required />
          </div>
          <Button type="submit" variant="gradient" className="w-full">
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUpOpen(false);
                setIsSignInOpen(true);
              }}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Calendar } from "./pages/Calendar";
import { Notes } from "./pages/Notes";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          
          {/* App routes with layout */}
          <Route path="/dashboard" element={<Layout title="Dashboard" />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/calendar" element={<Layout title="Calendar" />}>
            <Route index element={<Calendar />} />
          </Route>
          <Route path="/notes" element={<Layout title="Sticky Notes" />}>
            <Route index element={<Notes />} />
          </Route>
          <Route path="/profile" element={<Layout title="Profile" />}>
            <Route index element={<Profile />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

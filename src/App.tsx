
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExamList from "./pages/ExamList";
import ExamInstructions from "./pages/ExamInstructions";
import ExamSimulation from "./pages/ExamSimulation";
import ExamResults from "./pages/ExamResults";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import ExamHistory from "./pages/ExamHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exam" element={<ExamList />} />
          <Route path="/exam/:examId/instructions" element={<ExamInstructions />} />
          <Route path="/exam/:examId/simulation" element={<ExamSimulation />} />
          <Route path="/exam/results/:examId" element={<ExamResults />} />
          <Route path="/panduan" element={<Guide />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/riwayat" element={<ExamHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

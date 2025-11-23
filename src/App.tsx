import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import AposBusca from "./pages/AposBusca";
import NotFound from "./pages/NotFound";
import Carregamento from "./pages/Carregamento";
import Concluido from "./pages/Concluido";
import Historico from "./pages/Historico";
import Home from "./pages/Home";
import Inicio from "./pages/Inicio"; 
import Matricula from "./pages/Matricula";
import Planilha from "./pages/Planilha";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* 1. Rota raiz: Inicia no <Inicio />*/}
          <Route path="/" element={<Inicio />} />

          {/* 2. Rotas de Navegação */}
          <Route path="/aposbusca" element={<AposBusca />} />
          <Route path="/carregamento" element={<Carregamento />} />
          <Route path="/concluido" element={<Concluido />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/home" element={<Home />} />
          <Route path="/matricula" element={<Matricula />} />
          <Route path="/planilha" element={<Planilha />} />
          <Route path="*" element={<Inicio />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
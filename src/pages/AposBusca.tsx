import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Plus, ScrollText } from "lucide-react";

const AposBusca = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('user_name') || "Usuário";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-primary py-8">
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>

      {/* Container Principal centralizado */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        <div className="flex flex-col items-center space-y-12 w-full max-w-4xl">
          
          {/* Texto centralizado */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-5xl font-bold text-primary">
              Olá, {userName}!
            </h1>
            <p className="text-4xl font-semibold text-primary">
              Qual a boa para hoje?
            </p>
          </div>

          {/* Botões centralizados */}
          <div className="flex flex-col items-center gap-6 w-full max-w-md">
            <Button
              onClick={() => navigate("/home")}
              className="w-full h-16 text-xl rounded-full flex items-center justify-center gap-3"
              size="lg"
            >
              <Plus className="w-6 h-6" />
              Montar treino
            </Button>

            <Button
              onClick={() => navigate("/historico")}
              className="w-full h-16 text-xl rounded-full flex items-center justify-center gap-3"
              size="lg"
            >
              <ScrollText className="w-6 h-6" />
              Histórico
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AposBusca;
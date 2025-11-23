import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Loader2, Trash2 } from "lucide-react"; 
import { api } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; 

const Historico = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('user_name') || "Usuário";
  const userCpf = localStorage.getItem('user_cpf');

  const loadHistory = async () => {
    if (!userCpf) {
      navigate("/");
      return;
    }
    setLoading(true);
    try {
      const data = await api.getHistorico(userCpf);
      setHistory(data);
    } catch (error) {
      console.error("Erro ao carregar histórico", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [navigate]);

  const handleVerTreino = (item: any) => {
    navigate("/planilha", {
      state: {
        plan: item.plan,
        nome: userName,
        data: item.timestamp,
        objetivo: item.meta?.objetivo || "",
        nivel: item.meta?.nivel || "",
        frequencia: "", 
        prioridade: "",
      }
    });
  };

  const handleDelete = async (timestamp: string) => {
    if (!userCpf) return;
    
    if (window.confirm("Tem certeza que deseja excluir este treino do histórico?")) {
      try {
        const res = await api.deleteHistorico(userCpf, timestamp);
        if (res.success) {
          //Recarrega a lista após deletar
          await loadHistory();
        } else {
          alert("Erro ao deletar: " + res.error);
        }
      } catch (e) {
        alert("Erro de conexão ao tentar deletar.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-primary py-8 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/aposbusca")} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-primary-foreground/10"
        >
          <ArrowLeft className="w-8 h-8" />
        </Button>
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>

      <div className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-primary mb-8">
            Histórico
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-xl">
              Nenhum treino encontrado. Que tal gerar o primeiro?
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((treino, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-border rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col">
                    <span className="text-primary font-bold text-lg">
                      {userName}
                    </span>
                    <span className="text-muted-foreground">
                       Gerado em: {formatDate(treino.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    {/* Botão de Excluir */}
                    <Button
                      size="icon"
                      variant="destructive"
                      className="rounded-full w-12 h-12 opacity-90 hover:opacity-100"
                      onClick={() => handleDelete(treino.timestamp)}
                      title="Excluir do Histórico"
                    >
                      <Trash2 className="w-6 h-6" />
                    </Button>

                    {/* Botão de Visualizar */}
                    <Button
                      size="icon"
                      className="rounded-full w-12 h-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                      onClick={() => handleVerTreino(treino)}
                      title="Ver Planilha"
                    >
                      <FileText className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Historico;
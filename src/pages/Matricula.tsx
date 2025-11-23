import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/services/api"; 

const Matricula = () => {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricula.trim()) {
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      //Chama o backend 
      const response = await api.login(matricula);

      if (response.success) {
        localStorage.setItem('user_cpf', response.user.cpf);
        localStorage.setItem('user_name', response.user.name);
        navigate("/aposbusca");
      } else {
        setShowError(true); //CPF não encontrado
      }
    } catch (error) {
      console.error(error);
      setShowError(true); //Erro de conexão
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="bg-primary py-8">
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-3">
            <label className="text-muted-foreground text-lg">
              Matrícula ou CPF:
            </label>
            <Input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full h-14 text-lg rounded-full border-2"
              placeholder="Digite apenas números"
              disabled={loading}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="w-full max-w-sm h-14 text-xl rounded-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "BUSCANDO..." : "BUSCAR"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erro</DialogTitle>
            <DialogDescription>
              Matrícula ou CPF não encontrado. Verifique se os dados estão corretos!
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowError(false)}>OK</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Matricula;
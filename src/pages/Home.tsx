import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    experiencia: "",
    objetivo: "",
    frequencia: "",
    prioridade: "",
    lesao: "nao",
    lesaoDescricao: "",
    nome: "",
    data: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async () => {
    const newErrors: string[] = [];
    
    if (!formData.nome) newErrors.push("nome");
    if (!formData.data) newErrors.push("data");
    if (!formData.experiencia) newErrors.push("experiencia");
    if (!formData.objetivo) newErrors.push("objetivo");
    if (!formData.frequencia) newErrors.push("frequencia");
    if (!formData.prioridade) newErrors.push("prioridade");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const cpf = localStorage.getItem('user_cpf');

    if (!cpf) {
      toast({ title: "Erro", description: "Sessão expirada. Faça login novamente.", variant: "destructive" });
      navigate("/");
      return;
    }

    try {
      let days = 3;
      if (formData.frequencia === "4") days = 4;
      if (formData.frequencia === "5+") days = 5;

      let objectiveMapped = formData.objetivo;
      if (formData.objetivo === "emagrecimento") objectiveMapped = "perda_de_peso";

      //Chamada API
      const response = await api.gerarTreino({
        cpf: cpf,
        level: formData.experiencia,
        objective: objectiveMapped,
        sex: "masculino", 
        days_per_week: days
      });

      if (response.success) {
        navigate("/planilha", { 
          state: { 
            plan: response.plan, 
            ...formData 
          } 
        });
      } else {
         toast({ title: "Erro ao gerar", description: response.error || "Tente novamente.", variant: "destructive" });
      }

    } catch (err) {
      console.error(err);
      toast({ title: "Erro de Conexão", description: "Não foi possível falar com o servidor Python.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6">
        <Logo />
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-foreground">Nome:</Label>
            <Input
              id="nome"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className={`bg-card ${errors.includes("nome") ? "border-destructive" : ""}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data" className="text-foreground">Data de Nascimento:</Label>
            <Input
              id="data"
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              className={`bg-card ${errors.includes("data") ? "border-destructive" : ""}`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experiencia" className="text-foreground">Experiência:</Label>
            <Select
              value={formData.experiencia}
              onValueChange={(value) => setFormData({ ...formData, experiencia: value })}
            >
              <SelectTrigger 
                id="experiencia"
                className={`bg-card ${errors.includes("experiencia") ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="SELECIONE" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="iniciante">Iniciante (0-6 meses)</SelectItem>
                <SelectItem value="intermediario">Intermediário (1-2 anos)</SelectItem>
                <SelectItem value="avancado">Avançado (+2anos)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="objetivo" className="text-foreground">Objetivo:</Label>
            <Select
              value={formData.objetivo}
              onValueChange={(value) => setFormData({ ...formData, objetivo: value })}
            >
              <SelectTrigger 
                id="objetivo"
                className={`bg-card ${errors.includes("objetivo") ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="SELECIONE" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                <SelectItem value="condicionamento">Condicionamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequencia" className="text-foreground">Frequência Semanal:</Label>
            <Select
              value={formData.frequencia}
              onValueChange={(value) => setFormData({ ...formData, frequencia: value })}
            >
              <SelectTrigger 
                id="frequencia"
                className={`bg-card ${errors.includes("frequencia") ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="SELECIONE" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="2-3">2-3 dias</SelectItem>
                <SelectItem value="4">4 dias</SelectItem>
                <SelectItem value="5+">5 ou mais dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridade" className="text-foreground">Prioridade Muscular:</Label>
            <Select
              value={formData.prioridade}
              onValueChange={(value) => setFormData({ ...formData, prioridade: value })}
            >
              <SelectTrigger 
                id="prioridade"
                className={`bg-card ${errors.includes("prioridade") ? "border-destructive" : ""}`}
              >
                <SelectValue placeholder="SELECIONE" />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                <SelectItem value="equilibrado">Equilibrado</SelectItem>
                <SelectItem value="inferiores">Membros Inferiores</SelectItem>
                <SelectItem value="superiores">Membros Superiores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground">Lesão:</Label>
            <RadioGroup
              value={formData.lesao}
              onValueChange={(value) => setFormData({ ...formData, lesao: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="nao" />
                <Label htmlFor="nao" className="text-foreground font-normal cursor-pointer">Não</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="sim" />
                <Label htmlFor="sim" className="text-foreground font-normal cursor-pointer">Sim</Label>
              </div>
            </RadioGroup>

            {formData.lesao === "sim" && (
              <Input
                placeholder="Descreva a lesão"
                value={formData.lesaoDescricao}
                onChange={(e) => setFormData({ ...formData, lesaoDescricao: e.target.value })}
                className="bg-card mt-2"
              />
            )}
          </div>

          {errors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-destructive mt-0.5 flex-shrink-0" size={20} />
              <p className="text-destructive text-sm">
                Atenção: Selecione uma opção para cada item para continuar.
              </p>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-semibold"
            disabled={loading}
          >
            {loading ? "GERANDO SEU PLANO..." : "VER PLANO"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
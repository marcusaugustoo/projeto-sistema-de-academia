import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, LogOut } from "lucide-react";

const Planilha = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  useEffect(() => {
    if (formData && formData.nome) {
      document.title = `${formData.nome} - Treino GoPlan`;
    }
    return () => {
      document.title = "Treino GoPlan";
    };
  }, [formData]);

  if (!formData || !formData.plan) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Nenhum treino encontrado.</p>
        <Button onClick={() => navigate("/home")}>Voltar e Gerar</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleConcluir = () => {
    localStorage.removeItem('user_cpf');
    localStorage.removeItem('user_name');
    navigate("/concluido");
  };

  //Função auxiliar para formatar textos
  const getLabel = (value: string) => {
    if (!value) return "Não informado";
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ");
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <header className="bg-primary py-6 relative print:hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
           <Button variant="ghost" className="text-white hover:text-white/80" onClick={() => navigate('/home')}>
             <ArrowLeft className="w-8 h-8" />
           </Button>
        </div>
        <div className="flex justify-center">
            <Logo />
        </div>
      </header>

      {/*LOGO PARA IMPRESSÃO*/}
      <div className="hidden print:block text-center py-4 border-b mb-4">
        <h1 className="text-3xl font-bold uppercase">GoPlan</h1>
      </div>

      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/*CARTÃO DE INFORMAÇÕES DO ALUNO */}
        <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground shadow-md print:shadow-none print:border print:bg-white">
          <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
            <h1 className="text-2xl font-bold uppercase">{formData.nome || "Meu Treino"}</h1>
            <span className="text-lg font-medium">
              {formData.data ? new Date(formData.data).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-lg">
            <p><span className="font-bold">Objetivo:</span> {getLabel(formData.objetivo)}</p>
            <p><span className="font-bold">Frequência:</span> {getLabel(formData.frequencia)}</p>
            <p><span className="font-bold">Prioridade:</span> {getLabel(formData.prioridade)}</p>
            <p><span className="font-bold">Nível:</span> {getLabel(formData.level || formData.experiencia)}</p>
            
            {formData.lesao === "sim" && (
              <p className="text-red-600 font-bold md:col-span-2 mt-2 border-t pt-2">
                ⚠️ Cuidado: Lesão no(a) {formData.lesaoDescricao}
              </p>
            )}
          </div>
        </div>

        {/* LISTA DO TREINO GERADO PELO PYTHON */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
             <div className="bg-primary p-4 print:bg-gray-200 print:text-black">
                <h2 className="text-xl font-bold text-white text-center uppercase print:text-black">
                  Plano de Treino
                </h2>
             </div>
             
             <div className="p-6 print:p-0 print:pt-4">
                <ul className="space-y-3">
                  {formData.plan.map((line: string, index: number) => {
                    if (line.startsWith("###")) {
                      return (
                        <h3 key={index} className="text-xl font-bold text-primary mt-6 mb-3 border-b-2 border-primary/20 pb-1 break-inside-avoid print:text-black print:border-black">
                          {line.replace(/#/g, '')}
                        </h3>
                      );
                    }
                    if (line.startsWith("####")) {
                      return (
                        <h4 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2 break-inside-avoid">
                          {line.replace(/#/g, '')}
                        </h4>
                      );
                    }
                    if (line.startsWith("**") || line.startsWith("---")) {
                       if (line.includes("---")) return <hr key={index} className="my-4 border-gray-200"/>;
                       return <p key={index} className="font-semibold text-gray-600 my-2 italic">{line.replace(/\*\*/g, '')}</p>
                    }
                    
                    return (
                      <li key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors print:bg-white print:p-1 print:border-b print:border-gray-100 print:rounded-none">
                        <span className="text-primary font-bold print:text-black">•</span>
                        <span className="text-gray-900 font-medium">{line.replace(/^- /, '')}</span>
                      </li>
                    );
                  })}
                </ul>
             </div>
          </div>
        </div>

        {/*ÁREA DE BOTÕES*/}
        <div className="flex flex-col items-center gap-4 pt-6 print:hidden">
          {/* Botão de Imprimir */}
          <Button
            onClick={handlePrint}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-6 text-lg rounded-xl font-semibold flex items-center gap-3 shadow-lg transition-transform hover:scale-105 w-full max-w-md"
          >
            <Printer size={24} />
            SALVAR PDF
          </Button>

          {/* Botão de Concluir*/}
          <Button
            onClick={handleConcluir}
            variant="destructive"
            className="px-8 py-4 text-lg rounded-xl font-semibold flex items-center gap-2 w-full max-w-md opacity-90 hover:opacity-100"
          >
            <LogOut size={20} />
            CONCLUIR
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Planilha;
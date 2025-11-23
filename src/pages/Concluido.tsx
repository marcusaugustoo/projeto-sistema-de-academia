import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useEffect } from "react";

const Concluido = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/inicio");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full">
          <Check className="text-primary" size={64} strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground uppercase">
          Treino Montado Com Sucesso!
        </h1>
      </div>
    </div>
  );
};

export default Concluido;

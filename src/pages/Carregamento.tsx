import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Carregamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  useEffect(() => {
    if (!formData) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      navigate("/planilha", { state: formData });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <Loader2 className="w-16 h-16 text-white animate-spin" />
      <p className="mt-4 text-white text-xl">Carregando...</p>
    </div>
  );
};

export default Carregamento;

import logo from "@/assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`flex items-center justify-center cursor-pointer ${className}`}
      onClick={() => navigate("/")}
    >
      <img 
        src={logo} 
        alt="GoPlan Logo" 
        className="h-20 w-auto"
      />
    </div>
  );
};

export default Logo;

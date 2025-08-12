import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-700">
      <p className="text-6xl md:text-9xl text-red-500">404</p>
      <p className="text-xl md:text-2xl text-center mt-6 text-gray-200">
        Parece que você encontrou uma página secreta, mas ela não existe!
      </p>
      <Button
        className="mt-8 bg-red-500 hover:bg-red-500 hover:scale-105 text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Voltar para o início
      </Button>
    </div>
  );
}

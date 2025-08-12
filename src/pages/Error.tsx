import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import errorImage from "../assets/error.jpg";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-700 px-6">
      <img
        src={errorImage}
        alt="error image"
        className="rounded-md"
        width={400}
        height={400}
      />
      <p className="text-xl md:text-2xl text-center mt-6 text-gray-200">
        Parece que algo deu errado na sua solicitação! Desculpe, tente novamente
        mais tarde.
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

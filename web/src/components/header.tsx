import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    onClick: () => void;
}

export function Header({onClick}: HeaderProps) {
    const navigate = useNavigate();
   const signOut = async () => {
       localStorage.removeItem("token");
       navigate("/");
   }
   
    return (
        <header className="w-full p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="font-bold text-white">Users</h1>

          <div className="flex items-center gap-3">
              <Button onClick={onClick}>
                  Adicionar
              </Button>
              <Button onClick={signOut}>
                  Sair
              </Button>
          </div>
        </header>
    )
}
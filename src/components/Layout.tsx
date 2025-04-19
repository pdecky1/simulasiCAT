
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    toast.success("Anda berhasil keluar dari sistem");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

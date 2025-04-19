
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div>
                <h1 className="text-xl font-bold text-[#002EC1]">Simulasi CAT PNS</h1>
                <p className="text-xs text-[#002EC1]">Sistem Ujian Berbasis Komputer</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 text-[#333333] ">
            <Link to="/" className="hover:text-[#002EC1]/80 transition-colors">Beranda</Link>
            <Link to="/panduan" className="hover:text-[#002EC1]/80 transition-colors">Panduan</Link>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-[#002EC1]  hover:bg-[#002EC1]/80 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    Akun Saya
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profil" className="cursor-pointer">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/riwayat" className="cursor-pointer">Riwayat Ujian</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost" className="text-[#333] hover:text-white hover:bg-[#002EC1]">
                  <Link to="/login">Masuk</Link>
                </Button>
                <Button asChild variant="outline" className="bg-[#002EC1] text-white rounded-full px-8">
                  <Link to="/register">Daftar Sekarang</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="text-[#002EC1] hover:bg-[#002EC1] hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#002EC1] border-t border-catpns-secondary pb-4 px-4">
          <div className="flex flex-col space-y-2 pt-2">
            <Link to="/" className="px-3 py-2 rounded hover:bg-[#002EC1]/80">Beranda</Link>
            <Link to="/panduan" className="px-3 py-2 rounded hover:bg-[#002EC1]/80">Panduan</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profil" className="px-3 py-2 rounded hover:bg-[#002EC1]/80">Profil</Link>
                <Link to="/riwayat" className="px-3 py-2 rounded hover:bg-[#002EC1]/80">Riwayat Ujian</Link>
                <button 
                  onClick={onLogout}
                  className="px-3 py-2 rounded text-left text-red-300 hover:bg-[#002EC1]/80 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button asChild variant="ghost" className="justify-start text-white hover:bg-catpns-secondary">
                  <Link to="/login">Masuk</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start bg-white text-catpns-primary hover:bg-catpns-lighter">
                  <Link to="/register">Daftar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

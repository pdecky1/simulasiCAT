
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#002EC1] text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Simulasi CAT PNS</h3>
            <p className="text-sm text-catpns-lighter">
              Sistem simulasi ujian berbasis komputer untuk persiapan seleksi CPNS, 
              PPPK, Sekolah Kedinasan, dan Ujian Dinas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-catpns-lighter transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/panduan" className="hover:text-catpns-lighter transition-colors">Panduan</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@simulasicat.go.id</li>
              <li>Telepon: (021) 1234567</li>
              <li>Jl. Letjen Sutoyo No.12, Jakarta Timur</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-catpns-secondary mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} Simulasi CAT PNS. Hak Cipta Dilindungi.</p>
          <p className="text-catpns-lighter mt-2">
            Sistem ini dibuat untuk tujuan simulasi dan pembelajaran.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

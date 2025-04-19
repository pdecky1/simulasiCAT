
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (formData.nik.length !== 16) {
      toast.error("NIK harus terdiri dari 16 digit");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Pendaftaran berhasil! Silakan login dengan akun baru Anda");
      navigate("/login");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4 flex justify-center items-center">
        <Card className="w-full md:w-3/4 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#020817]">
              Daftar Akun
            </CardTitle>
            <CardDescription className="text-center">
              Buat akun baru untuk mengikuti simulasi ujian CAT PNS
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nik">NIK</Label>
                <Input
                  id="nik"
                  name="nik"
                  type="text"
                  pattern="[0-9]*"
                  maxLength={16}
                  placeholder="Masukkan 16 digit NIK"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Buat username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Buat password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-[#020817] focus:ring-catpns-primary"
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                Saya menyetujui <Link to="/terms" className="text-[#020817] hover:underline">syarat dan ketentuan</Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full md:w-1/2 bg-[#002EC1] hover:bg-[#002EC1]/80"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>

            <div className="text-center text-sm">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-[#020817] hover:underline">
                Masuk di sini
              </Link>
            </div>
          </CardFooter>

          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;

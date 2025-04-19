
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation - in a real app, this would be server-side
      if (username === "admin" && password === "password") {
        // Store user info
        const user = {
          id: "1",
          name: "Peserta Ujian",
          username: "admin",
          email: "admin@example.com",
          nik: "1234567890123456",
        };
        
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        
        toast.success("Login berhasil!");
        navigate("/");
      } else {
        toast.error("Username atau password salah");
      }
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#020817]">
              Masuk ke Akun
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan username dan password Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#020817] hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-[#020817] focus:ring-catpns-primary"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Ingat saya
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-[#002EC1] hover:bg-[#002EC1]/80"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
              <div className="text-center text-sm">
                Belum memiliki akun?{" "}
                <Link to="/register" className="text-[#020817] hover:underline">
                  Daftar di sini
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;

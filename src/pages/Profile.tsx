
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Save } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", null);
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    nik: user?.nik || "",
    password: "password", // Default password for simulation
    newPassword: "",
    confirmPassword: "",
  });

  // Redirect if not logged in
  if (!isLoggedIn || !user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      nik: formData.nik,
    };
    
    setUser(updatedUser);
    setIsEditing(false);
    toast.success("Profil berhasil diperbarui");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password baru dan konfirmasi password tidak cocok");
      return;
    }
    
    // In a real app, we would send this to the server
    toast.success("Password berhasil diubah");
    
    // Reset password fields
    setFormData((prev) => ({
      ...prev,
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-[#020817]">Profil Saya</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Informasi Pribadi</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
            </TabsList>
            
            {/* Profile Information Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                  <CardDescription>
                    Kelola detail informasi pribadi Anda
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nik">NIK</Label>
                      <Input
                        id="nik"
                        name="nik"
                        value={formData.nik}
                        onChange={handleChange}
                        disabled={!isEditing}
                        maxLength={16}
                      />
                      {isEditing && (
                        <p className="text-xs text-gray-500">
                          NIK terdiri dari 16 digit angka sesuai KTP Anda
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        value={user.username}
                        disabled
                      />
                      <p className="text-xs text-gray-500">
                        Username tidak dapat diubah
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Batal
                        </Button>
                        <Button type="submit" className="bg-[#002EC1] hover:bg-[#002EC1]/80">
                          <Save className="mr-2 h-4 w-4" />
                          Simpan Perubahan
                        </Button>
                      </>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={() => setIsEditing(true)}
                        className="ml-auto bg-[#002EC1] hover:bg-[#002EC1]/80"
                      >
                        Edit Profil
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Keamanan</CardTitle>
                  <CardDescription>
                    Kelola password dan pengaturan keamanan akun Anda
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password Saat Ini</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Password Baru</Label>
                      <Input
                        id="new-password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="ml-auto bg-[#002EC1] hover:bg-[#002EC1]/80"
                    >
                      Ubah Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-red-600">Hapus Akun</CardTitle>
                  <CardDescription>
                    Tindakan yang tidak dapat dibatalkan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Hapus Akun</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Semua data akun Anda akan dihapus secara permanen dari sistem kami.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("isLoggedIn");
                            toast.success("Akun Anda telah dihapus");
                            navigate("/");
                          }}
                        >
                          Hapus Akun
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

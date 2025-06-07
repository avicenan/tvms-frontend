import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { InvestigatorType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { UserCog, QrCode, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { userApi } from "@/lib/api";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nama harus diisi minimal 2 karakter.",
    }),
    nip: z.string().min(1, {
      message: "NIP harus diisi minimal 18 karakter.",
    }),
    email: z.string().email({
      message: "Email tidak valid.",
    }),
    role: z.string(),
    password: z
      .string()
      .min(6, {
        message: "Kata sandi harus diisi minimal 6 karakter.",
      })
      .optional(),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Kata sandi harus diisi minimal 6 karakter.",
      })
      .optional(),
    is_2fa_enabled: z.number(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Kata sandi tidak cocok",
      path: ["confirmPassword"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function UserDialog({ userId }: { userId: number }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<InvestigatorType>({} as InvestigatorType);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nip: "",
      email: "",
      role: "",
      is_2fa_enabled: 0,
      password: "",
      confirmPassword: "",
    },
  });

  const isDirty = form.formState.isDirty;

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      try {
        setIsLoading(true);
        const response = await userApi.getUserById(userId);
        const userData = response.data.data;
        setUserData(userData);
        form.reset({
          name: userData.name,
          nip: userData.nip,
          email: userData.email,
          role: userData.role,
          is_2fa_enabled: userData.is_2fa_enabled,
          password: "",
          confirmPassword: "",
        });
      } catch (error: any) {
        toast.error("Gagal memuat data pengguna");
      } finally {
        setIsLoading(false);
      }
    }
    setOpen(open);
  };

  const handleReset2FA = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.reset2FA(userId);
      setOpen(false);
      toast.success("Berhasil menonaktifkan 2FA", {
        description: response.data.message,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat mereset 2FA");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await userApi.deleteUser(userId);
      toast.success("Akun berhasil dihapus", {
        description: response.data.message,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat menghapus akun");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      const response = await userApi.updateUser(userId, {
        name: data.name,
        password: data.password!,
        email: userData.email,
        nip: userData.nip,
      });
      toast.success("Pengguna berhasil diperbarui", {
        description: response.data.message,
      });
      setOpen(false);
    } catch (error: any) {
      toast.error("Terjadi kesalahan saat memperbarui pengguna", {
        description: error.response?.data?.message,
      });
    } finally {
      setIsLoading(false);
      form.reset({
        password: "",
        confirmPassword: "",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="sm" className="cursor-pointer">
          <UserCog className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-4">
          <DialogTitle>Pengaturan Akun</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-h-[70vh] overflow-y-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Masukkan kata sandi baru" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Konfirmasi kata sandi baru" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_2fa_enabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status 2FA</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ? "Aktif" : "Tidak Aktif"} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant={"outline"} disabled={isLoading} className="cursor-pointer bg-red-200 border-red-500 text-red-800 hover:bg-red-500 hover:text-white" onClick={handleDeleteUser}>
                <Trash className="h-4 w-4" />
                Hapus Akun
              </Button>
              {userData.is_2fa_enabled === 1 && (
                <Button type="button" variant={"outline"} disabled={isLoading} className="cursor-pointer" onClick={handleReset2FA}>
                  <QrCode className="h-4 w-4" />
                  Reset 2FA
                </Button>
              )}
              <Button type="submit" disabled={isLoading || !isDirty} className="cursor-pointer">
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

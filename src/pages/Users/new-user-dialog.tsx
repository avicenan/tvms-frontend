import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { userApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nama harus diisi minimal 2 karakter.",
    }),
    email: z.string().email({
      message: "Email tidak valid.",
    }),
    nip: z
      .string()
      .min(18, {
        message: "NIP harus diisi 18 karakter.",
      })
      .max(18, {
        message: "NIP harus diisi 18 karakter.",
      }),
    password: z.string().min(6, {
      message: "Kata sandi harus diisi minimal 6 karakter.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Kata sandi harus diisi minimal 6 karakter.",
    }),
    role: z.enum(["admin", "polisi"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function NewUserDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      nip: "",
      role: "polisi",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      setIsLoading(true);
      const { confirmPassword, ...submitData } = data;
      await userApi.createUser(submitData);
      toast.success("Pengguna berhasil ditambahkan.", {
        description: `
        Email: ${data.email} |
        NIP: ${data.nip} `,
      });
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat menambahkan pengguna.", {
        description: `
        Email: ${data.email} |
        NIP: ${data.nip} `,
      });
    } finally {
      setIsLoading(false);
      navigate("/d/users");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 cursor-pointer">
          <UserPlus className="h-4 w-4" /> Tambah
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Akun</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NIP" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih peran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="polisi">Polisi</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Masukkan email" {...field} />
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
                    <Input type="password" placeholder="Masukkan password" {...field} />
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
                    <Input type="password" placeholder="Konfirmasi password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API} from "@/lib/api.ts";

const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(6).max(100),
});

export function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const response = await API.post("/login", {
                email: values.email,
                password: values.password
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-full">
            <div className="mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                          className="space-y-2 max-w-lg mx-auto bg-zinc-800 shadow-md p-4 rounded-md">
                        <FormField control={form.control} name="email"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel className="text-white">Email</FormLabel>
                                           <FormControl>
                                               <Input placeholder="Digite seu email" {...field} />
                                           </FormControl>
                                       </FormItem>
                                   )}
                        />

                        <FormField control={form.control} name="password"
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel className="text-white">Senha</FormLabel>
                                           <FormControl>
                                               <Input placeholder="Digite sua senha" type="password" {...field} />
                                           </FormControl>
                                       </FormItem>
                                   )}
                        />

                        <Button className="w-full" type="submit">
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

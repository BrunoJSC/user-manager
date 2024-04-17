import {useForm} from "react-hook-form";
import {z} from "zod";
import {API} from "@/lib/api.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

const formSchema = z.object({
    name: z.string(),
    email: z.string().email().min(2).max(50),
    password: z.string()
})

export function FormComponent() {
   const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    async function handleSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const response = await API.post("/users", {
                name: values.name,
                email: values.email,
                password: values.password
            });

            console.log(response.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                <FormField control={form.control} name="name"
                           render={({field}) => (
                               <FormItem>
                                   <FormLabel className="text-white">Nome</FormLabel>
                                   <FormControl>
                                       <Input placeholder="Digite seu nome" {...field} />
                                   </FormControl>
                               </FormItem>
                           )}
                />

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

                <Button className="w-full mt-10" type="submit">{loading ? "Adicionando" : "Adicionar"}</Button>
            </form>
        </Form>
    )
}
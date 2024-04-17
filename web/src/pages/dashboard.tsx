import {useEffect, useState} from "react";
import {API} from "@/lib/api.ts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button.tsx";
import {Header} from "@/components/header.tsx";
import Modal from "react-modal";
import {FormComponent} from "@/components/form.tsx";

interface UsersProps {
    id: string;
    name: string;
    email: string;
    password: string;
}

export function Dashboard() {
    const [users, setUsers] = useState<UsersProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    function handleOpenModal() {
        setModalIsOpen(true);
    }
    
    function handleCloseModal() {
        setModalIsOpen(false);
    }
    
    const deleteUser = async (id: string) => {
        setLoading(true);
        if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
            try {
                await API.delete(`/users/${id}`);
                setUsers(users.filter((user) => user.id !== id));
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.get("/users");

            setUsers(response.data);
        }

        fetchData();
    }, [users]);

    return (
        <>
            <Header onClick={handleOpenModal} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Adicionar Tarefa"
                style={{
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "900px",
                        width: "100%",
                        padding: "2rem",
                        borderRadius: "8px",
                        background: "black"
                    },
                }}

            >
                <FormComponent />
            </Modal>
            <Table className="max-w-screen-lg mx-auto mt-10">
                <TableCaption>Lista de usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>

                            <TableCell className="font-medium text-white">{user.name}</TableCell>
                            <TableCell className="font-medium text-white">{user.email}</TableCell>
                            <TableCell>
                                <Button variant="destructive" onClick={() => deleteUser(user.id)}>
                                    {loading ? "Deletando" : "deletar"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
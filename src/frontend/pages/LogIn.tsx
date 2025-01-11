import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import signInUser from "../services/signInUser";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "../components/ui/alert";

const LogInPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email("Not a valid email"),
        password: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { email, password } = values;

        const response = await signInUser({ email, password });

        if(response.error){
            setIsError(true);
            setMessage(response.error);
        } else {
            setIsError(false);
            setMessage("Success! Redirecting...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }

        setShowMessage(true);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-88px)]">
            <div className="flex-col bg-gray-100 w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/2 xl:w-1/3 h-fit flex items-center justify-center rounded-lg shadow-lg p-12">
                <div className="text-2xl pb-4 text-primary">
                    Log In
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ex. john_doe@gmail.com"
                                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                            {...field}
                                        />
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="flex relative items-center justify-center">
                                            <Input
                                                type={`${isPasswordVisible ? "" : "password"}`}
                                                placeholder="● ● ● ● ● ● ● ●"
                                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                                {...field}
                                            />
                                            <div className="absolute right-2 scale-125">
                                                <button type="button" onClick={togglePasswordVisibility} className="flex justify-center items-center">
                                                    {
                                                        isPasswordVisible ? (
                                                            <IoMdEyeOff />
                                                        ) : (
                                                            <IoMdEye />
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            showMessage ? (
                                <Alert className={`bg-green-100 border-green-400 text-green-700 text-center ${isError ? "bg-red-100 border-red-400 text-red-700" : ""}`}>
                                    <AlertTitle>{message}</AlertTitle>
                                </Alert>
                            ) : null
                        }

                        <Button type="submit">Log In</Button>
                    </form>
                </Form>
            </div>
            <div className="flex space-x-2 mt-4">
                <div>
                    Don't have an account?
                </div>
                <a href="/sign_up" className="text-primary">Sign Up</a>
            </div>
        </div>
    );
}

export default LogInPage;

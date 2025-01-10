import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { Author } from "../../types/story";
import createNewUser from "../services/createNewUser";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const SignUpPage = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const formSchema = z.object({
        pen_name: z.string().min(5, {
            message: "Must be 5 or more characters"
        }).max(30, {
            message: "Must be 30 or less characters"
        }),
        email: z.string().email("Not a valid email"),
        password: z.string().min(8, {
            message: "Must be 8 or more characters"
        }).max(20, "Must not exceed 20 characters")
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        ,
        confirm_password: z.string()
    }).superRefine(({ password, confirm_password }, ctx) => {
        if (password !== confirm_password) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["confirm_password"]
            })
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pen_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    });

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(isPasswordVisible => !isPasswordVisible)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const { pen_name, email, password } = values;
        
        const sign_up_info: Author = {
            pen_name,
            email,
            password
        }
        const response = await createNewUser(sign_up_info);

        if (response.error) {
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
            return;
        }

        setShowErrorMessage(false);
        setShowSuccessMessage(true);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-88px)]">
            <div className="flex-col bg-gray-100 w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/2 xl:w-1/3 h-fit flex items-center justify-center rounded-lg shadow-lg p-12">
                <div className="text-2xl pb-4 text-primary">
                    Sign Up
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
                        <FormField
                            control={form.control}
                            name="pen_name"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Pen Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ex. John Doe"
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

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type={`${isPasswordVisible ? "" : "password"}`}
                                            placeholder="● ● ● ● ● ● ● ●"
                                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        {
                            showSuccessMessage ? (
                                <Alert className="bg-green-100 border-green-400 text-green-700 text-center space-y-2">
                                    <AlertTitle className="font-extrabold text-lg">Success!</AlertTitle>
                                    <AlertDescription>
                                        Check your email to verify your account!
                                    </AlertDescription>
                                </Alert>
                            ) : null
                        }
                        {
                            showErrorMessage ? (
                                <Alert className="bg-green-100 border-red-400 text-red-700 text-center space-y-2">
                                    <AlertTitle className="font-extrabold text-lg">Error</AlertTitle>
                                    <AlertDescription>
                                        Failed to create new user. Please try again.
                                    </AlertDescription>
                                </Alert>
                            ) : null
                        }
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="flex space-x-2 mt-4">
                <div>
                    Already have an account?
                </div>
                <a href="/log_in" className="text-primary">Log In</a>
            </div>
        </div>
    );
}

export default SignUpPage;

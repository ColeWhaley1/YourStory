import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";

const SignUpPage = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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

    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-88px)]">
            <div className="bg-gray-100 w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/2 xl:w-1/3 h-fit flex items-center justify-center rounded-lg shadow-lg">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(() => { })} className="space-y-8 w-4/5">
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
                                                placeholder="● ● ● ● ● ● ● ● ● ● ● ● ● ●"
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
                                            placeholder="● ● ● ● ● ● ● ● ● ● ● ● ● ●"
                                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />


                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
            <div className="flex space-x-2 mt-2">
                <div>
                    Already have an account?
                </div>
                <a href="/log_in">Log In</a>
            </div>
        </div>
    );
}

export default SignUpPage;

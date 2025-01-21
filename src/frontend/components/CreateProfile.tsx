import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

interface CreateProfileProps {
    setShowCreateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}


const CreateProfile: React.FC<CreateProfileProps> = ({ setShowCreateProfile }) => {


    const formSchema = z.object({
        pen_name: z.string()
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pen_name: "Anonymous"
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setShowCreateProfile(false);
        // may need to re-fetch author

    }

    return (
        <div className="px-12 py-2">
            <div className="bg-stone-50 p-16 rounded-lg min-h-[680px] flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
                        <FormField
                            control={form.control}
                            name="pen_name"
                            render={({ field }) => (

                                <FormItem>
                                    <div className="w-full flex justify-center">
                                        <FormLabel className="text-2xl pb-4">Pen Name</FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className="w-full flex justify-center">
                                            <Input
                                                placeholder="Anonymous"
                                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                                {...field}
                                                className="h-16 text-2xl text-center"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <Button type="submit">Create</Button>
                    </form>
                </Form>

            </div>
        </div>
    );
}

export default CreateProfile;
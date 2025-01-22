import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import ProfileAvatar from "./ProfileAvatar";

interface CreateProfileProps {
    setShowCreateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ setShowCreateProfile }) => {

    const [ avatarLocalFile, setAvatarLocalFile ] = useState<File | null>(null);
    const [ avatarUrl, setAvatarUrl ] = useState<string | null>(null);

    const avatarFileTypes: string[] = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/svg+xml',
    ];
    
    const formSchema = z.object({
        penName: z.string().max(30, {
            message: "Max of 30 characters!"
        }),
        avatarFile: z.instanceof(File).nullable(),
    });
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            penName: "",
            avatarFile: null,
        },
    });
    
    useEffect(() => {
        form.setValue("avatarFile", avatarLocalFile);

        if(avatarLocalFile instanceof File) {
            const url = URL.createObjectURL(avatarLocalFile);
            setAvatarUrl(url);
        }

    }, [avatarLocalFile]);
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setShowCreateProfile(false);
        // may need to re-fetch author

    }

    return (
        <div className="px-12 py-2">
            <div className="bg-stone-50 p-16 rounded-lg min-h-[85vh] flex justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
                        <FormField
                            control={form.control}
                            name="penName"
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
                        <div className="w-full flex items-center justify-center space-x-8">
                            <FileUpload fileTypes={avatarFileTypes} message={'Drop or select a profile image!'} setFile={setAvatarLocalFile}/>
                            <div className="w-1/3">
                                <ProfileAvatar avatarUrl={avatarUrl}/>
                            </div>
                        </div>
                        <Button type="submit">Create</Button>
                    </form>
                </Form>

            </div>
        </div>
    );
}

export default CreateProfile;
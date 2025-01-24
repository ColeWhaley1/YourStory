import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import ProfileAvatar from "./ProfileAvatar";
import uploadFileToStorage from "../services/uploadFileToStorage";
import { Textarea } from "./ui/textarea";
import HintBox from "./HintBox";
import createNewAuthor from "../services/createNewAuthor";
import getUserSession, { UserSessionResponse } from "../services/getUserSession";
import deleteFileFromStorage from "../services/deleteFileFromStorage";

interface CreateProfileProps {
    setShowCreateProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ setShowCreateProfile }) => {

    const [avatarLocalFile, setAvatarLocalFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [showHint, setShowHint] = useState<boolean>(true);

    const avatarFileTypes: string[] = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/svg',
    ];

    const formSchema = z.object({
        penName: z.string().max(30, {
            message: "Max of 30 characters!"
        }),
        avatarFile: z.instanceof(File).nullable(),
        bio: z.string().max(1000, {
            message: "Max of 1000 characters!"
        })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            penName: "",
            avatarFile: null,
            bio: "",
        },
    });

    useEffect(() => {
        form.setValue("avatarFile", avatarLocalFile);

        if (avatarLocalFile instanceof File) {
            const url = URL.createObjectURL(avatarLocalFile);
            setAvatarUrl(url);
        }

    }, [avatarLocalFile]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let avatarLink = null;

        try {

            const sessionResponse: UserSessionResponse = await getUserSession();

            if (sessionResponse.error) {
                throw new Error("can't get session");
            }

            const id = sessionResponse?.session?.user.id;
            const email = sessionResponse?.session?.user.email;

            if (!id || !email) {
                throw new Error("id or email missing");
            }

            if (values.avatarFile) {
                const avatarResponse = await uploadFileToStorage(values.avatarFile, "avatar");
                avatarLink = avatarResponse.link;
                const avatarUploadError = avatarResponse.error;

                if (avatarUploadError) {
                    throw new Error("avatar upload error");
                }
            }

            const newAuthorResponse = await createNewAuthor(id, email, values.bio, values.penName, avatarLink);

            if (newAuthorResponse.error) {
                throw new Error("new author creation error");
            }

            setShowCreateProfile(false);
            location.reload();
        } catch (error) {
            form.setError("avatarFile", {
                type: "manual",
                message: "There was a problem uploading your profile picture."
            });
            // consider deleting avatar file if exists upon error
        }

    }

    const hintBoxMessage = "Let's start by creating a profile. Be as anonymous as you'd like!";

    return (
        <div className="relative">
            {showHint && (
                <HintBox message={hintBoxMessage} header="Welcome to your profile page! 🎉" setShowHint={setShowHint} />
            )}
            <div className={`px-12 py-2 ${showHint && 'blur-sm'}`}>
                <div className="bg-stone-50 p-16 rounded-lg min-h-[85vh] flex justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3">
                            <FormField
                                control={form.control}
                                name="penName"
                                render={({ field }) => (

                                    <FormItem className="space-y-4">
                                        <div className="w-full">
                                            <FormLabel className="text-xl bg-primary p-1 px-2 rounded-lg text-white">Pen Name</FormLabel>
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
                                <FileUpload fileTypes={avatarFileTypes} message={'Drop or select a profile image!'} setFile={setAvatarLocalFile} />
                                <div className="w-1/3">
                                    <ProfileAvatar avatarUrl={avatarUrl} />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (

                                    <FormItem className="space-y-4">
                                        <div className="w-full">
                                            <FormLabel className="text-xl bg-primary p-1 px-2 rounded-lg text-white">Bio</FormLabel>
                                        </div>
                                        <FormControl>
                                            <div className="w-full flex justify-center">
                                                <Textarea
                                                    placeholder="e.g. I am a passionate story teller interested in historical fiction..."
                                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); } }}
                                                    {...field}
                                                    className="min-h-52 text-md"
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
        </div>
    );
}

export default CreateProfile;
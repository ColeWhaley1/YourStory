import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useState } from "react";
import ImageFileUpload from "./ImageFileUpload";
import Lottie from "lottie-react";
import Loading from "../assets/lottie_animations/loading.json";
import { FaCircleXmark } from "react-icons/fa6";

const NewStoryForm = ({ storyFile }: { storyFile: File | null }) => {

    const [fileError, setFileError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imagePreviewLoading, setImagePreviewLoading] = useState<boolean>(false);

    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }).max(50, {
            message: "Max 50 characters",
        }),
        genre: z.string(),
        description: z.string().min(2, {
            message: "Description must be at least 2 characters"
        }).max(300, {
            message: "Max 300 characters"
        }),
        cover: z.instanceof(File, {
            message: "You must upload a cover image."
        }).refine(file => file.type.startsWith("image/"), {
            message: "Cover image must be an image file.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            genre: "",
            description: "",
            cover: undefined,
        },
    });

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setImagePreviewLoading(true);
            setImagePreview(URL.createObjectURL(file));
            form.setValue("cover", file);
        }
    };

    function onSubmit(values: z.infer<typeof formSchema>) {

        if (!storyFile) {
            setFileError("You forgot the most important part! Upload your story first!");
            return;
        }

        setFileError(null);

        console.log({
            ...values,
            storyFile: storyFile
        });
    }

    useEffect(() => {
        if (storyFile) {
            setFileError(null);
        }
    }, [storyFile]);

    const deleteImage = () => {
        setImagePreview(null);

        // The only way I know to set cover to null without allowing cover file to be null on submit is by ignoring this type error
        // @ts-expect-error
        form.setValue("cover", null);

    }

    const onImagePreviewLoad = () => {
        setImagePreviewLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (

                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="ex. The Green Tree" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                                <Input placeholder="ex. Fiction" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Choose up to 3 categories so others can find your story.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="w-full" placeholder="ex. A tale of a large tree that was very green." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {imagePreview ? (
                    <div className="mt-4">

                        {imagePreviewLoading &&
                            <div className="max-w-24">
                                <Lottie animationData={Loading} />
                            </div>
                        }
                        {
                            !imagePreviewLoading && (
                                <button onClick={deleteImage} className="absolute z-10 m-2 flex items-center justify-center opacity-80 hover:opacity-90">
                                    <div className="w-6">
                                        <FaCircleXmark className="w-full h-full text-red-700" />
                                    </div>
                                </button>
                            )
                        }
                        <img src={imagePreview} alt="Cover Image Preview" className="max-w-52 object-cover rounded-md" onLoad={onImagePreviewLoad} />
                    </div>
                ) : (
                    <FormField
                        control={form.control}
                        name="cover"
                        render={() => (
                            <FormItem>
                                <FormLabel htmlFor="cover-image">Cover Image</FormLabel>
                                <FormControl>
                                    <ImageFileUpload
                                        id="cover-image"
                                        setImageFile={(file) => {
                                            handleImageUpload(file);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                )}
                {
                    fileError && (
                        <div className="text-red-500">{fileError}</div>
                    )
                }
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default NewStoryForm;
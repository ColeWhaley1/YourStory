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
import { useState } from "react";
import ImageFileUpload from "./ImageFileUpload";

const NewStoryForm = ({ storyFile }: { storyFile: File | null }) => {

    const [fileError, setFileError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

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
        cover: z.instanceof(File).refine(file => file.type.startsWith("image/"), {
            message: "Cover image must be an image file.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            genre: "",
            description: "",
            cover: undefined
        },
    });

    const handleImageUpload = (file: File | null) => {
        if (file) {
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
                <FormField 
                    control={form.control} 
                    name="cover" 
                    render={() => (
                    <FormItem>
                        <FormLabel>Cover Image</FormLabel>
                        <FormControl>
                            <ImageFileUpload setImageFile={(file) => {
                                handleImageUpload(file);
                            }}/>
                        </FormControl>
                        <FormMessage />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        )}
                    </FormItem>
                )} />
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
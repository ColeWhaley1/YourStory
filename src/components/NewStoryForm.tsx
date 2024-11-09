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
import { StoryUpload } from "../types/story";
import RemovableLabel from "./widgets/RemovableLabel";

const NewStoryForm = ({ storyFile }: { storyFile: File | null }) => {

    const [fileError, setFileError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imagePreviewLoading, setImagePreviewLoading] = useState<boolean>(false);
    const [genreInput, setGenreInput] = useState<string | null>("");
    const [genres, setGenres] = useState<string[]>([]);

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


        // 1. upload story and image to file storage, return links to both

        // 2. call service to add new story row by passing in Story obj as param

        const story: StoryUpload = {
            author_id: "YduoBnw4BAKAyEVyTvTL",
            description: values.description,
            story_file: "link_to_story",
            cover: "link_to_cover",
            title: values.title,
            genres: genres
        }
        console.log(story);
        
        // 3. display success animation

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

    const addGenre = () => {
        if(genres.length >= 3){
            form.setError("genre",
                {
                    type: "manual",
                    message: "Max of 3 genres"
                }
            )
            return;
        }

        if(genreInput){
            setGenres(prevGenres => [...prevGenres, genreInput]);
            form.setValue("genre", genreInput);
            form.clearErrors("genre");
            form.setValue("genre", "");
        }

        setGenreInput("");
    }

    const removeGenre = (index: number): void => {

        const newGenres = genres.filter((_, i) => i !== index);
        setGenres(newGenres);

        if(genres.length <= 3){
            form.clearErrors("genre");
        }

        console.log(newGenres);
        console.log(genres);
    }

    const onKeyDownGenre = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addGenre();
        }
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
                                <Input 
                                    placeholder="ex. The Green Tree" 
                                    onKeyDown={(e) => {if(e.key === "Enter") { e.preventDefault(); }}}
                                    {...field}
                                />
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
                            <FormLabel>Genres</FormLabel>
                            {
                                genres.length > 0 && (
                                    <div className="flex flex-row space-x-2">
                                        {
                                            genres.map((genre, index) => {
                                                return (
                                                    <div key={index}>
                                                        <RemovableLabel removeElement={() => removeGenre(index)}>{genre}</RemovableLabel>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) 
                            }
                            <div className="flex space-x-6">
                                <FormControl>
                                    <Input 
                                        id="genre-input"
                                        placeholder="ex. Fiction"
                                        {...field} 
                                        onChange={(e) => {
                                            field.onChange(e); 
                                            setGenreInput(e.target.value); 
                                        }}
                                        onKeyDown={onKeyDownGenre}
                                    />
                                </FormControl>
                                <div className="flex justify-center items-center">
                                    <Button onClick={addGenre} type="button">
                                        Add
                                    </Button>
                                </div>
                            </div>
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
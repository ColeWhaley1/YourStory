import supabase from "../supabase";

const deleteFileFromStorage = async (filepath: string, bucket: string) => {
    try {

        const publicUrlBase = "https://ukkarufgugovsopasjud.supabase.co/storage/v1/object/public/";
        if (filepath.startsWith(publicUrlBase)) {
            filepath = filepath.replace(publicUrlBase, "");
        }

        const { error } = await supabase
            .storage
            .from(bucket)
            .remove([filepath]);

        if (error) {
            throw new Error(error.message);
        }

    } catch (error: any) {
        console.error(error.message);
    }
}

export default deleteFileFromStorage;
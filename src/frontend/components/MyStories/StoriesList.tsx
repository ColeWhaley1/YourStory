import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getUserSession from "../../services/getUserSession";
import getSessionId from "../../services/getSessionId";

const StoriesList = () => {

  const [stories, setStories] = useState<Story[] | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const idResponse = await getSessionId();

      if(idResponse.error || !idResponse.id){
        throw new Error("Could not fetch session.");
      }

      const id: string  = idResponse.id;
      
      const storiesResponse = await getStories(id);

      if(storiesResponse.error){
        throw new Error("Could not get your stories!");
      }

      setStories(storiesResponse.stories);
    }

    fetchStories();
  }, []);

  return (
    <div>ListStories</div>
  )
}

export default StoriesList
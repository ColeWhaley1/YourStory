import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getSessionId from "../../services/getSessionId";
import getStories from "../../services/getStories";
import Loading from "../Loading";

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

      console.log(storiesResponse)

      if(storiesResponse.error){
        throw new Error("Could not get your stories!");
      }

      setStories(storiesResponse.stories);
    }

    fetchStories();
  }, []);

  if (!stories || stories.length == 0){
    return (
      <Loading/>
    )
  }

  return (
    <div>{stories[0].title}</div>
  )
}

export default StoriesList
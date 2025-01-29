import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getSessionId from "../../services/getSessionId";
import getStories from "../../services/getStories";
import Loading from "../Loading";
import StoryBullet from "./StoryBullet";

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

  if (!stories || stories.length == 0){
    return (
      <Loading/>
    )
  }

  return (
    <div className="flex-col space-y-4">
        {stories.map((story) => {
          return (
              <div key={story.id} className="w-full">
                  <StoryBullet id={story.id} title={story.title} cover={story.cover} genres={story.genres}/>
              </div>
          )
        })}
    </div>
  )
}

export default StoriesList
import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getSessionId from "../../services/getSessionId";
import getStories from "../../services/getStories";
import Loading from "../Loading";
import StoryBullet from "./StoryBullet";
import PaginationDots from "../widgets/PaginationDots";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const StoriesList = () => {

  const [stories, setStories] = useState<Story[] | null>(null);
  const maxStoriesPerPage: number = 3;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const storiesLength: number = !stories ? 0 : stories.length;
  const totalPages: number = Math.ceil(storiesLength / 3);

  const pageStories = stories?.slice(currentPage * maxStoriesPerPage, currentPage * maxStoriesPerPage + 3) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const decrementPage = () => {
    if(currentPage == 0){
      return;
    }
    setCurrentPage((curr) => curr-1);
  }

  const incrementPage = () => {
    if(currentPage == totalPages-1){
      return
    }
    setCurrentPage((curr) => curr+1);
  }

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
      <div className="p-8 rounded-lg h-[85vh]">
        <div className="flex items-center">
          <button className="pr-8" onClick={decrementPage}><FaArrowLeft /></button>
          <div className="flex-col space-y-4">
              {pageStories.map((story) => {
                return (
                    <div key={story.id} className="w-full">
                        <StoryBullet id={story.id} title={story.title} cover={story.cover} genres={story.genres}/>
                    </div>
                )
              })}
          </div>
          <button className="pl-8" onClick={incrementPage}><FaArrowRight /></button>
        </div>
        <div className="w-full flex items-center justify-center p-6">
          <PaginationDots currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
      </div>
  )
}

export default StoriesList
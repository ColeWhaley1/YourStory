import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getSessionId from "../../services/getSessionId";
import getStories from "../../services/getStories";
import Loading from "../Loading";
import StoryBullet from "./StoryBullet";
import PaginationDots from "../widgets/PaginationDots";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import StoryFilterDropdown from "../widgets/Dropdown";
import { PiSmileySad } from "react-icons/pi";
import { motion } from "framer-motion";

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
    if (currentPage == 0) {
      return;
    }
    setCurrentPage((curr) => curr - 1);
  }

  const incrementPage = () => {
    if (currentPage == totalPages - 1) {
      return
    }
    setCurrentPage((curr) => curr + 1);
  }

  useEffect(() => {
    const fetchStories = async () => {
      const idResponse = await getSessionId();

      if (idResponse.error || !idResponse.id) {
        throw new Error("Could not fetch session.");
      }

      const id: string = idResponse.id;

      const storiesResponse = await getStories(id);

      if (storiesResponse.error) {
        throw new Error("Could not get your stories!");
      }

      if (!storiesResponse.stories) {
        return;
      }

      const mostRecentStories = [...storiesResponse.stories]?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setStories(mostRecentStories);
    }

    fetchStories();
  }, []);

  useEffect(() => {
    if (!stories) {
      return;
    }

    stories.forEach((story) => {
      const img = new Image();
      img.src = story.cover;
    });

  }, [stories]);

  const filterMostRecent = () => {
    if (!stories) {
      return;
    }
    setStories([...stories]?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }

  const filterLeastRecent = () => {
    if (!stories) {
      return;
    }
    setStories([...stories]?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
  }

  const filterMostPopular = () => {
    if (!stories) {
      return;
    }

  }

  const filterLeastPopular = () => {
    if (!stories) {
      return;
    }

  }

  const handleSelection = (selection: string) => {

    if (!stories) {
      return;
    }

    switch (selection) {
      case "Most Recent":
        filterMostRecent();
        break;
      case "Least Recent":
        filterLeastRecent();
        break;
      case "Highest Rated":
        filterMostPopular();
        break;
      case "Lowest Rated":
        filterLeastPopular();
        break;
    }
  }

  if (stories === null) {
    return (
      <Loading />
    )
  }

  return (
    <div className="p-4 rounded-lg h-[86vh] flex flex-col justify-between bg-stone-50 shadow-md">
      <div className="flex items-center justify-center pb-2">
        <div className="flex-1">
          <StoryFilterDropdown name="Filter By" handleSelection={handleSelection} />
        </div>
        <h1 className="flex-1 font-bold">
          Your Stories
        </h1>
        <div className="p-3 bg-white rounded-full border h-8 flex items-center justify-center">
          Page {currentPage + 1}
        </div>
      </div>
      {
        stories.length === 0 ? (
          <motion.div 
          className="min-w-[600px] flex-1 flex items-center justify-center -translate-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center text-center space-y-6 bg-white border-4 border-dashed border-stone-400 p-8 rounded-xl shadow-lg">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [0, -5, 0], opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 8, duration: 0.6 }}
            >
              <PiSmileySad className="w-20 h-20 text-stone-500" />
            </motion.div>
    
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-stone-700">
                It's so empty. Let's fix that!
              </h2>
              <p className="text-stone-500">
                When you're ready, just click the button in the top right!
              </p>
            </div>
          </div>
        </motion.div>
        ) : (
          <div>
            <div className="flex items-center flex-grow">
              <button className="pr-8" onClick={decrementPage}>
                <FaArrowLeft />
              </button>
              <div className="flex-col space-y-4 flex-grow">
                {pageStories.map((story) => (
                  <div key={story.id} className="w-full">
                    <StoryBullet story={story} />
                  </div>
                ))}
              </div>
              <button className="pl-8" onClick={incrementPage}>
                <FaArrowRight />
              </button>
            </div >
            <div className="w-full flex items-center justify-center p-6">
              <PaginationDots currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        )
      }

    </div >
  );
}

export default StoriesList
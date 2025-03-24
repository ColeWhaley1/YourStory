import { useEffect, useState } from "react";
import { Story } from "../../../types/story";
import getSessionId from "../../services/getSessionId";
import getStories from "../../services/getStories";
import Loading from "../Loading";
import StoryBullet from "./StoryBullet";
import PaginationDots from "../widgets/PaginationDots";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import StoryFilterDropdown from "../widgets/Dropdown";
import { PiSmileySad } from "react-icons/pi";
import { motion } from "framer-motion";

const StoriesList = () => {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<String>("Most Recent");
  const maxStoriesPerPage: number = 3;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const storiesLength: number = stories?.length || 0;
  const totalPages: number = Math.ceil(storiesLength / maxStoriesPerPage);
  const pageStories = stories?.slice(currentPage * maxStoriesPerPage, (currentPage + 1) * maxStoriesPerPage) || [];
  

  const handlePageChange = (page: number) => setCurrentPage(page);
  const decrementPage = () => setCurrentPage((curr) => Math.max(0, curr - 1));
  const incrementPage = () => setCurrentPage((curr) => Math.min(totalPages - 1, curr + 1));

  useEffect(() => {
    const fetchStories = async () => {
      const idResponse = await getSessionId();
      if (idResponse.error || !idResponse.id) throw new Error("Could not fetch session.");
      const storiesResponse = await getStories(idResponse.id);
      if (storiesResponse.error || !storiesResponse.stories) return;
      setStories([...storiesResponse.stories].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        decrementPage();
      }
      if (event.key === "ArrowRight") {
        incrementPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPage, totalPages]);

  useEffect(() => {
    
    // sort stories based on filter
    
  }, [selectedFilter])

  const onSelect = (selection: string) => {
    setSelectedFilter(selection);
  }

  if (stories === null) return <Loading />;

  return (
    <div className="p-4 rounded-lg h-[86vh] flex flex-col bg-stone-50 shadow-md">
      <div className="flex items-center justify-between pb-4">
        <StoryFilterDropdown name="Filter By" onSelect={onSelect}/>
        <h1 className="font-bold">Your Stories</h1>
        <div className="p-3 bg-white rounded-full border h-8 flex items-center justify-center">
          Page {currentPage + 1}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        {stories.length === 0 ? (
          <motion.div 
            className="flex-1 flex items-center justify-center"
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
                <h2 className="text-xl font-semibold text-stone-700">It's so empty. Let's fix that!</h2>
                <p className="text-stone-500">When you're ready, just click the button in the top right!</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col flex-grow">
            <div className="flex-grow space-y-2">
              {pageStories.map((story) => (
                <StoryBullet key={story.id} story={story} />
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button onClick={decrementPage} disabled={currentPage === 0} className="p-2 disabled:opacity-50">
                <FaArrowLeft />
              </button>
              <PaginationDots currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              <button onClick={incrementPage} disabled={currentPage === totalPages - 1} className="p-2 disabled:opacity-50">
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesList;

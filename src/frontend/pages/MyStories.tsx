import PageSlider from "../components/PageSlider";
import UserStories from "../components/UserStories";
import NewStory from "./NewStory";

const MyStoriesPage = () => {

    return (
        <div className="h-[85vh]">
            <PageSlider>
                <UserStories/>
                <NewStory/>
            </PageSlider>
        </div>
    )
}

export default MyStoriesPage;


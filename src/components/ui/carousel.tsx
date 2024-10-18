import { StoryInfo } from "../../types/story"

interface carouselProps {
    title: string,
    stories: StoryInfo[]
}

const Carousel: React.FC<carouselProps> = ({title, stories}) => {
    return (
        <>
            <div className="m-10">
                <h1 className="text-3xl font-extrabold">
                    {title}
                </h1>
                <div className="carousel space-x-10">
                    {stories.map((item, _) => (
                        <div key={item.id} className="carousel-item max-w-xs">
                            <div>
                                <img src={item.img} alt={item.title} className="rounded-lg h-48 w-full" />
                                <h2 className="font-bold mt-3 ml-2">{item.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Carousel;
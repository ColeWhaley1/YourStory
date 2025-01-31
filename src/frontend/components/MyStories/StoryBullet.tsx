import React, { useState } from 'react';
import FillButton from '../widgets/FillButton';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import Rating from '../widgets/Rating';


interface StoryBulletProps {
    id: string;
    title: string;
    cover: string;
    genres: string[];
    rating: number;
}

const StoryBullet: React.FC<StoryBulletProps> = ({ id, title, cover, genres, rating }) => {
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <div className="py-4 border w-full rounded-lg shadow-md bg-white max-h-44 flex items-center space-x-6 relative">
            <div className='absolute right-2 top-2'>
                <Rating rating={rating}/>
            </div>
            <div className="m-4 w-24 h-36 relative">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loading size="h-24 w-24" lottieProportions='' />
                    </div>
                )}
                <img
                    src={cover}
                    alt={title}
                    className={`w-24 h-36 object-cover rounded-lg transition-opacity ${imageLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={handleImageLoad}
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{title}</h3>

                <div className="flex space-x-2 overflow-hidden">
                    {genres.map((genre, index) => (
                        <span
                            key={index}
                            className="text-xs text-white bg-primary px-2 py-1 rounded-full shadow-md truncate max-w-[80px] whitespace-nowrap overflow-hidden"
                            title={genre}
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>

            <div className="pr-6">
                <FillButton message="See More" handleClick={() => navigate(`/stories/${id}`)} />
            </div>
        </div>
    );
};

export default StoryBullet;

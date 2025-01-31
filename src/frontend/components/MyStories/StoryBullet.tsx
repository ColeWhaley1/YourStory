import React, { useState } from 'react';
import FillButton from '../widgets/FillButton';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

interface StoryBulletProps {
    id: string;
    title: string;
    cover: string;
    genres: string[];
}

const StoryBullet: React.FC<StoryBulletProps> = ({ id, title, cover, genres }) => {
    const navigate = useNavigate();

    const [imageLoading, setImageLoading] = useState<boolean>(true);

    const handleImageLoad = () => {
        setImageLoading(false);
    }

    return (
        <div className="py-4 border w-full rounded-lg shadow-md bg-white max-h-44 flex items-center space-x-6">

            <div className='m-4'>
                <div className={`w-full h-full ${imageLoading ? "visible" : "hidden"}`}>
                    <Loading size="h-24 w-24" lottieProportions=''/>
                </div>

                <img src={cover} alt={title} className={`max-h-36 object-cover rounded-lg ${!imageLoading ? "visible" : "hidden"}`} onLoad={handleImageLoad} />
            </div>


            <div className='flex-1'>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>

                <div className="flex space-x-2">
                    {genres.map((genre, index) => (
                        <span key={index} className="text-sm text-white bg-primary px-2 py-1 rounded-full shadow-md">
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
            <div className="pr-6">
                <FillButton message='See More' handleClick={() => navigate(`/stories/${id}`)} />
            </div>
        </div>
    );
};

export default StoryBullet;

import React from 'react';
import FillButton from '../widgets/fillButton';
import { useNavigate } from 'react-router-dom';

interface StoryBulletProps {
    id: string;
    title: string;
    cover: string;
    genres: string[];
}

const StoryBullet: React.FC<StoryBulletProps> = ({ id, title, cover, genres }) => {
    const navigate = useNavigate();

    return (
        <div className="py-4 border w-full rounded-lg shadow-md bg-white max-h-52 flex items-center space-x-6">
            <img src={cover} alt={title} className="max-h-44 object-cover rounded-lg m-4" /> {/* NEED TO ADD LOADER WHEN IMG NOT LOADED */}

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
            <div className="pr-12">
                <FillButton message='See More' handleClick={() => navigate(`/stories/${id}`)}/>
            </div>
        </div>
    );
};

export default StoryBullet;

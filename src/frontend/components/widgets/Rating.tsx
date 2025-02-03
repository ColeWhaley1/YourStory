import { FaStar } from "react-icons/fa";
import Flame from '../../../assets/lottie_animations/flame.json';
import Lottie from "lottie-react";

interface RatingProps {
    rating: number
}

const Rating: React.FC<RatingProps> = ({ rating }) => {

    const onFire: boolean = rating >= 4.7 ? true : false;

    return (
        <div className="flex items-center pl-2 py-1 rounded-full bg-stone-50 font-semibold">
            <div>{rating}</div>
            <div className={`relative w-8 h-8 flex justify-center items-center -translate-y-[2px] ${onFire ? "text-[#ffffffc5]": "text-black"}`}>
                {
                    onFire && (
                        <div className="absolute inset-0 scale-[2] -translate-y-[5px] -translate-x-[1px]">
                            <Lottie animationData={Flame}/>
                        </div>
                    )
                }
                <FaStar className='z-10'/>
            </div>
        </div>
    )
}

export default Rating
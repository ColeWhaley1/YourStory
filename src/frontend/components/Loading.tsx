import Lottie from "lottie-react";
import LoadingLottie from "../../assets/lottie_animations/loading.json";

interface LoadingProps {
    size?: string
    lottieProportions?: string
}   

const Loading: React.FC<LoadingProps> = ({ size = "h-[650px]", lottieProportions = "w-1/6"}) => {
    return (
        <div className={`flex ${size} justify-center items-center`}>
            <Lottie animationData={LoadingLottie} className={lottieProportions}/>
        </div>
    );
}

export default Loading;
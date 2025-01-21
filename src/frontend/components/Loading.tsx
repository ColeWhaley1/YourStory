import Lottie from "lottie-react";
import LoadingLottie from "../../assets/lottie_animations/loading.json";

const Loading = () => {
    return (
        <div className="flex h-[650px] justify-center items-center">
            <Lottie animationData={LoadingLottie} className="w-1/6"/>
        </div>
    );
}

export default Loading;
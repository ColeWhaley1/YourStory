import React from "react";
import Loading from "../../assets/lottie_animations/loading.json";
import Lottie from "lottie-react";

const GlobalLoading: React.FC = () => {

    return (
        <div className="flex h-[650px] justify-center items-center">
            <Lottie animationData={Loading} className="w-1/6"/>
        </div>
    )

}

export default GlobalLoading;
import Lottie from "lottie-react";

import Celebration from "../../assets/lottie_animations/celebration.json"

const SuccessPage = () => {

    return (
        <div className="flex items-center justify-center">
            <Lottie animationData={Celebration}/>
        </div>
    )

}

export default SuccessPage;
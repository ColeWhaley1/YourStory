import Lottie from "lottie-react";

import Celebration from "../../assets/lottie_animations/celebration.json"
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {

    const location = useLocation();
    const { reroute_to } = location.state || {}

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(reroute_to);
        }, 3000)
    }, [reroute_to])

    return (
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="text-center">
                <Lottie className="mx-auto" animationData={Celebration} />
                <h1 className="text-2xl font-bold mt-4">Story Created!</h1>
            </div>
        </div>
    )

}

export default SuccessPage;
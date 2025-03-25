import { useEffect, useState } from "react";
import { NotificationType } from "../contexts/notificationContext";
import { IoCloseOutline } from "react-icons/io5";
import ProgressBar from "./widgets/progressBar";

interface NotificationProps {
    isVisible: boolean,
    setIsVisible: (state: boolean) => void,
    notificationType: NotificationType,
    message: string,
    lifespan: number | undefined,
    action?: (() => void) | undefined,
    actionTitle?: string | undefined
}

const Notification: React.FC<NotificationProps> = ({ setIsVisible, notificationType, message, lifespan, action, actionTitle }) => {

    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isEntering, setIsEntering] = useState<boolean>(true);

    useEffect(() => {

        let lifespanTimeout: NodeJS.Timeout;

        const notificationEnteringTimeout = setTimeout(() => {
            setIsEntering(false);


            if (lifespan != undefined && lifespan != null) {
                lifespanTimeout = setTimeout(() => {
                    onCloseNotification();
                }, lifespan * 1000);
            }

        }, 700);


        return () => {
            clearTimeout(notificationEnteringTimeout);
            clearTimeout(lifespanTimeout);
        };
    });

    const getProgressColor = () => {
        switch (notificationType){
            case "success":
                return "bg-[#00d391]";
            case "info":
                return "bg-[#00bdff]";
            case "error":
                return "bg-[#ff627c]";
            default:
                return "bg-[#00bdff]";
        }
    }

    const getNotificationStyle = () => {
        switch (notificationType) {
            case "success":
                return "alert alert-success text-white shadow-xl";
            case "info":
                return "alert alert-info text-white shadow-xl";
            case "error":
                return "alert alert-error text-white shadow-xl";
            default:
                return "alert alert-neutral text-white shadow-xl";
        }
    }

    const getNotificationSymbol = () => {

        switch (notificationType) {
            case "success":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "info":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
            case "error":
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>

                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
        }
    }

    const onCloseNotification = () => {
        setIsExiting(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    }

    return (
        <div className={`absolute top-4 w-full flex justify-center z-50 ${isEntering
            ?
            "transform -translate-y-40 transition-transform duration-700"
            :
            isExiting
                ?
                "transform -translate-y-40 transition-transform duration-700"
                :
                "transform translate-y-0 transition-transform duration-700"
            }`
        }>
            <div className="opacity-90 space-y-1">
                <div className={getNotificationStyle()}>

                    <div>
                        {getNotificationSymbol()}
                    </div>

                    <div>
                        {message}
                    </div>

                    {
                        action && (        
                            <button className="bg-white rounded-md bg-opacity-30 hover:scale-110 transition-transform duration-300" onClick={action}>
                                <div className="p-2 text-sm">
                                    {actionTitle}
                                </div>
                            </button>
                        )
                    }

                    <button className="hover:scale-150 transition-transform duration-300" onClick={onCloseNotification}>
                        <IoCloseOutline size={18} />
                    </button>

                </div>
                {lifespan != undefined && lifespan != null && (
                    <div className="flex items-center justify-center">
                        <div className="w-11/12">
                            <ProgressBar timeInSeconds={lifespan} progressColor={getProgressColor()} isActive={!isEntering}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notification;
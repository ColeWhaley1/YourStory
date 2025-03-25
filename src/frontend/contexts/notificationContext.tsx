import { createContext, ReactNode, useContext, useState } from "react";
import Notification from "../components/Notification";

export type NotificationType = "error" | "success" | "info";

interface NotificationContextType {
    isVisible: boolean,
    setIsVisible: (state: boolean) => void,
    notificationType: NotificationType,
    message: string,
    lifespan?: number,
    action?: () => void,
    actionTitle?: string,
    showNotification: (notificationType: NotificationType, message: string, lifespan?: number | undefined, action?: (() => void) | undefined, actionTitle?: string | undefined) => void,
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [notificationType, setNotificationType] = useState<NotificationType>('info');
    const [message, setMessage] = useState<string>("");
    const [lifespan, setLifespan] = useState<number | undefined>(undefined);
    const [action, setAction] = useState<(() => void) | undefined>(undefined);
    const [actionTitle, setActionTitle] = useState<string | undefined>(undefined);

    const showNotification = (notificationType: NotificationType, message: string, lifespan: number | undefined = undefined, action: (() => void) | undefined, actionTitle: string | undefined) => {
        setNotificationType(notificationType);
        setMessage(message);
        setLifespan(lifespan);
        setAction(() => action);
        setIsVisible(true);
        setActionTitle(actionTitle);
    }

    return (
        <NotificationContext.Provider value={{ isVisible, setIsVisible, notificationType, message, lifespan, action, actionTitle, showNotification }}>
            {
                isVisible && (
                    <Notification
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        notificationType={notificationType}
                        message={message}
                        lifespan={lifespan}
                        action={action}
                        actionTitle={actionTitle}
                    />
                )
            }
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("Context does not exist for useNotification!");
    }

    return context;
}
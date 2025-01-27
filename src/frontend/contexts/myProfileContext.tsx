import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { Profile } from "../../types/profile";
import getProfile from "../services/getProfile";
import getUserSession from "../services/getUserSession";

interface MyProfileContextType {
  profile: Profile | null;
  fetchMyProfile: (id: string) => Promise<void>;
  loading: boolean;
}

const MyProfileContext = createContext<MyProfileContextType | undefined>(undefined);

export const MyProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMyProfile = async (id: string): Promise<void> => {
    if (profile) {
        return;
    }

    setLoading(true);

    try {
      const response = await getProfile(id);

      if (response.error) {
        throw new Error("Could not fetch MyProfile");
      }

      setProfile(response.profile);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchSessionAndProfile = async () => {
      const sessionResponse = await getUserSession();
  
      if(sessionResponse && sessionResponse.session && sessionResponse.session.user && sessionResponse.session.user.id){
        const id = sessionResponse.session.user.id;
        fetchMyProfile(id);
      }
    }

    if(!profile){
      fetchSessionAndProfile();
    } else {
      setLoading(false);
    }
  }, [profile]);

  return (
    <MyProfileContext.Provider value={{ profile, fetchMyProfile, loading }}>
      {children}
    </MyProfileContext.Provider>
  );
};

export const useMyProfile = () => {
  const context = useContext(MyProfileContext);
  if (!context) {
    throw new Error("useMyProfile must be used within a MyProfileProvider");
  }
  return context;
};

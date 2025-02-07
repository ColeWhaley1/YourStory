import { useState } from "react";
import DefaultAvatar from "../../assets/static_images/DefaultAvatar.png";
import Loading from "./Loading";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  size?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ size="w-64 h-64", avatarUrl }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className={`flex items-center justify-center rounded-full overflow-hidden ${size}`}>
      <div className={`${loading ? "visible" : "hidden"}`}>
        <Loading/>
      </div>
      <img
        src={avatarUrl ?? DefaultAvatar}
        alt="Profile Avatar"
        className={`w-full h-full object-cover ${!loading ? "visible" : "hidden"}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ProfileAvatar;

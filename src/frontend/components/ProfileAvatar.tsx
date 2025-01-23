import DefaultAvatar from "../../assets/static_images/DefaultAvatar.png";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  size?: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatarUrl, size="w-64 h-64" }) => {
  return (
    <div className={`flex items-center justify-center rounded-full overflow-hidden ${size} p-2`}>
      <img
        src={avatarUrl ?? DefaultAvatar}
        alt="Profile Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfileAvatar;

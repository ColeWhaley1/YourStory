import StatBox from "./StatBox";


interface ProfileStatsProps {
    storiesCount: number,
    followersCount: number,
    followingCount: number,
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ storiesCount, followersCount, followingCount }) => {

    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex space-x-12">
                <StatBox title="Stories" count={storiesCount ?? 0} redirect="/my_stories" />
                <StatBox title="Followers" count={followersCount ?? 0} redirect="/followers" />
                <StatBox title="Following" count={followingCount ?? 0} redirect="/following" />
            </div>
        </div>
    );
}

export default ProfileStats
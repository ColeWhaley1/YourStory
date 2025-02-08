import convertToDate from "../helpers/convertToDate"

interface BioProps {
    bio: string | null | undefined,
    createdAt: string | null | undefined,
}

const BioSection: React.FC<BioProps> = ({ bio, createdAt }) => {
    return (
        <div>
            <div>Author since {convertToDate(createdAt)}</div>
            <div>{bio}</div>
        </div>
    )
}

export default BioSection
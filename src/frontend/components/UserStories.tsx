import StoriesList from "./MyStories/StoriesList";

const UserStories = () => {
  return (
    <div className="w-full h-full flex justify-center">
        <div className="w-1/2 py-4">
            <div className="flex items-center justify-center">
                <StoriesList/>
            </div>
        </div>
    </div>
  )
}

export default UserStories;
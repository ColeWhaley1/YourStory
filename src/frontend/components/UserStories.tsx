import ListStories from "./MyStories/StoriesList";

const UserStories = () => {
  return (
    <div className="w-full h-full flex justify-center">
        <div className="w-1/3 py-4">
            <div className="py-4 flex items-center justify-center">
                <ListStories/>
            </div>
        </div>
    </div>
  )
}

export default UserStories;
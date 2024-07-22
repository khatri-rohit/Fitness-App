import '../styles/Popup.css'
import Todo from "../components/todo";
import Weather from "../components/Weather";

const DashBoard = () => {
  return (
    <>
      <div className="md:container mx-auto h-screen md:p-2 p-5">
        <div className="">
          <span className="text-lg text-gray-400">Primary</span>
          <p className="text-2xl mx-4 font-medium">Dashboard</p>
        </div>
        <div className="res-grid items-start">
          {/* <div className="md:gap-4 my-3 w-full">
            <Weather />
          </div>
          */}
          <div className="my-3">
            <Weather />
          </div>
          <div className="todo my-3 mx-3">
            <Todo />
          </div>
         
        </div>
      </div>
    </>
  )
};

export default DashBoard;

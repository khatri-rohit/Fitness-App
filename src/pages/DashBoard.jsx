import Weather from "../components/Weather";

const DashBoard = () => {
  return (
    <>
      <div className="md:container mx-auto h-screen md:p-2 p-5">
        <div className="">
          <span className="text-lg text-gray-400">Primary</span>
          <p className="text-2xl mx-4 font-medium">Dashboard</p>
        </div>
        <div className="md:grid md:grid-cols-3">
          {/* <div className="md:gap-4 my-3 w-full">
            <Weather />
          </div>
          */}
          <div className="md:gap-4 my-3">
            <Weather />
          </div>
        </div>
      </div>
    </>
  )
};

export default DashBoard;

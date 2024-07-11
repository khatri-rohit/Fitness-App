import Weather from "../components/Weather";

const DashBoard = () => {
  return (
    <>
      <div className="container mx-auto h-screen p-2 md:flex">
        <div className="my-3 w-full">
          <Weather />
        </div>
      </div>
    </>
  )
};

export default DashBoard;

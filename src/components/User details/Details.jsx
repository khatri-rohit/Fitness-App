/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import '../../styles/stepper.css'

const Details = ({ userData, setUserData }) => {

  const wheelCapture = (e) => {
    e.currentTarget.blur();
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-screen-lg mx-auto">
      <div className="mb-6">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 text-center">
          What's your age?
        </p>
        <div className="flex justify-center h-20">
          <input
            type="number"
            name="age"
            value={userData.age}
            placeholder="Age"
            className="bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-xs outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-300 indent-4 text-center"
            onChange={(e) => {
              wheelCapture
              setUserData((prev) => ({
                ...prev,
                age: e.target.value
              }));
            }}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 text-center">
          What's your height & weight?
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center h-20 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            name="height"
            value={userData.height}
            placeholder="Height (cm)"
            className="bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-xs outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-300 indent-4 text-center"
            onChange={(e) => {
              wheelCapture
              setUserData((prev) => ({
                ...prev,
                height: e.target.value
              }));
            }}
          />
          <input
            type="number"
            name="weight"
            value={userData.weight}
            placeholder="Weight (kg)"
            className="bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-xs outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-300 indent-4 text-center"
            onChange={(e) => {
              wheelCapture
              setUserData((prev) => ({
                ...prev,
                weight: e.target.value
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default Details;

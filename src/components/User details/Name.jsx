/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

const Name = ({ userData, setUserData }) => {
    return (
        <div className="p-4">
      <div>
        <p className="text-2xl md:text-3xl lg:text-4xl">What's your Name?</p>
      </div>
      <div className="flex justify-center h-20 mt-4">
        <input
          type="text"
          name="name"
          value={userData.name}
          placeholder="first name"
          className="bg-transparent text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full max-w-md outline-none indent-4 sm:indent-6 md:indent-8 lg:indent-10 p-2 border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
          onChange={(e) => setUserData((prev) => ({
            ...prev,
            name: e.target.value
          }))}
        />
      </div>
    </div>
    )
};

export default Name;

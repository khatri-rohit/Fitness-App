/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

const Gender = ({ userData, setUserData }) => {
  // const { male, female } = userData
  // console.log(male);
  // console.log(female);

  return (
    <>
      <div className="">
        <div className="">
          <p className="text-gray-300 font-medium capitalize text-xl">Welcome To this fitness journey</p>
          <p className="text-2xl">What's your gender?</p>
        </div>
        <div className="p-2">
          <div className={`male flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${userData.male && `border-blue-500 border-2`}`}
            onClick={() => setUserData((prev) => ({
              ...prev, male: !userData.male, female: false, nonBinary: false, notToSay: false
            }))}>
            <p className="text-xl">Male</p>
            <div className="flex w-54">
              <img src="/img/male.png" alt="" className="p-2 max-h-[200px]" />
              <input type="checkbox"
                name="male"
                className="text-blue-500 outline-none border-0"
                checked={userData.male}
              />
            </div>
          </div>

          <div className={`female flex cursor-pointer justify-between items-center  p-2 h-40 rounded-lg my-5 ${userData.female && `border-blue-500 border-2`}`}
            onClick={() => setUserData((prev) => ({
              ...prev, female: !userData.female, male: false, nonBinary: false, notToSay: false
            }))}
          >
            <p className="text-xl">Female</p>
            <div className="flex w-56">
              <img src="/img/female.png" alt="" className="p-2 max-h-[200px]" />
              <input type="checkbox"
                name="female"
                className="text-blue-500 outline-none border-0"
                checked={userData.female}
              />
            </div>
          </div>

          <div className={`non-binary cursor-pointer flex justify-between items-center  p-2 h-20 rounded-lg my-5 ${userData.nonBinary && `border-blue-500 border-2`}`}
            onClick={() => setUserData((prev) => ({
              ...prev, nonBinary: !userData.nonBinary, female: false, male: false, notToSay: false
            }))}>
            <p className="text-xl">Non-Binary</p>
            <div className="flex">
              <input type="checkbox"
                name="non-binary"
                className="text-blue-500 outline-none border-0"
                checked={userData.nonBinary} />
            </div>
          </div>

          <div className={`notToSay flex cursor-pointer justify-between items-center  p-2 h-20 rounded-lg my-5 ${userData.notToSay && `border-blue-500 border-2`}`} onClick={() => setUserData((prev) => ({
            ...prev, notToSay: !userData.notToSay, female: false, nonBinary: false, male: false
          }))}>
            <p className="text-xl">Prefer not to say</p>
            <div className="flex">
              <input type="checkbox"
                name="No"
                className="text-blue-500 outline-none border-0"
                checked={userData.notToSay} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Gender;

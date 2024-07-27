/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import '../../styles/stepper.css'

const Details = ({ userData, setUserData }) => {

  const wheelCapture = (e) => {
    e.currentTarget.blur();
  }

  return (
    <div className="">
      <div className="">
        <p className="text-xl">
          What's your age?
        </p>
      </div>
      <div className="flex justify-center h-20">
        <input
          type="number"
          name="age"
          value={userData.age}
          placeholder="Age"
          className="bg-transparent text-3xl w-44 outline-none indent-12"
          onChange={(e) => {
            wheelCapture
            setUserData((prev) => ({
              ...prev,
              age: e.target.value
            }))
          }}
        />
      </div>
      <div className="">
        <p className="text-xl">
          What's your height & weight?
        </p>
      </div>
      <div className="flex justify-center h-20">
        <input
          type="number"
          name="height"
          value={userData.height}
          placeholder="height"
          className="bg-transparent text-3xl w-44 outline-none indent-12"
          onChange={(e) => {
            wheelCapture
            setUserData((prev) => ({
              ...prev,
              height: e.target.value
            }))
          }}
        />
        <input
          type="number"
          name="weight"
          value={userData.weight}
          placeholder="weight"
          className="bg-transparent text-3xl w-44 outline-none indent-12"
          onChange={(e) => setUserData((prev) => ({
            ...prev,
            weight: e.target.value
          }))}
        />
      </div>
    </div>
  )
}
export default Details;

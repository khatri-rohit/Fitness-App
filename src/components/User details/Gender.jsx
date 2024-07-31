/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

const GenderSelection = ({ userData, setUserData }) => {

  const handleGenderSelection = (gender) => {
    setUserData({
      ...userData,
      male: gender === 'male',
      female: gender === 'female',
      nonBinary: gender === 'nonBinary',
      notToSay: gender === 'notToSay'
    });
  };

  const genderOptions = [
    { label: 'Male', value: 'male', imgSrc: '/img/male.png', imgAlt: 'male', height: 'h-40', width: 'w-54' },
    { label: 'Female', value: 'female', imgSrc: '/img/female.png', imgAlt: 'female', height: 'h-40', width: 'w-56' },
    { label: 'Non-Binary', value: 'nonBinary', imgSrc: '', imgAlt: '', height: 'h-20', width: '' },
    { label: 'Prefer not to say', value: 'notToSay', imgSrc: '', imgAlt: '', height: 'h-20', width: '' }
  ];

  return (
    <div>
      <div>
        <p className="text-gray-500 font-medium capitalize md:text-xl">Welcome To this fitness journey</p>
        <p className="md:text-2xl text-lg">What's your gender?</p>
      </div>
      <div className="">
        {genderOptions.map((option) => (
          <div
            key={option.value}
            className={`flex cursor-pointer justify-between items-center p-2 ${option.height} rounded-lg my-2 ${userData[option.value] ? 'border-blue-500 border-2' : ''}`}
            onClick={() => handleGenderSelection(option.value)}
          >
            <p className="text-xl">{option.label}</p>
            <div className={`flex justify-between ${option.width}`}>
              {option.imgSrc && <img src={option.imgSrc} alt={option.imgAlt} className="p-2 max-h-[200px] h-[120px] m-auto" />}
              <input
                type="checkbox"
                name={option.value}
                className="text-blue-500 outline-none border-0"
                checked={userData[option.value]}
                readOnly
                aria-label={option.value}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderSelection;

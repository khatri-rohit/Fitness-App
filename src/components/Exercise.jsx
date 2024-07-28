import { Circle } from 'rc-progress'

const Exercise = () => {
    return (
        <>
            <div className="mt-5 p-3 rounded-lg drop-shadow-xl bg-red-500">
                <p className="text-gray-100 font-normal">
                    Exercise
                </p>
                <div className="flex justify-between items-center p-3">
                    <div className="mb-2">
                        <p className="text-2xl text-white font-medium drop-shadow-xl my-5">
                            Exercises
                        </p>
                    </div>
                    <div className="w-[30%] relative">
                        <Circle
                            percent={40}
                            strokeColor="blue"
                            strokeWidth={5}
                            strokeLinecap="round"
                            trailWidth={3}
                            trailColor='white'
                        />
                        <span className='absolute inset-12'>5/6</span>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Exercise;

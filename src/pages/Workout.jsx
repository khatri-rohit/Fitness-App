/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PuffLoader } from 'react-spinners'
import useFetch from "../hooks/useFetch";

const Workout = () => {

    const [selectedTab, setSelectedTab] = useState("Workout Plans");


    const { data, loading, error, setURL } = useFetch("https://youtube.googleapis.com/youtube/v3/search?q=" + encodeURIComponent(selectedTab) + "&part=snippet&type=video&maxResults=20&videoEmbeddable=true&key=AIzaSyBMFhsPQrVsj7PVtc1kpVVUrLGam0gZRoo") // Custom Hook

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setURL("https://utube.googleapis.com/youtube/v3/search?q=" + encodeURIComponent(tab) + "&part=snippet&type=video&maxResults=25&videoEmbeddable=true&key=AIzaSyBMFhsPQrVsj7PVtc1kpVVUrLGam0gZRoo");
    };
    console.log(data);

    if (error) {
        return <p className="text-3xl text-center font-semibold">Something Went Wrong</p>
    }

    return (
        <>
            <div className="md:container mx-auto md:p-2 p-5">
                <div className="my-3">
                    <p className="text-2xl mx-4 font-medium">Workouts</p>
                </div>
                <div className="mx-auto flex justify-around items-center w-[90%]">
                    <div className="flex justify-center mb-4 border-b-4">
                        {[
                            { title: "Workout Plans", key: "all-plans" },
                            { title: "Muscle Building", key: "muscle-building" },
                            { title: "Weight Loss", key: "weight-loss" },
                            { title: "Gain Strength", key: "gain-strength" },
                        ].map((tab) => (
                            <p
                                key={tab.key}
                                className={`text-2xl py-4 px-6 cursor-pointer transition duration-300 ${selectedTab === tab.title
                                    ? "border-blue-500 border-b-4 font-bold text-black"
                                    : "text-gray-500 border-b-4 border-gray-200 hover:text-gray-700"
                                    }`}

                                onClick={() => handleTabSelect(tab.title)}
                            >
                                {tab.title}
                            </p>
                        ))}
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {loading ?
                        (<PuffLoader
                            color="skyblue"
                            cssOverride={{}}
                            loading={loading}
                            size={50}
                            speedMultiplier={2}
                        />)
                        : data.map((video, index) => {
                            // Extracting and truncating the video title
                            const title = video.snippet.title.substring(0, 40) + " ...";

                            return (
                                <div key={index} className="p-2">
                                    <div className="">
                                        <iframe
                                            className="w-full h-[300px]"
                                            src={`https://www.youtube.com/embed/${video.id.videoId}?rel=0&modesbranding=1`}>
                                        </iframe>
                                    </div>
                                    <p className="text-xl font-semibold mt-2">{title}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    )
};

export default Workout;

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PuffLoader } from 'react-spinners';

const Workout = () => {
    const [selectedTab, setSelectedTab] = useState("Workout Plans");
    // const { data, loading, error, setURL } = useFetch("https://youtube.googleapis.com/youtube/v3/search?q=" + encodeURIComponent(selectedTab) + "&part=snippet&type=video&maxResults=20&videoEmbeddable=true&key=AIzaSyBMFhsPQrVsj7PVtc1kpVVUrLGam0gZRoo");
    const [URL, setURL] = useState("https://youtube.googleapis.com/youtube/v3/search?q=" + encodeURIComponent(selectedTab) + "&part=snippet&type=video&maxResults=20&videoEmbeddable=true&key=AIzaSyBMFhsPQrVsj7PVtc1kpVVUrLGam0gZRoo")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        (async () => {
            try {
                setError(false)
                setLoading(true)
                const resp = await axios.get(URL);
                const result = resp.data
                setData(result.items)
            } catch (error) {
                console.log("Error");
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [selectedTab, URL])

    const playerRef = useRef(null);
    const [currentVideoId, setCurrentVideoId] = useState(null);

    useEffect(() => {
        // Load the YouTube Iframe API script
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize the YouTube player
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '300',
                width: '100%',
                videoId: currentVideoId,
            });
        };

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [currentVideoId]);

    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
        setURL("https://youtube.googleapis.com/youtube/v3/search?q=" + encodeURIComponent(tab) + "&part=snippet&type=video&maxResults=25&videoEmbeddable=true&key=AIzaSyBMFhsPQrVsj7PVtc1kpVVUrLGam0gZRoo");
    };

    if (error) {
        return <p className="text-3xl text-center font-semibold h-screen">Something Went Wrong</p>;
    }

    return (
        <>
            <div className={`md:container mx-auto md:p-2 p-5 ${loading ? `h-screen` : ``}`}>
                <div className="my-3">
                    <p className="text-2xl mx-4 font-medium">Workouts Videos</p>
                </div>
                {/* <div className="mx-auto flex justify-around items-center w-[90%]">
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
                </div> */}
                <div className="mx-auto flex flex-col md:flex-row justify-around items-center w-full md:w-[90%]">
                    <div className="flex justify-center mb-4 border-b-4">
                        {[
                            { title: "Workout Plans", key: "all-plans" },
                            { title: "Muscle Building", key: "muscle-building" },
                            { title: "Weight Loss", key: "weight-loss" },
                            { title: "Gain Strength", key: "gain-strength" },
                        ].map((tab) => (
                            <p
                                key={tab.key}
                                className={`text-lg md:text-2xl py-2 md:py-4 px-4 md:px-6 cursor-pointer transition duration-300 ${selectedTab === tab.title
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
                        (
                            <div className="mx-auto flex justify-center items-center">
                                <PuffLoader
                                    color="skyblue"
                                    className="mx-auto "
                                    loading={loading}
                                    size={50}
                                    speedMultiplier={3}
                                />
                            </div>
                        )
                        : data.map((video, index) => {
                            const title = video.snippet.title.substring(0, 40) + " ...";
                            const videoId = video.id.videoId;

                            return (
                                <div key={index} className="p-2">
                                    <div className="" >
                                        <iframe
                                            className="w-full h-[300px]"
                                            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <p className="text-xl font-semibold mt-2">{title}</p>
                                </div>
                            );
                        })}
                </div>
                {currentVideoId && (
                    <div className="my-4">
                        <iframe
                            className="w-full h-[300px]"
                            src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

            </div>
        </>
    );
};

export default Workout;

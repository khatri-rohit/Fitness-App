import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";

const Weather = () => {

    const [lat, setLat] = useState('26.4499')
    const [log, setlog] = useState('74.6399')
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState([])

    const getWeather = async (lat, log) => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '175a467426mshe8285a4a411f620p16192bjsna983e4d66aed',
                    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
            };
            const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${log}&lat=${lat}&units=metric&lang=en`;
            const response = await fetch(url, options)
            const result = await response.json()
            setWeather(result.data)
            console.log(result.data)
            console.log(weather);
            setLoading(false)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude)
            setlog(pos.coords.longitude)
        })
        getWeather(lat, log)
    }, [lat, log])

    // if (loading)
    //     return <p className="text-xl text-center">Loading Weather...</p>

    return (
        <>
            <div className="border-2 p-3 md:w-1/3">
                <div className="">
                    <p className="text-lg">Weather</p>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start">
                            <FaMapLocationDot className="mt-2 mx-2 text-gray-500" />
                            <span className="text-4xl font-semibold mx-2">Ajmer</span>
                        </div>
                        <div className="bg-slate-200 rounded-lg">
                            <img src="/public/img/weather/a01n.png" />
                        </div>
                    </div>
                    <div className="flex my-2 border-2 justify-between p-3">
                        <div className="flex flex-col items-center">
                            <CiTempHigh className="text-4xl" />
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">30</p>
                                <TbTemperatureCelsius className="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <CiTempHigh className="text-4xl" />
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">30</p>
                                <TbTemperatureCelsius className="" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <CiTempHigh className="text-4xl" />
                            <div className="flex items-center">
                                <p className="text-2xl font-bold">30</p>
                                <TbTemperatureCelsius className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Weather;

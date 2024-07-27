import { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { GiRaining } from "react-icons/gi";
import { DotLoader } from 'react-spinners'

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
                    'x-rapidapi-key': '4fe11c7460msh49b7b139e4fe884p160e21jsna6d9161d0b74',
                    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
            };
            const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${log}&lat=${lat}&units=matric&lang=en`;
            const response = await fetch(url, options)
            const result = await response.json()
            setWeather(result.data[0])
            console.log(result.data[0])
            console.log(weather);
            setLoading(false)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        try {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLat(pos.coords.latitude)
                setlog(pos.coords.longitude)
            })
            // getWeather(lat, log)
        } catch (error) {
            console.log("UnExpected Error Accured While Fetching Weather\n" + error);
        }
    }, [lat, log])

    if (loading)
        return <div className="md:mx-3 p-3 flex justify-center">
            <DotLoader
                color="#6EACDA"
                size={30}
            />
        </div>

    return (
        <>
            <div className="md:mx-3 p-3">
                <div className="bg-slate-100 md:p-4 p-3">
                    <p className="text-lg md:text-xl font-bold">Weather</p>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start">
                            <FaMapLocationDot className="mt-2 mx-2 text-gray-500" />
                            <span className="md:text-4xl text-xl font-semibold mx-2">{weather?.city_name}</span>
                        </div>
                        <div className="bg-slate-200 rounded-lg">
                            <img src={`/img/weather/${weather?.weather.icon}.png`} />
                        </div>
                    </div>
                    <div className="flex my-2 justify-between p-3">
                        <div className="flex flex-col items-center">
                            <CiTempHigh className="text-4xl" />
                            <div className="flex items-center flex-col">
                                <div className="flex items-center">
                                    <p className="text-xl md:text-2xl font-bold">{weather?.temp}</p>
                                    <TbTemperatureCelsius className="text-xl md:text-2xl" />
                                </div>
                                <span className="text-gray-400 font-medium text-xs md:text-lg">Temp</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiRaining className="text-4xl" />
                            <div className="flex items-center flex-col">
                                <div className="flex items-center">
                                    <p className="text-xl md:text-2xl font-bold">{weather?.precip} mm</p>
                                </div>
                                <span className="text-gray-400 font-medium text-xs md:text-lg">Rain</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <CiTempHigh className="text-4xl" />
                            <div className="flex items-center flex-col">
                                <div className="flex items-center">
                                    <p className="text-xl md:text-2xl font-bold">{weather?.wind_spd} Km/h</p>
                                </div>
                                <span className="text-gray-400 font-medium text-xs md:text-lg">Wind</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Weather;

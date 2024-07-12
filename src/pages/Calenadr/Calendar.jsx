/* eslint-disable no-unused-vars */
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from 'dayjs'

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from 'react';


const Calender = () => {
    const localizer = dayjsLocalizer(dayjs)

    return (
        <>
            <div className="md:container mx-auto h-screen md:p-2 p-5">
                <div className="">
                    {/* <span className="text-lg text-gray-400">Primary</span> */}
                    <p className="text-2xl mx-4 font-medium">Calendar</p>
                </div>
                <div>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
            </div>
        </>
    )
};


export default Calender;

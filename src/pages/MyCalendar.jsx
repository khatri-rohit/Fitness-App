import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react';
import CalModel from '../components/CalModel';
import { useFireabse } from '../context/Firebase';
import { Timestamp } from 'firebase/firestore';

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
    const { newUser, Event, setEvent, updateEvent, checkExistingUser } = useFireabse()
    const { email } = newUser

    const [events, setEvents] = useState([{
        title: "Do it now",
        start: { Timestamp: "15 July 2024 at 01:00:00 UTC+5:30" },
        end: { Timestamp: "15 July 2024 at 01:00:00 UTC+5:30" },
    }])
    const [showModel, setShowModel] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [selectEvent, setSelectEvent] = useState(null)

    console.log(events);

    const handleSelectShot = (slotInfo) => {
        setShowModel(true)
        setSelectedData(slotInfo.start)
        setSelectEvent(null)
        console.log("Showing Data 2");
    }

    const handleSelectedEvent = (event) => {
        setShowModel(true)
        setSelectEvent(event)
        setEventTitle(event.title)
        console.log("Showing Data");
    }

    const deleteEvent = () => {
        if (selectEvent) {
            const updateEvents = events.filter(event => event !== selectEvent)
            setEvents(updateEvents)
            setShowModel(false)
            setEventTitle('')
            setSelectEvent(null)
            setEvent(updateEvents)
        }
    }

    const saveEvent = () => {
        if (eventTitle && selectedData) {
            if (selectEvent) {
                const updateEvent = { ...selectEvent, title: eventTitle }
                const updateEvents = events.map((event) => event === selectEvent ? updateEvent : event)
                setEvents(updateEvents)
                setEvent(updateEvents)
                console.log(Event);
            } else {
                const newEvent = {
                    title: eventTitle,
                    start: selectedData,
                    end: moment(selectedData).add(1, "hours").toDate(),
                }
                setEvents([...events, newEvent])
                setEvent([...events, newEvent])
            }
            setShowModel(false)
            setEventTitle('')
            setSelectEvent(null)
        }
    }

    // useEffect(() => {
    //     updateEvent(email, Event)
    //     console.log("Updating Data");
    // }, [Event])

    // useEffect(() => {
    //     const event = checkExistingUser(email)
    //     setEvents(event)
    // }, [Event])

    return (
        <>
            {showModel && (<CalModel
                setShowModel={setShowModel}
                setEventTitle={setEventTitle}
                eventTitle={eventTitle}
                saveEvent={saveEvent}
                setSelectEvent={setSelectEvent}
                selectEvent={selectEvent}
                deleteEvent={deleteEvent}
            />)}
            <div className={`md:container mx-auto h-full md:p-2 p-5 ${showModel ? `model` : ``}`}>

                <div className="my-3">
                    <p className="text-2xl mx-4 font-medium">Calendar</p>
                </div>
                <div className="w-full border-2 p-2" style={{ height: "80vh" }}>
                    <Calendar
                        localizer={localizer}
                        events={[
                            {
                                title: "Rohit",
                                start: { Timestamp: "21 July 2024 at 01:00:00 UTC+5:30" },
                                end: { Timestamp: "21 July 2024 at 01:00:00 UTC+5:30" },
                            }
                            , {
                                title: "Rohit",
                                start: { Timestamp: "21 July 2024 at 01:00:00 UTC+5:30" },
                                end: { Timestamp: "21 July 2024 at 01:00:00 UTC+5:30" },
                            }
                        ]}
                        startAccessor="start"
                        endAccessor="end"
                        selectable={true}
                        onSelectSlot={handleSelectShot}
                        onSelectEvent={handleSelectedEvent}
                    />
                </div>

            </div>
        </>
    )
};

export default MyCalendar;

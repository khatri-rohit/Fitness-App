import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react';
import CalModel from '../components/CalModel';

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
    const [events, setEvents] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [selectEvent, setSelectEvent] = useState(null)

    const handleSelectShot = (slotInfo) => {
        setShowModel(true)
        setSelectedData(slotInfo.start)
        setSelectEvent(null)
    }

    const handleSelectedEvent = (event) => {
        setShowModel(true)
        setSelectEvent(event)
        setEventTitle(event.title)
    }

    const deleteEvent = () => {
        if (selectEvent) {
            const updateEvents = events.filter(event => event !== selectEvent)
            setEvents(updateEvents)
            setShowModel(false)
            setEventTitle('')
            setSelectEvent(null)
        }
    }

    const saveEvent = () => {
        if (eventTitle && selectedData) {
            if (selectEvent) {
                const updateEvent = { ...selectEvent, title: eventTitle }
                const updateEvents = events.map((event) => event === selectEvent ? updateEvent : event)
                setEvents(updateEvents)
            } else {
                const newEvent = {
                    title: eventTitle,
                    start: selectedData,
                    end: moment(selectedData).add(1, "hours").toDate(),
                }
                setEvents([...events, newEvent])
            }
            setShowModel(false)
            setEventTitle('')
            setSelectEvent(null)
        }
    }

    // const saveEventy = () => {
    //     if (eventTitle && selectedData) {
    //         const newEvent = {
    //             title: eventTitle,
    //             start: selectedData,
    //             end: moment(selectedData).add(1, "hours").toDate(),
    //         }
    //         setEvents([...events, newEvent])
    //         setShowModel(false)
    //         console.log(events);
    //         setEventTitle('')
    //     }
    // }

    return (
        <div className="md:container mx-auto h-full md:p-2 p-5">
            <div className="my-3">
                <p className="text-2xl mx-4 font-medium">Calendar</p>
            </div>
            <div className="w-full border-2" style={{ height: "70vh", objectFit: "contain" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable={true}
                    onSelectSlot={handleSelectShot}
                    onSelectEvent={handleSelectedEvent}
                />
                {showModel && (<CalModel
                    setShowModel={setShowModel}
                    setEventTitle={setEventTitle}
                    eventTitle={eventTitle}
                    saveEvent={saveEvent}
                    setSelectEvent={setSelectEvent}
                    selectEvent={selectEvent}
                    deleteEvent={deleteEvent}
                />)}
            </div>
        </div>
    )
};

export default MyCalendar;

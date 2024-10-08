/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { LuCalendarPlus, LuCalendarMinus } from 'react-icons/lu'
import { useFireabse, firestore } from '../context/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const Todo = () => {
    const [addNote, setAddNotes] = useState(false);
    const [Notes, setNotes] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const [delId, setDelId] = useState(0);

    const { uploadNotes, user } = useFireabse();
    const { email } = user;

    const handleNotes = e => {
        e.preventDefault();
        var newNotes = [...allNotes];
        newNotes.push({ note: Notes, id: delId });
        setAllNotes(newNotes);
        uploadNotes(email, newNotes);
        setNotes('');
        setAddNotes(false);
        setDelId(prev => prev + 1);
    }

    const handleDelete = id => {
        const newNotes = allNotes.filter(note => note.id !== id);
        setAllNotes(newNotes);
        uploadNotes(email, newNotes);
    }

    useEffect(() => {
        (async () => {
            try {
                const docRef = doc(firestore, "users", email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Notes fetched");
                    const AllNotes = docSnap.data().notes;
                    setAllNotes(AllNotes);
                } else {
                    console.log("Not Notes fetched");
                }
            } catch (error) {
                console.log("UnExpected Error While Fetching Notes\n" + error);
            }
        })()
    }, [])


    return (
        <>
            <div className="mt-5 bg-blue-500 p-3 rounded-br-xl drop-shadow-xl">
                <div className="flex justify-between items-center mt-3 mb-2">
                    <p className="text-2xl text-white font-medium">
                        Notes
                    </p>
                    {addNote ? <LuCalendarMinus color='white' className='cursor-pointer' onClick={() => setAddNotes(prev => !prev)} /> : <LuCalendarPlus color='white' className='cursor-pointer' onClick={() => setAddNotes(prev => !prev)} />}
                </div>
                {addNote && (<form className='flex items-center justify-between px-3' onSubmit={handleNotes}>
                    <input value={Notes}
                        type="text"
                        className="my-2 indent-2 rounded-md outline-none"
                        placeholder="To-do"
                        onChange={e => setNotes(e.target.value)}
                        autoFocus
                    />
                    <button className="px-3 bg-white rounded-lg" onSubmit={handleNotes}>Do it</button>
                </form>)}
                <div className="text-xl text-white font-light p-2 px-3">
                    {allNotes?.length > 0 ? (
                        allNotes.map((note, _) => {
                            return <div key={_} className="group flex justify-between items-center">
                                <p>{note.note}</p>
                                <button onClick={() => handleDelete(note.id)}
                                    className='bg-gray-600 px-2 py-1 rounded-md invisible group-hover:visible'>
                                    Del
                                </button>
                            </div>
                        })
                    ) : (<p className="text-xl text-gray-300">Set Your Todo list</p>)}
                </div>
            </div >
        </>
    )
};

export default Todo;
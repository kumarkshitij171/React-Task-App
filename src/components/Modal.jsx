import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { addTask, changeStatus, removeTask } from '../features/task/taskSlice.js'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function ModalComponent({ openModal, setOpenModal, Type, id, myteam, myasignee, mypriority, mystatus, mytitle, mydescription }) {
    const [modalType, setModalType] = useState(null);
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [team, setTeam] = useState("")
    const [asignee, setAsignee] = useState("")
    const [priority, setPriority] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        if (Type === 'Edit') {
            setStatus(mystatus)
            setPriority(mypriority)
        }
    }, [openModal])

    const PriorityHandleChange = (event) => {
        setPriority(event.target.value);

    };

    const statusHandleChange = (event) => {
        setStatus(event.target.value);

    };

    const createTask = () => {
        dispatch(addTask(
            {
                title,
                description,
                team,
                asignee,
                priority,
                status
            }
        ))
        // clear the input fields
        setTitle("")
        setDescription("")
        setAsignee("")
        setTeam("")
        setPriority("")
        setStatus("")
        setOpenModal(false)
    }

    const deleteTask = () => {
        dispatch(removeTask(id))
        setOpenModal(false)
    }

    const editTask = () => {
        dispatch(changeStatus(
            {
                id,
                priority,
                status
            }
        ))
        // clear the input fields
        setTitle("")
        setDescription("")
        setAsignee("")
        setPriority("")
        setTeam("")
        setStatus("")
        setOpenModal(false)
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setAsignee("")
        setTeam("")
        setPriority("")
        setStatus("")
    }

    const handleSubmit = () => {
        if (modalType === 'Edit') {
            editTask()
        } else {
            createTask()
            console.log("Create Task")
        }
    }

    useEffect(() => {
        setModalType(Type);
    }, [Type])

    return (
        <div className='flex flex-col m-7'>
            <Modal
                // ref={CloseModal}
                className='mx-[10%] md:mx-[30%] z-20'
                show={openModal}
                onClose={() => setOpenModal(false)}>
                <Modal.Header className='p-2 font-bold '>{Type} Task</Modal.Header>
                <Modal.Body className='py-2 bg-indigo-200 px-3'>

                    {modalType === 'Edit' &&
                        <div>
                            <label className='block mt-2'>Title: </label>
                            <div className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80' type="text" >
                                {mytitle}
                            </div>
                            <label className='block mt-2'>Description: </label>
                            <div className="bg-gray-400 p-2 rounded-md border-black placeholder-gray-700">
                                {mydescription}
                            </div>
                            <label className='block mt-2'>Team: </label>
                            <div className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80' type="text" >
                                {myteam}
                            </div>
                            <label className='block mt-2'>Assignee: </label>
                            <div className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80' type="text" >
                                @ {myasignee}
                            </div>

                            <div className="flex gap-3">
                                <div className="flex gap-2 mt-3 items-center">
                                    priority:
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Priority: </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className='bg-white rounded-md border-black'
                                                value={priority}
                                                size='small'
                                                label="priority"
                                                onChange={PriorityHandleChange}
                                            >
                                                <MenuItem value={'P0'}>P0</MenuItem>
                                                <MenuItem value={'P1'}>P1</MenuItem>
                                                <MenuItem value={'P2'}>P2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="flex gap-2 mt-3 items-center">
                                    status:
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">status: </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className='bg-white rounded-md border-black flex items-center'
                                                value={status}
                                                size='small'
                                                label="status"
                                                onChange={statusHandleChange}
                                            >
                                                <MenuItem value={"Pending"}>Pending</MenuItem>
                                                <MenuItem value={"Inprogress"}>Inprogress</MenuItem>
                                                <MenuItem value={"Progress"}>Progress</MenuItem>
                                                <MenuItem value={"Deployed"}>Deployed</MenuItem>
                                                <MenuItem value={"Differed"}>Differed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    }

                    {modalType === 'Create' &&
                        <div className=''>
                            <label className='block mt-2'>Title: </label>
                            <input
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80'
                                type="text"
                                placeholder='Title' />

                            <label className='block mt-2'>Description: </label>
                            <textarea
                                cols={40}
                                rows={5}
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                className="bg-gray-400 p-2 rounded-md border-black placeholder-gray-700"
                                placeholder='Description' />

                            <label className='block mt-2'>Team: </label>
                            <input
                                value={team}
                                onChange={(e) => { setTeam(e.target.value) }}
                                className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80'
                                placeholder='Team Name'
                                type="text" />

                            <label className='block mt-2'>Assignee: </label>
                            <input
                                value={asignee}
                                onChange={(e) => { setAsignee(e.target.value) }}
                                className='bg-gray-400 p-2 rounded-md border-black placeholder-gray-700 w-80'
                                placeholder='@Assignee_Name'
                                type="text" />

                            <div className="flex gap-3">
                                <div className="flex gap-2 mt-3 items-center">
                                    priority:
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Priority: </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className='bg-white rounded-md border-black'
                                                value={priority}
                                                size='small'
                                                label="priority"
                                                onChange={PriorityHandleChange}
                                            >
                                                <MenuItem value={'P0'}>P0</MenuItem>
                                                <MenuItem value={'P1'}>P1</MenuItem>
                                                <MenuItem value={'P2'}>P2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="flex gap-2 mt-3 items-center">
                                    status:
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">status: </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                className='bg-white rounded-md border-black flex items-center'
                                                value={status}
                                                size='small'
                                                label="priority"
                                                onChange={statusHandleChange}
                                            >
                                                <MenuItem value={"Pending"}>Pending</MenuItem>
                                                <MenuItem value={"Inprogress"}>Inprogress</MenuItem>
                                                <MenuItem value={"Progress"}>Progress</MenuItem>
                                                <MenuItem value={"Deployed"}>Deployed</MenuItem>
                                                <MenuItem value={"Differed"}>Differed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    }

                    {modalType === 'Delete' &&
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-black">
                                Are you sure you want to delete this task?
                            </p>
                            <div className="flex gap-2 items-center">
                                <span className='font-semibold'>Task: {id}</span>
                                <Button className='bg-blue-500 text-white px-4 font-semibold shadow-md rounded-md' onClick={deleteTask}>Yes</Button>
                                <Button className='bg-blue-500 text-white px-4 font-semibold shadow-md rounded-md' onClick={() => setOpenModal(false)}>No</Button>
                            </div>
                        </div>
                    }
                </Modal.Body>
                {modalType !== 'Delete' &&
                    <Modal.Footer className='flex justify-end p-2'>
                        <div className="flex gap-2 ">
                            <Button className='bg-blue-500 text-white px-4 font-semibold shadow-md rounded-md' onClick={handleSubmit}>Submit</Button>
                            <Button className='bg-blue-500 text-white px-4 font-semibold shadow-md rounded-md' onClick={resetForm}>Reset</Button>
                        </div>
                    </Modal.Footer>
                }
            </Modal>
        </div>
    );
}

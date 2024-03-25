import { useState, useRef, useEffect } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import ModalComponent from './Modal';

const Task = ({ id, title, description, team, asignee, priority, status }) => {
    const [openModal, setOpenModal] = useState(false);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState("Edit");

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        // console.log("clicked");
        document.addEventListener('mousedown', handleClickOutside);
        // cleanup fn
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='bg-gray-300 px-3 py-2 border border-black mx-2 mt-2 mb-5 rounded-md'>
            <div className="flex gap-3">
                <h3>{title}</h3>
                <span className='ml-auto bg-blue-500 cursor-pointer py-1 px-3 rounded-sm text-white '>{priority}</span>
            </div>
            <hr className='bg-black h-[2px] my-1' />
            <p>{description}</p>
            <div className="flex">
                <p>@{asignee}</p>
                <button
                    ref={dropdownRef}
                    className='relative ml-auto bg-blue-500 cursor-pointer py-1 px-3 rounded-sm text-white'><CiMenuKebab
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <ul>
                                    <li
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setOpenModal(true)
                                            setIsOpen(false)
                                            setModalType("Edit")
                                        }}
                                        role="menuitem" >
                                        Edit
                                    </li>
                                    <li
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setOpenModal(true)
                                            setIsOpen(false)
                                            setModalType("Delete")
                                        }}
                                        role="menuitem" >
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </button>
            </div>
            <button
                className='bg-blue-500 cursor-pointer py-1 px-3 rounded-sm text-white'>{status}</button>
            <ModalComponent
                id={id}
                myteam={team}
                myasignee={asignee}
                mypriority={priority}
                mystatus={status}
                mytitle={title}
                mydescription={description}
                Type={modalType}
                openModal={openModal}
                setOpenModal={setOpenModal} />

        </div>
    )
}

export default Task

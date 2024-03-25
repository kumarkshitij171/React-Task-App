import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from "./components/Card";
import ModalComponent from "./components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { changeInitalState } from "./features/task/taskSlice";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [assigneeFilter, setAsigneeFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState('');
  const AllTask = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    if (priorityFilter.length === 0) {
      dispatch(changeInitalState(AllTask));
      return;
    }
    const filterTask = AllTask
      .filter((task) =>
        task
          .priority
          .toLowerCase()
          .includes(priorityFilter
            .toLowerCase()
          )
      )
    dispatch(changeInitalState(filterTask))
  }, [priorityFilter])



  useEffect(() => {
    if (assigneeFilter.length == 0) {
      dispatch(changeInitalState(AllTask));
      return;
    }
    const filterTask = AllTask
      .filter((task) =>
        task
          .asignee
          .toLowerCase()
          .includes(assigneeFilter
            .toLowerCase()
          )
      )
    dispatch(changeInitalState(filterTask))

  }, [assigneeFilter])

  return (
    <>
      <div className="mx-3 mt-2 flex  items-center ">
        <div className="text-xl font-bold">
          Task Board
        </div>
        <div className="ml-auto bg-white rounded-full text-black p-3 cursor-pointer">
          <FaUser className="h-7 w-7" /></div>
      </div>

      <div className="mx-3 mt-5 border border-white min-h-60 rounded-md">
        <div className="filterBy flex mt-3 flex-wrap items-center">
          <div className="mx-3">
            FilterBy:
          </div>
          <input
            className="p-2 rounded-md"
            placeholder="Asignee Name"
            value={assigneeFilter}
            onChange={e => setAsigneeFilter(e.target.value)}
          />
          <Autocomplete
            disablePortal
            className="border border-gray-300 rounded-md m-2 bg-white"
            id="combo-box-demo"
            options={PriorityList}
            size="small"
            inputValue={priorityFilter}
            onInputChange={(event, newInputValue) => {
              setPriorityFilter(newInputValue);
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Priority" />}
          />
          <input
            type="date"
            placeholder="Search"
            className="border border-gray-300 rounded-md p-1 m-2" />

          <button
            className="bg-blue-500 py-2 px-5 rounded-md text-white font-semibold ml-auto mr-4"
            onClick={() => {
              setOpenModal(true)
            }}
          >Create Task</button>
        </div>
        <div className="filterBy flex mt-3 flex-wrap items-center">
          <div className="mx-3">
            Sort By:
          </div>

          <Autocomplete
            disablePortal
            className="border border-gray-300 rounded-md m-2 bg-white"
            id="combo-box-demo"
            options={SortList}
            size="small"
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Priority" />}
          />

        </div>
        <div className="flex flex-wrap">

          <Card bgCol={"bg-gray-500"} Topic={"Pending"} />
          <Card bgCol={"bg-yellow-500"} Topic={"Inprogress"} />
          <Card bgCol={"bg-green-500"} Topic={"Progress"} />
          <Card bgCol={"bg-indigo-500"} Topic={"Deployed"} />
          <Card bgCol={"bg-orange-500"} Topic={"Differed"} />
        </div>
      </div>

      <ModalComponent
        Type={"Create"}
        openModal={openModal}
        setOpenModal={setOpenModal} />
    </>
  )
}
const PriorityList = [
  { label: "P0" },
  { label: "P1" },
  { label: "P2" },
]

const SortList = [
  { label: "Priority" },
  { label: "Asignee" },
  { label: "Team" },
]



export default App

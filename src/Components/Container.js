import React, {useState} from "react";
import { DragDropContext} from "react-beautiful-dnd";
import Column from "./Column";

const Container = () => {

  const [requirement, setRequirement] = useState([
    {
      id: "1",
      title: "TAREA 1",
      status: 0,
      type: 0,
      description: "",
      assignedto: {
        userId: "",
        name: "",
        lastname: "",
      },
      parent: 0,
    },
    {
      id:"2",
      title: "TAREA 2",
      status: 0,
      type: 0,
      description: "",
      assignedto: {
        userId: "",
        name: "",
        lastname: "",
      },
      parent: 0,
    },
    {
      id: "3",
      title: "TAREA 3",
      status: 0,
      type: 0,
      description: "",
      assignedto: {
        userId: "",
        name: "",
        lastname: "",
      },
      parent: 0,
    },
  ]);

  const [todo, setTodo] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [inprogress, setInprogress] = useState([])

  const reorder = (requirement, startIndex, endIndex) => {
    const result = Array.from(requirement);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  const crud = {

    requirement: {
      add: (element) => {
        setRequirement(prevState=> [...prevState, element]);
      },
      remove: (element) => {
        const [removed] = requirement.splice(element.source.index, 1);
        return removed;
      }
    },
    todo: {
      add: (element) => {
        setTodo(prevState=> [...prevState, element]);
      },
      remove: (element) => {
        const [removed] = todo.splice(element.source.index, 1);
        return removed;
      }
    },
    blocked: {
      add: (element) => {
        setBlocked(prevState=> [...prevState, element]);
      },
      remove: (element) => {
        const [removed] = blocked.splice(element.source.index, 1);
        return removed;
      }
    },
    inprogress: {
      add: (element) => {
        setInprogress(prevState=> [...prevState, element]);
      },
      remove: (element) => {
        const [removed] = inprogress.splice(element.source.index, 1);
        return removed;
      }
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }

    /* console.log(result)
    console.log(result.source.droppableId);
    console.log(crud[result.source.droppableId]); */
    const removed = crud[result.source.droppableId].remove(result);//para acceder dinamicamente usa corchetes
    crud[result.destination.droppableId].add(removed);
  };
  
  const handleAddElement = (e) => {
    console.log(e);
    e.preventDefault();
    const value = document.getElementById("add").value;
    
    if (!value) {
      return;
    }
    
    const request = {
      id: Math.random()+"",
      title: value,
      status: 0,
      type: 0,
      description: "",
      assignedto: {
        userId: "",
        name: "",
        lastname: "",
      },
      parent: 0,
    }
    crud.requirement.add(request);

  }
  

  return (
    <div >
      <h1>TO DO LIST</h1>
      <input type="text" placeholder="ADD" id="add"/>
      <button onClick={handleAddElement}>ADD</button>


      <div className="d-flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <Column data={requirement} droppableId="requirement" example={"prueba"}/>
        <Column data={todo} droppableId="todo"/>
        <Column data={blocked} droppableId="blocked"/>
        <Column data={inprogress} droppableId="inprogress"/>
      </DragDropContext>

      </div>
    </div>
  );
};

export default Container;

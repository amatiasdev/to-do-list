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
  ]);

  const [todo, setTodo] = useState([]);

  const reorder = (requirement, startIndex, endIndex) => {
    const result = Array.from(requirement);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const dragEndTodo = (result, source) => {
    console.log(result);

    let removed; 
    switch (source) {
      case 'todo':
        [removed] = todo.splice(result.source.index, 1);
        setRequirement(prevState=> [...prevState, removed]);
        break;
      case 'requirement':
        [removed] = requirement.splice(result.source.index, 1);
        setTodo(prevState=> [...prevState, removed]);
        break;
        default:
    }
    

  }

  const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }

    switch (result.destination.droppableId) {
        case "todo":
          dragEndTodo(result, result.source.droppableId);
        break;
        case "requirement":
          dragEndTodo(result, result.source.droppableId);
        break;
        default:
          console.log("No droppableId");
        break;
    }

    
  };

  return (
    <div >
      <h1>TO DO LIST</h1>
      <div className="d-flex">
      <DragDropContext onDragEnd={onDragEnd}>
        <Column data={requirement} droppableId="requirement"/>
        <Column data={todo} droppableId="todo"/>
      </DragDropContext>

      </div>
    </div>
  );
};

export default Container;

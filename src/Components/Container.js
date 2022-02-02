import React, { useState, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Modal from "./Modal";

const Container = () => {
  const inputRef = useRef(null);
  const [requirement, setRequirement] = useState([]);
  const [todo, setTodo] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [elementSelect, setElementSelect] = useState(null);

  const reorder = (array, startIndex, element) => {
    /* array.splice(startIndex, 0, element); // does not work to update the state
    return array; */

    const result = Array.from(array); // make a copy of the array important to update the state
    result.splice(startIndex, 0, element); // add the element
    return result; // return the new array
  };

  const crud = {
    requirement: {
      add: (element, result) => {
        setRequirement((prevState) => {
          const newArr = reorder(prevState, result.destination.index, element);
          console.log(newArr);
          return newArr;
        });
      },
      remove: (element) => {
        const [removed] = requirement.splice(element.source.index, 1);
        return removed;
      },
      update: (element) => {},
    },
    todo: {
      add: (element, result) => {
        setTodo((prevState) =>
          reorder(prevState, result.destination.index, element)
        );
      },
      remove: (element) => {
        const [removed] = todo.splice(element.source.index, 1);
        return removed;
      },
    },
    blocked: {
      add: (element, result) => {
        setBlocked((prevState) =>
          reorder(prevState, result.destination.index, element)
        );
      },
      remove: (element) => {
        const [removed] = blocked.splice(element.source.index, 1);
        return removed;
      },
    },
    inprogress: {
      add: (element, result) => {
        setInprogress((prevState) =>
          reorder(prevState, result.destination.index, element)
        );
      },
      remove: (element) => {
        const [removed] = inprogress.splice(element.source.index, 1);
        return removed;
      },
    },
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const removed = crud[result.source.droppableId].remove(result); //para acceder dinamicamente usa corchetes
    crud[result.destination.droppableId].add(removed, result);
  };

  const handleAddElement = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    if (!value) {
      return;
    }

    const request = {
      id: Math.floor(Math.random() * 100000000) + "",
      title: value,
      status: "requirement",
      type: 0,
      description: "",
      assignedto: {
        userId: "",
        name: "",
        lastname: "",
      },
      parent: 0,
    };
    crud.requirement.add(request, {
      destination: {
        index: requirement.length,
      },
    });
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>TO DO LIST</h1>
      <input
        type="text"
        ref={inputRef}
        placeholder="Agregar nueva tarea"
        id="add"
        className="input-add"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAddElement(e);
          }
        }}
      />
      <button onClick={handleAddElement} className="btn-add">
        <i className="fas fa-plus"></i>
        <span>Agregar</span>
      </button>

      <div className="d-flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <Column
            data={requirement}
            droppableId="requirement"
            setElementSelect={setElementSelect}
          />
          <Column
            data={todo}
            droppableId="todo"
            setElementSelect={setElementSelect}
          />
          <Column
            data={blocked}
            droppableId="blocked"
            setElementSelect={setElementSelect}
          />
          <Column
            data={inprogress}
            droppableId="inprogress"
            setElementSelect={setElementSelect}
          />
        </DragDropContext>
        <Modal
          show={!!elementSelect}
          onHide={() => setElementSelect(null)}
          element={elementSelect}
          crud={crud}
        />
      </div>
    </div>
  );
};

export default Container;

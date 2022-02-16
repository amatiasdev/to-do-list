import React, { useState, useRef, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Modal from "./Modal";

const Container = () => {
  const API_URL = "http://localhost:5000/api/tasks";
  const inputRef = useRef(null);
  const inputDescRef = useRef(null);
  const [requirement, setRequirement] = useState(null);
  const [todo, setTodo] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [elementSelect, setElementSelect] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const newData = data.map((item) => ({ ...item, id: item._id }));
        setRequirement(newData);
      })
      .catch((error) => {
        setRequirement([]);
      });
  }, []);

  const reorder = (array, startIndex, element) => {
    /*  array.splice(startIndex, 0, element); // does not work to update the state
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
          /*  console.log(newArr) */ return newArr;
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
    console.log(inputDescRef);
    const description = inputDescRef.current.value;

    if (!value) {
      return;
    }

    const request = {
      title: value,
      status: "requirement",
      type: 0,
      description,
      /* assignedto: {
        userId: "",
        name: "",
        lastname: "",
      }, */
      parent: 0,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => response.json())
      .then((response2) => {
        crud.requirement.add(
          { ...response2, id: response2._id },
          {
            destination: {
              index: requirement.length,
            },
          }
        );
        inputRef.current.value = "";
        inputRef.current.focus();
        inputDescRef.current.value = "";
      });
  };

  return Array.isArray(requirement) ? (
    <div>
      <div className="container-cont">
        <div className="title-big">
          <h1>TO DO LIST</h1>
          <i class="fas fa-check-circle"></i>
        </div>
        <input
          type="text"
          ref={inputRef}
          placeholder="Agregar nueva tarea"
          className="input-add"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddElement(e);
            }
          }}
        />
        <input
          type="text"
          ref={inputDescRef}
          placeholder="Describe la tarea please"
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
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Container;

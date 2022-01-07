import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Container = () => {
  const containers = [
    {
      id: 1,
      name: "Parent",
      className: "parent",
    },
    {
      id: 2,
      name: "To Do",
      className: "to-do",
    },
    {
      id: 3,
      name: "Blocked",
      className: "bloked",
    },
    {
      id: 4,
      name: "In Progress",
      className: "in-progress",
    },
    {
      id: 5,
      name: "Done",
      className: "done",
    },
  ];

  const [list, setList] = React.useState([
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

  const reorder = (list, startIndex, endIndex) => {
      console.log(list);
    const result = Array.from(list);
    console.log(Array.from(result));
    const [removed] = result.splice(startIndex, 1);

    console.log(Array.from(result));
    console.log(removed);
    result.splice(endIndex, 0, removed);
    
    console.log(Array.from(result));
    return result;
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
        return;
    }
    

    const reorderItems = reorder(
        list,
        result.source.index,
        result.destination.index
      );
  

    setList(reorderItems);
    
  };

  return (
    <div>
      <h1>TO DO LIST</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {
                list.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        {item.title}
                        </div>
                    )}
                    </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Container;

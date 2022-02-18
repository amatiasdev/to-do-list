import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card({ item, index, provided, setElementSelect }) {

  const handleDelete = (e) => { 
    e.stopPropagation();
    if(window.confirm("¿Está seguro de eliminar este elemento?")){
      fetch(`http://localhost:5000/api/tasks/${item.id}`, {
        method: "DELETE", //ELIMINA, REQUIERE ID
      }).then((response) => {
        response.json()
      }).then((data) => {
        console.log("ELEMENTO ELIMINADO");
      }).catch((error) => {console.log(error)});
    }
  }

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => setElementSelect(item)}
          className="card"
        >
          <div className="title-card">
            <span className="title-icon">
              <div>
                <i className="fas fa-journal-whills"/>
              </div>
            </span>
            <div className="title" field="System.Title">
              <span className="clickable-title" role="button">
                {item.title}
              </span>
              <i className="fas fa-trash cursor-pointer" onClick={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;

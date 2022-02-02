import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card({ item, index, provided, setElementSelect }) {
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
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;

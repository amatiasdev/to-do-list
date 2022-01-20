import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";

function Column({
    data=[],
    droppableId="requirement", //asigna valor por default
    ...props
}) {

  /* function Column(props){
 */

    console.log(props.example)
    return (
        <Droppable droppableId={droppableId}>
          {
            (provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className='column'>
              {
                data.map((item, index) => (
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
    )
}

export default Column

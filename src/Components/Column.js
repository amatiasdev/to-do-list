import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";

function Column({
    data=[],
    droppableId="requirement", //asigna valor por default,
    elementSelect,
    setElementSelect
}) {

  /* function Column(props){
 */

    



    return (
      <>
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
                          onClick={()=>setElementSelect(item)}
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
      </>
    )
}

export default Column

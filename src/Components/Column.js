import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Card from './Card';

function Column({
    data=[],
    droppableId="requirement", //asigna valor por default,
    elementSelect,
    setElementSelect
}) {

    return (
      <>
        <Droppable droppableId={droppableId}>
          {
            (provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className='column'>
              {
                data.map((item, index) => (
                  <Card key={item.id} item={item} index={index} provided={provided} setElementSelect={setElementSelect}/>   
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

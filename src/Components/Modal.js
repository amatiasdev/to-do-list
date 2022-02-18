import React, { useRef, useState } from "react";
import { Modal as ModalB } from "react-bootstrap";

function Modal({ show, onHide, element, crud }) {
  const API_URL = "http://localhost:5000/api/tasks";
  const titleRef = useRef();
  const [description, setDescription] = useState(element?.description);

  const handleUpdate = (e) => {
    e.preventDefault();
    const request = {
      title: titleRef?.current?.value,
      status: element?.status,
      type: element?.type,
      description,
      parent: element?.parent,
    };

    fetch(API_URL + "/" + element?.id, {
      method: "PUT", //ACTUALIZA REQUIERE ID
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then(response => {
        response.json();
      }).then(response2 => {/* 
        crud[element.status].update(
          request,
        ); */
        onHide();

      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <ModalB show={show} onHide={onHide}>
      <ModalB.Header closeButton>
        <ModalB.Title>{element?.title}</ModalB.Title>
      </ModalB.Header>
      <ModalB.Body>
        <input defaultValue={element?.title} ref={titleRef} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
      </ModalB.Body>
    </ModalB>
  );
}

export default Modal;

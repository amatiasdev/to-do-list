import React from "react";
import { Modal as ModalB } from "react-bootstrap";

function Modal({ 
    show, onHide, element 
}) {
  return (
    <ModalB show={show} onHide={onHide}>
        <ModalB.Header closeButton>
          <ModalB.Title>{element?.title}</ModalB.Title>
        </ModalB.Header>
        <ModalB.Body>
            <p>{element?.description}</p>
            <p>{element?.assignedto?.name}</p>
        </ModalB.Body>
      </ModalB>
  );
}

export default Modal;

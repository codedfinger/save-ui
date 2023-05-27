import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AddButton } from "../../../../../../SubComponents/Button";
import { Modal } from "react-bootstrap";
import AddProduceForm from "./AddProduceForm";

export const AddProduceModal = ({ show, setShow, update, setUpdate }) => {
  const handleForm = () => setShow(true);
  const handleFormClose = () => setShow(false);

  return (
    <div>
      <Tooltip title="add" arrow>
        <div className="button">
          <AddButton onClick={handleForm} />
        </div>
      </Tooltip>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add item"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-item" className="basic-title-left basic-lg">
            Add new item to inventory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduceForm
            handleFormClose={handleFormClose}
            update={update}
            setUpdate={setUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

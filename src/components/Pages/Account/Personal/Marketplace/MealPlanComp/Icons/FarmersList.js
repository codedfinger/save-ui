import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import FarmerListInfo from "./FarmerListInfo"
import { useTranslation, Trans } from 'react-i18next';

export function FarmersList({
  list,
  cart,
  show,
  setShow,
  forceUpdate,
}) {
  const { t } = useTranslation();

  const handleFormClose = () => setShow(false);
  return (
    <Modal
      show={show}
      onHide={handleFormClose}
      size="lg"
      aria-labelledby="edit meal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-meal">{t('description.order')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FarmerListInfo 
          list={list}
          cart={cart}
          forceUpdate={forceUpdate}
          handleFormClose={handleFormClose}
        />
      </Modal.Body>
    </Modal>
  );
}

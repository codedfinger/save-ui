import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { editPurchaseStatusFromUser, editPurchaseStatusOnUser } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useTranslation, Trans } from 'react-i18next';

//takes props value, meal(name), ingredients, id and onChange(change of value)
function ConfirmItemIcon(props) {
  const { t } = useTranslation();

  const [showModal, setShow] = useState(false);

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      refID: props.refID,
      id: props.id,
      status: "CONFIRMED",
    };
    props.editPurchaseStatusFromUser(data);
    props.editPurchaseStatusOnUser(data);
    console.log("what id", data.id)

    submitNotification("Success", "You will be contacted shortly");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="Confirm Item">
        <IconButton
          aria-label="Confirm Item"
          sx={{ ml: 2 }}
          onClick={handleShow}
        >
            <ThumbUpAltIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.button_confirm')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.accept_and_process')}</h5></p>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          handleSelect()
          handleClose()
        }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" 
            onClick={handleClose}
          >
            {t('description.button_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPurchaseStatusFromUser: (data) => dispatch(editPurchaseStatusFromUser(data)),
    editPurchaseStatusOnUser: (data) => dispatch(editPurchaseStatusOnUser(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmItemIcon);

import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button, Card } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfo } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import SendToFarmerIcon from "./SendToFarmerIcon";

function FarmerListInfo(props) {
  const { t } = useTranslation();

  const [farmers, setFarmers ] = useState(props.list)

 // console.log("this is farmers", farmers)
  
  return (
    <>
      {props.cart.length ? (
        <>
        
          <List>
            {props.list.map((item, index) => (
              <Card body>
                 <>
              <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >

                <p>{item.farmerName}</p>                     
              </ListItem>
              {item.farmerProducts.map((res) => (

                <ListItem
                  key={`res${index}`}
                  className="list"
                >
                  <ListItemText primary={res.product.item} secondary={res.product.quantity + res.product.measure}/>   
                    <p><b>{res.product.currency} </b></p>
                    <p><b>{res.product.price}</b> </p>

                </ListItem>
              ))}  

              </>

              <SendToFarmerIcon 
								farmerId={item.farmerId}
								uid={item.uid}
								cart={props.cart}
								/>
              </Card>
             
            ))}
          </List>
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>{t('description.farmer_list_info')} :( </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    info: state.mealPlan.purchaseInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfo: (data) => dispatch(getPurchaseInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmerListInfo);

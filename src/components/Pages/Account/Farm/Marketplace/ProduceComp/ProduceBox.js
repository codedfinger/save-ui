import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Delete from "./Icons/DeleteIcon";
import Edit from "./Icons/EditIcon";

export default function ProduceBox(props) {

  console.log("lets fetch all produce ==> ", props.produce)
  return (
    <>
      {props.produce.map((newProduce, index) => (
        <div className="meal-box" key={`produce-box${index}`}>
          <div className="ingredients">

            <List
              key={`prod${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newProduce.meal}</div>
                <div className="meal-type">{newProduce.farmType}</div>
                <div className="icons">
                  <Delete
                    value={props.value}
                    id={newProduce.id}
                    forceUpdate={props.forceUpdate}
                  />
                    <Edit
                      produce={newProduce}
                      id={newProduce.id}
                      forceUpdate={props.forceUpdate}
                    />
                </div>
              </ListSubheader>

                <ListItem
                  key={`item${index}`}
                  className="list"
                  style={{ alignItems: "baseline" }}
                >
                    <div>
                      <p>
                        {newProduce.item}
                      </p>
                      <p>
                        {newProduce.quantity} {newProduce.measure}
                      </p>
                      <p>
                      {newProduce.currency} {newProduce.price} 
                      </p>
                      <p><b>Date of Yield: </b>{newProduce.date}</p>
                    </div>
                </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Alert, Table, Modal } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { 
  addToPurchaseItemsRes, 
  getShoppingListUpdateRes, 
  addToShoppingListUpdateRes, 
  getPlanData, 
  getShoppingListRes, 
  getInventoryRes 
} from "../../../../../../store/actions/marketplaceActions/restaurantData";
// import { addToPurchaseItems } from "../../../../../../../store/actions/dataActions";
import { useTranslation, Trans } from 'react-i18next';

import BoughtItemIcon from "../Icons/BoughtItemIcon";
import Edit from "../Icons/EditIconShop";
import EditAddedItems from "../Icons/EditIconShopAddedItems";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import moment from "moment";
import { submitNotification } from "../../../../../lib/Notifications";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function ShopItems(props) {
  
  // console.log("All hail props", props)

  const { t } = useTranslation();


  const [list, setList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [showModal, setShow] = useState(false);
  const [showModalList, setShowList] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [clicked, setClicked] = useState(false)

  //this sends data request
  useEffect(() => {
    props.getInventoryRes();
  }, [props.value, props.update]);

  useEffect(() => {
    forceUpdate()
  }, [props.data]);

  const getInventoryList = async () => {
    //clears the items array before each update- IMPORTANT
    setInventory([]);

    //sets a new item object in the array for every document
    props.inventory.forEach((doc) => {
      // id is the docref for deletion
      var item = doc.item;
      var measure = doc.measure;
      var quantity = doc.quantity;

      setInventory((list) => [
        ...list,
        {
          item: item,
          quantity: quantity,
          measure: measure,
        },
      ]);
    });
  };

  //this sends data request
  useEffect(() => {
    getInventoryList();
    //console.log("xx======>>>>>", inventory)
  }, [props.update]);

  //trigger this when editing/deleting items
 const [update, setUpdate] = useState(0);
 
 const forceUpdate = () => {
   setUpdate(update + 1);
 };

 function notify(ingr){
  submitNotification(`${ingr}` + " added to cart");
 }
// refresh button
 function Refresh() {
  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          aria-label="Refresh"
          sx={{ ml: 2 }}
          onClick={() => {
            forceUpdate();
            submitNotification("Refreshing..");
          }}
        >
          <SyncIcon style={{ fontSize: 35 }} 
          />
        </IconButton>
      </Tooltip>
  </>
  );
 }

 const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const [cart, setCart] = useState([]);

//add item to cart
const addToCart = (ingr) => {
  setCart([...cart, ingr]);
  };

  const removeFromCart = (ingr) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== ingr.id);
    setCart(hardCopy);
    };

  const cartItems = cart.map((ingr, index) => (
    <List>
      <ListItem
          key={`ingr${index}`}
          className="list"
          style={{ alignItems: "flex-end" }}
        >      
        <b>{`${ingr.data}: `}  </b> &nbsp; {`${ingr.quantity} ${ingr.measure}`} &nbsp;
        {/* <input type="text" value={ingr.data} /> */}
        {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
        <Tooltip title="Remove">
                    <IconButton
                      aria-label="Remove"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        removeFromCart(ingr)
                      }}
                    >
                      <HighlightOffIcon fontSize="50"/>
                    </IconButton>
                  </Tooltip>
      </ListItem>
    </List>
    ));

    const PurchaseItem = () => {

      const cartList = cart
  
      const data = {
  
        upload: {
         cartList,
          profile: props.profile,
          // FirstName: props.profile.firstName, 
          // LastName: props.profile.lastName,
          // Country: props.profile.country,
          // City: props.profile.city,
          // Email: props.profile.email,
          date: props.value.format("YYYY/MM/DD"),
          status: "pending"
        }
       
      };

      props.addToPurchaseItemsRes(data);
    submitNotification("Thanks for placing your order with us", "We will contact local sustainable farmers and grocery shops and get back to you shortly with prices and delivery time");

    }

    const AllPurchaseItem = () => {

      const firstList = allList
      const secondList = newList 
  
      const data = {
  
        upload: {
          firstList,
          secondList,
          profile: props.profile,
          // FirstName: props.profile.firstName, 
          // LastName: props.profile.lastName,
          // Country: props.profile.country,
          // City: props.profile.city,
          // Email: props.profile.email,
          date: props.value.format("YYYY/MM/DD"),
          status: "pending"
        }
       
      };

      props.addToPurchaseItems(data);
    submitNotification("Order Successful", "You will be contacted shortly..");

    }
  

useEffect(() => {
  console.log("cart", cart);
}, [cart]);

  //this sends data request
  useEffect(() => {
    props.getPlanData();
  }, [props.value, update]);

  //const year = props.value.format("YYYY")

  // This sends data request
  useEffect(() => {
    const data = {
      week: moment().week(),
    };

    props.getShoppingListRes(data);
    props.getShoppingListUpdateRes(data);
  }, [props.value, update]);

  // shopping list added by user using the add button
  const ShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setAllList([]);

    //sets a new meal object in the array for every document with this date attached
    props.ShoppingList.forEach((doc) => {

      
      //id is the docref for deletion
      var id = doc.id;
      var food = doc.item.food;
      var data = doc.item.data;
      var quantity = doc.item.quantity;
      var measure = doc.item.measure;
      var week = doc.item.week;

      setAllList((list) => [
        ...list,
        {
          food: food,
          data: data,
          measure: measure,
          quantity: quantity,
          week: week,
          id: id,
        },
      ]);
    });
  };

  // shopping list from ingredient of generated meal plan
  const newShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setNewList([]);

    //sets a new meal object in the array for every document with this date attached
    props.newShoppingList.forEach((doc) => {

      //id is the docref for deletion
      var id = doc.id;
      var food = doc.item.food;
      var data = doc.item.data
      var quantity = doc.item.quantity;
      var measure = doc.item.measure;
      var week = doc.item.week;

      setNewList((list) => [
        ...list,
        {
          food: food,
          data: data,
          measure: measure,
          quantity: quantity,
          week: week,
          id: id,
        },
      ]);
    });
  };


  useEffect(() => {
    ShoppingList();
    newShoppingList();
  }, [props.UpdatedShoppingList, props.newShoppingList]);

// fetch ingredient list from added meals in plan
  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    if (props.newPlans == undefined || props.newPlans == '' ) return (<div><p>Loading...</p></div>)


    //sets a new meal object in the array for every document with this date attached
    props.newPlans.forEach((doc ) => {

      const items = doc.ingredients

      items.forEach((data) => {
        //we dont need the ID from the food item yet since we are not relating them
        //var id = doc.id
        var start = moment(doc.start).utc().format('YYYY-MM-DD')
        var item = data.food
        var quantity = data.quantity;
        var measure = data.measure;

        setList((list) => [
          ...list,
          {
            week: moment(start, "YYYY-MM-DD").week(),
            data: item,
            food: item + " " + quantity + " " + measure,
            measure: measure,
            quantity: quantity,
          },
        ]);
      })
        
    });
  };

  useEffect(() => {
    updateShoppingList();
  }, [props.newPlans, update]);

  function getFilteredProducts() {
    return list.filter(product => {
      const week = props.value.format("w")
    
      return week == product.week;
    });
  }

  useEffect(() => {
    getFilteredProducts();
  }, [props.newPlans]);
 
// filter products based on similar meal name
const result = Object.values(
  getFilteredProducts().reduce((acc, item) => {
    acc[item.data] = acc[item.data]
      ? { ...item, quantity: item.quantity + acc[item.data].quantity }
      : item;
    return acc;
  }, {})
);

//setNewResult(result)
//console.log("difference =>", result);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //modal for generate new shopping list
  const handleCloseList = () => setShowList(false);
  const handleShowList = () => setShowList(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Close = () => {
    setOpen(false);
  };


  function test() {
    let check = [];

   const diff = result.filter(({ data: id1 }) => !inventory.some(({ item: id2 }) => id2 === id1));

    // console.log("checked the common:",diff);

    diff.forEach(data => { check.push(data)})

    result.forEach(opt => {
      inventory.forEach(item => {
        if (opt.data == item.item) {
          check.push({
            data: opt.data,
            food: opt.food,
            measure: opt.measure,
            quantity: opt.quantity - item.quantity,
            week: opt.week
          }) 
        }
      });
    });        

    setShoppingList(check)

    // console.log("checkked ther loop bruh:",check);

  }

  useEffect(() => {
    test();
  }, [props.newPlans]);
  //add item to new shopping list
const addToList = () => {

  const data = {

    week: moment().week(),
    upload: {
      result: shoppingList
    },
  };
  // console.log("chhhh", data)
    props.addToShoppingListUpdateRes(data)
    setShow(false);
  }
 

  return (
    <>
     <Button className="blue-btn shadow-none" variant="contained" onClick={handleClickOpen}>
      {t('description.button_all')} 
     </Button>
      <Refresh />

      {newList.length ? (
        <>
          <List>
            {allList.map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                  {ingr.data} {ingr.quantity} {ingr.measure}
                    </p>
                    <br />

                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                <div className="icons">

                  {/* <AddToCartIcon 
                   item={ingr.data}
                   measure={ingr.measure}
                   quantity={ingr.quantity}
                  />  */}
                  <Tooltip title="Add to cart">
                    <IconButton
                      aria-label="Add to cart"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        notify(ingr.data);
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="25" />
                    </IconButton>
                  </Tooltip>


                  <BoughtItemIcon 
                   value={props.value}
                   food={ingr.food}
                   item={ingr.data}
                   id={ingr.id}
                   measure={ingr.measure}
                   quantity={ingr.quantity}
                   update={update}
                   setUpdate={setUpdate}
                  /> 

                  <EditAddedItems
                    value={props.value}
                    food={ingr.food}
                    data={ingr.data}
                    week={ingr.week}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 


                  
                  
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>

          <List>
            {newList.map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                    {ingr.data} {ingr.quantity} {ingr.measure}
                    </p>
                    <br />


                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                <div className="icons">
                
                  <Tooltip title="Add to cart">
                    <IconButton
                      aria-label="Add to cart"
                      sx={{ ml: 2 }}
                      onClick={(e) => {
                        addToCart(ingr)
                        notify(ingr.data);
                        e.target.disabled = true;
                      }}
                    >
                      <AddCircleOutlineIcon fontSize="25" />
                    </IconButton>
                  </Tooltip>

                  <BoughtItemIcon 
                    value={props.value}
                    food={ingr.food}
                    item={ingr.data}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  <Edit
                    value={props.value}
                    food={ingr.food}
                    data={ingr.data}
                    week={ingr.week}
                    id={ingr.id}
                    measure={ingr.measure}
                    quantity={ingr.quantity}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>

          <Stack spacing={2} direction="row" style={{justifyContent: 'center'}}>
            <Button className="blue-btn shadow-none" type="submit"
              onClick={handleShow}>
                {t('description.button_view_cart')} 
            </Button>

            <Button className="blue-btn shadow-none" variant="contained" onClick={handleClickOpen}>
              {t('description.button_all')} 
            </Button>
          </Stack>

          
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.list_of_items')} </Modal.Title>
          </Modal.Header>
        <Modal.Body>
            {cartItems}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          PurchaseItem()
          setCart([])
          handleClose()
          }}>
            {t('description.button_confirm')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('description.button_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="empty basic-title-left">
          <p>{t('description.regenerate_shop_list')}</p>
          <Button className="blue-btn shadow-none" type="submit"
            onClick={handleShowList}>
              {t('description.button_generate')}
          </Button>

          <Modal show={showModalList} onHide={handleCloseList}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.generate_shop_list')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            {t('description.generate_new_list')}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=> {
          addToList()
          submitNotification("Generating new list..");

          }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" onClick={handleCloseList}>
            {t('description.button_no')}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {t('description.order_food_items')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Close}>{t('description.button_cancel')}</Button>
          <Button onClick={() => {
            AllPurchaseItem()
            Close()
          }} 
            autoFocus>
            {t('description.button_yes')}
          </Button>
        </DialogActions>
      </Dialog>
          
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list yet :( please refresh page{t('description.list_of_items')}</p>
          <Button className="blue-btn shadow-none" type="submit"
            onClick={handleShow}>
              Generate{t('description.list_of_items')}
          </Button>

          <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.no_items_shop')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            {t('description.generate_new_list')}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=> {
          addToList()
          submitNotification("Generating new list..");
          }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {t('description.button_no')}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ShoppingList: state.restaurant.shoppingList,
    newShoppingList: state.restaurant.newShoppingList,
    // shoppingList: state.mealPlanner.allItems,
    newPlans: state.restaurant.newPlans,
    profile: state.firebase.profile,
    inventory: state.mealPlan.inventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingListRes: (product) => dispatch(getShoppingListRes(product)),
    getShoppingListUpdateRes: (product) => dispatch(getShoppingListUpdateRes(product)),
    addToShoppingListUpdateRes: (data) => dispatch(addToShoppingListUpdateRes(data)),
    getPlanData: (plan) => dispatch(getPlanData(plan)),
    addToPurchaseItemsRes: (data) => dispatch(addToPurchaseItemsRes(data)),
    getInventoryRes: (item) => dispatch(getInventoryRes(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
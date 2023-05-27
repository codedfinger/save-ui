import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "./Html5QrcodeScanner";
import ResultContainerPlugin from "./ResultContainerPlugin";
import "./QRCode.css";
import { backdropClasses } from "@mui/material";
import { Form, InputGroup, Button, Alert, Table } from "react-bootstrap";
import "../Button.css"
import { createMealPlannerDataRes } from "../../../store/actions/marketplaceActions/restaurantData";
import { connect } from "react-redux";
import { ContactlessOutlined, SubscriptionsOutlined } from "@mui/icons-material";
import { submitNotification } from "../../lib/Notifications";

const app_id = "5532003c";
const app_key = "511d39184173c54ebc5d02a5063a7b87";
  const limit = "5";

function Scanner(props) {
  const [decodedResults, setDecodedResults] = useState([]);
  const [mealName, setMealName] = useState("");
  const [error, setError] = useState(null)
  const [ingredients, setIngredients] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [totalDaily, setTotalDaily] = useState([]);
  const [totalNutrients, setTotalNutrients] = useState([]);
  const [recipeYield, setRecipeYield] = useState([]);
  const [url, setUrl] = useState([]);



 
  const onNewScanResult = (decodedText, decodedResult) => {

    fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedResult.decodedText}.json`)
    .then(response => response.json())
    .then(data => {
      //setIngredientList(data.product.ingredients)      
      let query;
      //var query = data.product.product_name_en
      //console.log ("checking:", query)

      if (data.product.product_name_en == undefined) {
         query = data.product.product_name
         setMealName(query)
      } else {
        query = data.product.product_name_en
        setMealName(query)
      }

      return fetch(`https://api.edamam.com/api/recipes/v2?app_id=${app_id}&app_key=${app_key}&type=public&q=${query}`)
      })
      .then(res => res.json())
      .then(newData => {
        console.log("name:", newData.hits)
        setRecipeList(newData.hits)
        //setTotalDaily(newData.hits.recipe.totalDaily)
        //setTotalNutrients(newData.hits.recipe.totalNutrients)
        //setRecipeYield(newData.hits.recipeYield)
        //setMealType(newData.hits.MealType)



      })
    .catch((err => {
      console.log(err.message)
      setError(err.message)
    }))
    .catch((err) => {
      console.log(err.message)
      setError(err.message)
     });


  };

  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g",
    foodId: "",
  };

  const [local, setLocal] = useState(defaultLocal);
  

  const handleRecipe = (e) => {
    setLocal((local.food = e.target.value));
    setIngredients((ingredients) => [...ingredients, local]);
    setLocal(defaultLocal);
  };

  const handleMealName = (e) => {
   setMealName(e.target.value)
  };

  useEffect(() => {
    console.log("ingredients", ingredients);
  }, [ingredients]);

 //trigger this when editing/deleting items
 const [update, setUpdate] = useState(0);
 const forceUpdate = () => {
   setUpdate(update + 1);
 };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      //month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      week: props.value.format("w"),
      day: props.value.format("DD"),
      upload: {
        meal: mealName,
        ingredients: ingredients,
        mealType: mealType,
        totalDaily: totalDaily,
        totalNutrients: totalNutrients,
        url: url,
        recipeYield: recipeYield
      },
    };

    props.createMealPlannerDataRes(data);
    submitNotification("Success", "Added to Meal Plan!");
    forceUpdate();

  };

  return (
    <>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}

      />
      <p style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>{mealName}</p>

      <Alert variant="success">
        <Alert.Heading>Add items to your meals list</Alert.Heading>
        <p>
          The scanner allows you to add more items to your meal plan
        </p>
      </Alert>

        <Form
           onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.handleFormClose();
          }}
        >
      
        <Form.Group>
        <li>{recipeList && recipeList.map(data => 
        <div><p>
          
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="form-check">
            <label class="form-check-label" for="flexCheckDisabled" style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>
              {data?.recipe.label}
            </label>
            <input 
              class="form-check-input" 
              type="radio" 
              name="flexRadioDefault" 
              id="flexRadioDefault1"
              style={{alignItems: 'right', marginLeft: '20px'}}
              value= {data?.recipe.label}
              onClick={(e) => {
                handleMealName(e, "value");
                setMealType(data?.recipe.mealType)
                setTotalDaily(data?.recipe.totalDaily)
                setTotalNutrients(data?.recipe.totalNutrients)
                setRecipeYield(data?.recipe.yield)
                setUrl(data?.recipe.url)

                //handleRecipe(e, "value");
                //e.currentTarget.disabled = true;
              }}
            />            
          </div>
        </h5>
        <p class="card-text">
          {data?.recipe.ingredientLines.map(item => {
          return <ul>
            
            <div class="form-check">
              <label class="form-check-label" for="flexCheckDisabled">
                {item}
              </label>
              <input 
                class="form-check-input" 
                type="checkbox" 
                value={item}
                id="flexCheckDefault"
                style={{alignItems: 'right', marginLeft: '20px', alignItems: 'left'}}
                onClick={(e) => {
                  handleRecipe(e, "value");
                  //e.currentTarget.disabled = true;
                }}
              />
          
            </div>
            
          </ul>;
          
        })}
          </p>
          
      </div>
    </div>
          {/* <Form.Label>{data?.id}</Form.Label>
          <Button
            type="text"
            id="add ingredient"
            value={data?.id}
            onClick={(e) => {
              handleIngredient(e, "value");
              e.currentTarget.disabled = true;
            }}
            required
          >
          Add
        </Button> */}
        </p></div>)}</li>
        </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
          Save
        </Button>
      </div>        
      </Form>
      {error && <div><p>Oops..Could not fetch food item, pls try another barcode..😭</p></div>}
     
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlannerDataRes: (mealPlanner) => dispatch(createMealPlannerDataRes(mealPlanner)),
  };
};

export default connect(null, mapDispatchToProps)(Scanner);
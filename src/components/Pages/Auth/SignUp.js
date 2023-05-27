import React, { useState, useEffect } from "react";

import "../Account/UserAccount.css";
import "./Mob.css";
import { Select } from "../../SubComponents/Dropdown";
import { Title } from "./MobComponents";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../../store/actions/authActions";

import { createMapData } from "../../../store/actions/dataActions";
import Geocode from "react-geocode";
import { countryNames, regionNames } from "../../lib/Countries";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { submitNotification } from "../../lib/Notifications";
//import TermsAndCons from "../../SubComponents/TermsAndConditions";

const SignUp = (props) => {
  //Stage1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Stage2
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [buildingFunction, setBuildingFunction] = useState("");

  //Stage4
  const [restaurantName, setRestaurantName] = useState("");
  const [regulatoryBody, setRegulatoryBody] = useState("");
  const [regulatoryBodyID, setRegulatoryBodyID] = useState("");

  //Stage7
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  //Stage6
  const [IDType, setIDType] = useState("");
  const [IDNumber, setIDNumber] = useState("");
  const [image, setImage ] = useState("");
  const [ IDUrl, setUrl ] = useState("");

  //Stage5
  const [cuisine, setCuisine] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");



  const [stage, setStage] = useState(1);

  const [errorNotification, setErrorNotification] = useState();

  
  function handleSubmit() {
    let data = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      initials: firstName[0] + lastName[0],
      email: email,
      password: password,
      function: buildingFunction,
      city: town,
      country: country,
      region: region,
      restaurantName: restaurantName, 
      companyName: companyName, 
      companyDescription: companyDescription,
      regulatoryBody: regulatoryBody,
      regulatoryBodyID: regulatoryBodyID,
      IDType: IDType,
      IDNumber: IDNumber,
      IDUrl: IDUrl,
      cuisine: cuisine,
      restaurantDescription: restaurantDescription,
      type: "user",
    };
    if (validation()) {
      console.log("signup");
      props.signUp(data);
    } else {
      console.log("error");
    }
  }

  //If error, send notification
  useEffect(() => {
    if (errorNotification) {
      submitNotification("Error", errorNotification);
      setErrorNotification();
    }
  }, [errorNotification]);

  //Form validation (Preferably change this to use bootstrap validation)
  const validation = () => {
    //no regex
    const no = /^[0-9\b]+$/;
    //Email regex
    const em =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    var s1 =
      firstName !== "" && lastName !== "" && email !== "" && password !== "";

    var s2 =
      town !== "" && country !== "" && region !== "" && buildingFunction !== "";

    var s3 = em.test(email);

    var s4 = !no.test(lastName) && !no.test(firstName);

    var s5 = !no.test(town);

    if (s1 && s2 && s3 && s4 && s5) {
      return true;
    } else {
      if (!s1) {
        setErrorNotification("Please enter a valid name, email, and password.");
      } else if (!s2) {
        setErrorNotification(
          "Please enter a valid town, country, region, and account type."
        );
      } else if (!s3) {
        setErrorNotification("Please enter a valid email address.");
      } else if (!s4) {
        setErrorNotification("Please enter a valid name.");
      } else if (!s5) {
        setErrorNotification("Please enter a valid town.");
      } else {
        setErrorNotification("Please enter valid information.");
      }
      return false;
    }
  };

  const { authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Setup geocode for getting coords when changing location
  useEffect(() => {
    Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  //make sure the user isn't already logged in and if they are a new account, createMapData document for them.
  useEffect(() => {
    if (props.auth.uid) {
      setIsLoggedIn(true);
      if (town !== "" && country !== "") {
        Geocode.fromAddress(town + " " + country).then((response) => {
          var upload = {
            masterCollection: "mapData",
            uid: props.auth.uid,
            upload: {
              foodWasteWeight: 0,
              location: response.results[0].address_components[0].long_name,
              coords: [
                response.results[0].geometry.location.lat,
                response.results[0].geometry.location.lng,
              ],
            },
          };
          props.createMapData(upload);
        });
      }
    }
  }, [props.auth.uid]);

  //rerender every time the stage changes
  useEffect(() => {}, [stage]);

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  switch (stage) {
    default:
    case 1:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage1
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            setMobile={setMobile}
            mobile={mobile}
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            setStage={setStage}
          />
          <div className='signup-center subtitles row'>
          <p>Already have an account? </p>
          <Link style={{ color: '#1C1569' }} to='/login'>
            {'  '}
            LOG IN
          </Link>
        </div>
        </Title>
      );
    case 2:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage2
            setIDType={setIDType}
            IDType={IDType}
            setIDNumber={setIDNumber}
            IDNumber={IDNumber}
            IDUrl={IDUrl}
            setUrl={setUrl}
            setTown={setTown}
            town={town}
            setCountry={setCountry}
            country={country}
            setRegion={setRegion}
            region={region}
            setBuildingFunction={setBuildingFunction}
            buildingFunction={buildingFunction}
            setStage={setStage}
            countries={countryNames}
          />
        </Title>
      );
    case 3:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <h5>Confirmation</h5>
          </div>
          <Stage3
            setIDType={setIDType}
            IDType={IDType}
            setIDNumber={setIDNumber}
            IDNumber={IDNumber}
            IDUrl={IDUrl}
            setUrl={setUrl}
            setStage={setStage}
            firstName={firstName}
            lastName={lastName}
            mobile={mobile}
            email={email}
            town={town}
            region={region}
            country={country}
            buildingFunction={buildingFunction}
            setRestaurantName={setRestaurantName}
            restaurantName={restaurantName}
            companyName={companyName}
            setCuisine={setCuisine}
            cuisine={cuisine}
            setRegulatoryBody={setRegulatoryBody}
            regulatoryBody={regulatoryBody}
            setRegulatoryBodyID={setRegulatoryBodyID}
            regulatoryBodyID={regulatoryBodyID}
            setRestaurantDescription={setRestaurantDescription}
            restaurantDescription={restaurantDescription}

          />
          <div className="signup-center">
            <div className="auth-error">
              {authError ? <p> {authError}</p> : null}
            </div>
            <div>
              <Button
                style={{ width: "30%" }}
                variant="default"
                className="signup-confirm"
                onClick={(e) => setStage(1)}
              >
                Change
              </Button>
            </div>
            <div className="row">
              <Button
                style={{ fontWeight: "700" }}
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Title>
      );
      //Restaurant-specific
    case 4:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage4
            setIDType={setIDType}
            IDType={IDType}
            setIDNumber={setIDNumber}
            IDNumber={IDNumber}
            IDUrl={IDUrl}
            setUrl={setUrl}
            setTown={setTown}
            town={town}
            setCountry={setCountry}
            country={country}
            setRegion={setRegion}
            region={region}
            setBuildingFunction={setBuildingFunction}
            buildingFunction={buildingFunction}
            setStage={setStage}
            countries={countryNames}
            setRestaurantName={setRestaurantName}
            restaurantName = {restaurantName}
            setRegulatoryBody={setRegulatoryBody}
            regulatoryBody = {regulatoryBody}
            setRegulatoryBodyID={setRegulatoryBodyID}
            regulatoryBodyID = {regulatoryBodyID}
          />
        </Title>
      );

    case 5:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage5
            setIDType={setIDType}
            IDType={IDType}
            setIDNumber={setIDNumber}
            IDNumber={IDNumber}
            IDUrl={IDUrl}
            setUrl={setUrl}
            setTown={setTown}
            town={town}
            setCountry={setCountry}
            country={country}
            setRegion={setRegion}
            region={region}
            setBuildingFunction={setBuildingFunction}
            buildingFunction={buildingFunction}
            setStage={setStage}
            countries={countryNames}
            restaurantName = {restaurantName}
            regulatoryBody = {regulatoryBody}
            regulatoryBodyID = {regulatoryBodyID}
            setCuisine={setCuisine}
            cuisine = {cuisine}
            setRestaurantDescription={setRestaurantDescription}
            restaurantDescription = {restaurantDescription}
          />
        </Title>
      );
    // Admin specific signup
    case 6:
    return (
      <Title subtitle="Sign Up">
        <div className="signup-center subtitles">
          <p>First, create your account.</p>
        </div>
        <Stage6
          setIDType={setIDType}
          IDType={IDType}
          setIDNumber={setIDNumber}
          IDNumber={IDNumber}
          IDUrl={IDUrl}
          setUrl={setUrl}
          image={image}
          setImage={setImage}
          setTown={setTown}
          town={town}
          setCountry={setCountry}
          country={country}
          setRegion={setRegion}
          region={region}
          setBuildingFunction={setBuildingFunction}
          buildingFunction={buildingFunction}
          setStage={setStage}
          countries={countryNames}
          restaurantName = {restaurantName}
          regulatoryBody = {regulatoryBody}
          regulatoryBodyID = {regulatoryBodyID}
          setCuisine={setCuisine}
          cuisine = {cuisine}
          setRestaurantDescription={setRestaurantDescription}
          restaurantDescription = {restaurantDescription}
        />
      </Title>
    );
    // supplier/ machinery specific signup
    case 7:
    return (
      <Title subtitle="Sign Up">
        <div className="signup-center subtitles">
          <p>First, create your account.</p>
        </div>
        <Stage7
          setTown={setTown}
          town={town}
          setCountry={setCountry}
          country={country}
          setRegion={setRegion}
          region={region}
          setBuildingFunction={setBuildingFunction}
          buildingFunction={buildingFunction}
          setStage={setStage}
          countries={countryNames}
          companyName = {companyName}
          setCompanyName = {setCompanyName}
          setCompanyDescription={setCompanyDescription}
          companyDescription = {companyDescription}
        />
      </Title>
    );
  }
};

const Stage1 = (props) => {

  const StyledPhoneInput = (props) => {
    return (
      <Form.Group className="mb-3" style={{ backgroundColor: 'white' }}>
        <PhoneInput
          inputStyle={{ // Apply the desired styles to the input element
          background: '#FFFFFF',
          borderRadius: '20px'
          }}
          buttonStyle={{ // Apply the desired styles to the dropdown button element
            padding: '0.375rem 0.75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            color: '#555555',
            backgroundColor: '#ffffff',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          {...props}
        />
      </Form.Group>
    );
  };
  
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Row>
            <Form.Group
              className="mb-3"
              as={Col}
            >
              <Form.Control
                type="text"
                placeholder="Enter name"
                defaultValue={props.firstName}
                required
                onChange={(e) => props.setFirstName(e.target.value)}
                className='signup-input placeholder-input'

              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Col}
            >
              
              <Form.Control
                type="text"
                placeholder="Enter surname"
                defaultValue={props.lastName}
                required
                onChange={(e) => props.setLastName(e.target.value)}
                className='signup-input placeholder-input'

              />
            </Form.Group>
          </Form.Row>

              {/* <StyledPhoneInput
                value={props.mobile}
                onChange={props.setMobile}
              /> */}

          <Form.Group className="mb-3">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={props.email}
              required
              onChange={(e) => props.setEmail(e.target.value)}
              className='signup-input placeholder-input'

            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>



          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={props.password}
              required
              onChange={(e) => props.setPassword(e.target.value)}
              className='signup-input placeholder-input'

            />
          </Form.Group>
          {/*Confirm Password*/}
          <div className="center">
            <Button
              type="submit"
              variant="default"
              className='signup-confirm'
              onClick={(e) => {
                e.preventDefault();
                //Next Stage
                props.setStage(2);
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

const Stage2 = (props) => {
  // Define the custom styles for the Select component
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Town"
              defaultValue={props.town}
              required
              className='signup-input placeholder-input'
              onChange={(e) => {
                props.setTown(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Select
              id="country"
              function={(e) => {
                props.setCountry(e.target.value);
              }}
              value={props.country}
              placeholder="Please Select a Country"
              items={countryNames}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Select
              id="region"
              function={(e) => {
                props.setRegion(e.target.value);
              }}
              value={props.region}
              placeholder="Please Select a Region"
              items={regionNames}

            />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Select
              id="buildingFunction"
              function={(e) => {
                props.setBuildingFunction(e.target.value);
              }}
              value={props.buildingFunction}
              placeholder="Please Select an Account Type"
              items={[
                "Households",
                "Admin",
                "Personal",
                "Hospitals",
                "Schools",
                "Hotels",
                "Offices",
                "Restaurants",
                "Shop/Supermarket",
                "Machinery/Supply",
                "Farm",
                "Recreational Centers",
                "Other",
              ]}

            />
          </Form.Group>
        </Form>
      </FormStyle>


      <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className='signup-confirm'
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(1);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className='signup-confirm'

            onClick={(e) => {
              e.preventDefault();
              //Next Stage

              // switch(props.buildingFunction){
              //   // case "Restaurants":
              //   //   props.setStage(4) //stage for restaurant-specific questions
              //   case "Admin":
              //     props.setStage(4)
              //   default:
              //     props.setStage(3)
              // }

              if (props.buildingFunction=="Restaurants") {
                props.setStage(4) //stage for restaurant-specific questions
              } else if (props.buildingFunction=="Admin") {
                props.setStage(6) //stage for admin-specific questions
              } else if (props.buildingFunction=="Machinery/Supply"){
                props.setStage(7) //stage for supplier/machinery-specific questions
              } else {
              props.setStage(3);}
            }}
          >
            Next
          </Button>

        </div>
      </div>
    </div>
  );
};

//If account type == restaurant, this routes 
const Stage4 = (props) => {
  return(
  <div>
    <FormStyle>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Restaurant name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Restaurant name"
            defaultValue={props.restaurantName}
            required
            onChange={(e) => {
              props.setRestaurantName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Please input the local authority which verifies your restuarant's health and safety status (e.g. the Food Standards Agency for Scotland).</Form.Label>
          <Form.Control
            type="text"
            placeholder="Regulatory body"
            defaultValue={props.regulatoryBody}
            required
            onChange={(e) => {
              props.setRegulatoryBody(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Please input the ID this regulatory body has provided you with. </Form.Label>
          <Form.Control
            type="text"
            placeholder="ID"
            defaultValue={props.regulatoryBodyID}
            required
            onChange={(e) => {
              props.setRegulatoryBodyID(e.target.value);
            }}
          />
        </Form.Group>

        <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-confirm"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(2);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className="signup-confirm"

            onClick={(e) => {
              e.preventDefault();
              //Next Stage

              if (props.buildingFunction=="Restaurants") {
                props.setStage(5) //stage for restaurant-specific questions
              } else {
              props.setStage(2);}
            }}
          >
            Next
          </Button>

        </div>
      </div>
      </Form>
    </FormStyle>
  </div>

  );
};


//If account type == admin, this routes 
const Stage6 = (props) => {
  //upload immage to cloudinary
    const uploadImage = async () => {
        const data = new FormData()
        data.append("file", props.image)
        data.append("upload_preset", "wft-app")
        data.append("cloud_name","dghm4xm7k")
        data.append("folder", "restaurant_id") 
        await fetch("https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",{
          method:"post",
          body: data
        })
        .then(resp => resp.json())
        .then(data => {
        props.setUrl(data.url)
        })
        .catch(err => console.log(err))
    }

  return(
  <div>
    <FormStyle>
      <Form>
        <Form.Group className="mb-3">
            <Form.Label>Identification</Form.Label>
            <Select
              id="buildingFunction"
              function={(e) => {
                props.setIDType(e.target.value);
              }}
              value={props.IDType}
              placeholder="Please an Identity Type"
              items={[
                "Int'l Passport",
                "Voters Card",
                "Driver's License",
                "National Identity Card",
              ]}
            />
          </Form.Group>

          <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Identification Number"
            defaultValue={props.setIDNumber}
            required
            onChange={(e) => {
              props.setIDNumber(e.target.value);
            }}
          />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              placeholder="Upload Image"
              defaultValue={""}
              required
              onChange={(e) => {
                props.setImage(e.target.files[0]);
              }}
            />
          </Form.Group>

        <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-confirm"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(2);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className="signup-confirm"

            onClick={(e) => {
              e.preventDefault();

              uploadImage()
              //Next Stage


              if (props.buildingFunction=="Admin") {
                props.setStage(3) //confimation page
              } else {
              props.setStage(2);}
            }}
          >
            Next
          </Button>

        </div>
      </div>
      </Form>
    </FormStyle>
  </div>

  );
};

//If account type == admin, this routes 
const Stage7 = (props) => {
  //upload immage to cloudinary
    // const uploadImage = async () => {
    //     const data = new FormData()
    //     data.append("file", props.image)
    //     data.append("upload_preset", "supplier")
    //     data.append("cloud_name","dghm4xm7k")
    //     await fetch("https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",{
    //       method:"post",
    //       body: data
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //     props.setUrl(data.url)
    //     })
    //     .catch(err => console.log(err))
    // }

  return(
    <div>
    <FormStyle>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Company name"
            defaultValue={props.companyName}
            required
            onChange={(e) => {
              props.setCompanyName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Company Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Describe what you do"
            defaultValue={props.companyDescription}
            required
            onChange={(e) => {
              props.setCompanyDescription(e.target.value);
            }}
          />
        </Form.Group>


        <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-confirm"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(2);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className="signup-confirm"

            onClick={(e) => {
              e.preventDefault();
              //Next Stage

              if (props.buildingFunction=="Restaurants") {
                props.setStage(5) //stage for restaurant-specific questions
              } else {
              props.setStage(3);}
            }}
          >
            Next
          </Button>

        </div>
      </div>
      </Form>
    </FormStyle>
  </div>


  );
};



const Stage5 = (props) => {
  return(
  <div>
    <FormStyle>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>What cuisine does your kitchen offer?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Cuisine"
            defaultValue={props.cuisine}
            required
            onChange={(e) => {
              props.setCuisine(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Please provide a brief description of your restaurant for customers to see.</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            defaultValue={props.restaurantDescription}
            required
            onChange={(e) => {
              props.setRestaurantDescription(e.target.value);
            }}
          />
        </Form.Group>

        <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-confirm"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(4);
            }}
          >
            Back
          </Button>

          <Button
            variant="default"
            className="signup-confirm"

            onClick={(e) => {
              e.preventDefault();
              //Next Stage

              if (props.buildingFunction=="Restaurants") {
                props.setStage(3) //stage for restaurant-specific questions
              } else {
              props.setStage(3);}
            }}
          >
            Next
          </Button>

        </div>
      </div>
      </Form>
    </FormStyle>
  </div>

  );
}

const Stage3 = (props) => {
  switch (props.buildingFunction){
    case "Restaurants":
    return (
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              {props.firstName} {props.lastName}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{props.email}</ListItemText>
          </ListItem>
          <ListItem className="space-between">
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText>
              {props.town}, {props.country}, {props.region}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.buildingFunction}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.restaurantName}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.regulatoryBody}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.regulatoryBodyID}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.cuisine}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.restaurantDescription}</ListItemText>
          </ListItem>

        </List>
      </div>
    );
    case "Machinery/Supply":
    return (
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              {props.firstName} {props.lastName}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{props.email}</ListItemText>
          </ListItem>
          <ListItem className="space-between">
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText>
              {props.town}, {props.country}, {props.region}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.buildingFunction}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.companyName}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.companyDescription}</ListItemText>
          </ListItem>

        </List>
      </div>
    );
    case "Admin":
      return (
      <div>
        <List>
          <ListItem>
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              {props.firstName} {props.lastName}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{props.email}</ListItemText>
          </ListItem>
          <ListItem className="space-between">
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText>
              {props.town}, {props.country}, {props.region}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.buildingFunction}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.IDType}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.IDNumber}</ListItemText>
          </ListItem>

        </List>
      </div>
      );
      case "Households":
      case "Personal":
      case "Hospitals":
      case "Schools":
      case "Hotels":
      case "Offices":
      case "Shop/Supermarket":
      case "Farm":
      case "Recreational Centers":
      case "Restaurants":
      case "Other":
        return (
          <div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DriveFileRenameOutlineIcon />
                </ListItemIcon>
                <ListItemText>
                  {props.firstName} {props.lastName}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>{props.email}</ListItemText>
              </ListItem>
              <ListItem className="space-between">
                <ListItemIcon>
                  <EditLocationAltIcon />
                </ListItemIcon>
                <ListItemText>
                  {props.town}, {props.country}, {props.region}
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText>{props.buildingFunction}</ListItemText>
              </ListItem>
            </List>
          </div>
        );
  }
}

const FormStyle = styled.div`
  form {
    width: 80%;
    margin: auto;
    padding: 10px;
  }

  input {
    border: 1px solid #62680a;
  }

  .btn-dark {
    background-color: #071850;
    color: whitesmoke;
    border: 1px solid #03091d;
    float: right;

    &:hover {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }

    &:active {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),  //r: cmd+click on signUp takes you to where the signUp event's props are defined
    createMapData: (mapdata) => dispatch(createMapData(mapdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

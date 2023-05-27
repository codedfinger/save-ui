import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  InputGroup,
  DropdownButton,
  Modal,
  Dropdown,
} from "react-bootstrap";
import { DefaultButton } from "../SubComponents/Button";
//change alerts to react bootstrap also
import { connect } from "react-redux";
import {
  startData,
  createFoodIntakeData,
} from "../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";
// import {fs} from "../../../config/fbConfig"
import { Divider, FormControlLabel } from "@material-ui/core";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Autocomplete } from "@material-ui/lab";
import { TextField, Checkbox } from "@material-ui/core";
import addNotification from "react-push-notification";
import { Heading } from "../SubComponents/Heading";

// import {Chart} from "react-google-charts"

const time = moment().format("MMMM Do YYYY, h:mm:ss a");
// const chartSubmissionDay = moment().format("ddd")
// const chartSubmissionWeek = moment().format("W")
// const chartSubmissionMonth = moment().format("MMM")
// const chartSubmissionDate = moment().format("Do")
// const chartSubmissionYear = moment().format("YYYY")
// const chartSubmissionFullDate = moment().format("ddd MMM Do YYYY")

class FoodIntake extends Component {
  state = {
    name: this.props.user.firstName,
    email: this.props.auth.email,
    uid: this.props.auth.uid,
    filteredData: [],

    formWidth: "",
    //formHeight: "",

    submissionType: "Intake",

    meal: "Select Meal",

    foodName: "",

    checkedA: false,
    checkedB: false,
    eatingInOrOut: "",

    notes: "n/a",

    // edibleInedibleSurplus: "Select",

    // foodWasteWeight: 0,
    // weightType: "Select Unit",
    // weightMultiplier: 0,

    // edibleFoodWasteType: "Select Type",
    // inedibleFoodWasteType: "Select Type",

    // carbsContent: 0,
    // proteinContent: 0,
    // fatContent: 0,
    // fibreContent: 0,

    producedLocally: "Select",

    // expiryDate: "",

    // moisture: 0,
    // showMoisture: false,

    // inedibleMoisture: 0,

    // volumeOfFoodWaste: 0,

    // ghg: 0,

    // inedibleGHG: 0,
    // dailyFoodSurplus: 0,

    // foodWasteCost: 0,
    // currency: "Select Currency",
    // currencyMultiplier: 0,

    // costOfInedibleFoodWaste: 0,

    // dropDownValueIFW: "Select Currency",
    // currencyMultiplierIFW: 0,

    chartSubmissionDay: moment().format("ddd"),
    chartSubmissionWeek: moment().format("W"),
    chartSubmissionMonth: moment().format("MMM"),
    chartSubmissionDate: moment().format("Do"),
    chartSubmissionYear: moment().format("YYYY"),
    chartSubmissionFullDate: moment().format("ddd MMM Do YYYY"),

    foodOptions: [],
    // showComposition: false,

    // dataChartEFW: [['Food Wastage Type', 'Food Wastage Weight']],

    // autocompleteEntries: [
    //     {}
    // ]
  };

  // handleChartSubmit(label, column){
  //     this.setState((prevState) => ({
  //         dataChartEFW: [...prevState.dataChartEFW, [label, column]],
  //     }));
  // }

  clearEFWForm = () => {
    this.setState({
      meal: "Select Meal",
      foodName: "",
      checkedA: false,
      checkedB: false,
      eatingInOrOut: "",
      // edibleInedibleSurplus: "Select",
      // foodWasteWeight: 0,
      // weightType: "Select Unit",
      producedLocally: "Select",
      // expiryDate: "",
      // edibleFoodWasteType: "Select Type",
      // carbsContent: 0,
      // proteinContent: 0,
      // fatContent: 0,
      // fibreContent: 0,
      // moisture: 0,
      // ghg: 0,
      // foodWasteCost: 0,
      // currency: "Select Currency",
      // currencyMultiplier: 0,
      //formHeight: "545px",
    });
  };

  notificationTest = () => {
    addNotification({
      title: "Success!",
      message: "Food Intake successfully updated!",
      // theme: 'darkblue',
      // native: false,
      backgroundTop: "#aab41e", //optional, background color of top container.
      backgroundBottom: "#aab41e", //optional, background color of bottom container.
      closeButton: "Close",
      duration: 4000,
    });
  };

  changeMeal(text) {
    this.setState({ meal: text });
  }

  changeCurrency(text) {
    this.setState({ currency: text });
  }

  // changeIFWCurrency(text) {
  //     this.setState({dropDownValueIFW: text})
  // }

  changeCurrencyMultiplier(value) {
    this.setState({ currencyMultiplier: value });
  }

  // changeMultiplierIFW(value) {
  //     this.setState({currencyMultiplierIFW: value})
  // }

  changeWeightMultiplier(value) {
    this.setState({ weightMultiplier: value });
  }

  handleChange = async (e) => {
    // console.log(e);
    const resp = await fetch("https://web-wrggqo5tiq-lz.a.run.app/completion", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        //'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `food=${e.target.value}`,
    });
    //console.log(resp);
    const data = await resp.json();
    //console.table(data);
    //this.foodOptions = data;
    this.state.foodOptions = data;
    //console.log(this.foodOptions);

    //          .then((res) => console.log(res.items));
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleFoodApi = async (e) => {
    const resp = await fetch("https://web-wrggqo5tiq-lz.a.run.app/completion", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        //'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `food=${e.target.value}`,
    });
    //console.log(resp);
    const data = await resp.json();
    //console.table(data);
    //this.foodOptions = data;
    this.state.foodOptions = data;
    //console.log(this.foodOptions);

    //          .then((res) => console.log(res.items));
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleEdibleInedibleSurplusChange = (e) => {
    // console.log(e)
    this.setState({ edibleInedibleSurplus: e });
  };

  handleProducedLocallyChange(text) {
    this.setState({ producedLocally: text });
  }

  handleWeightUnitChange(text) {
    this.setState({ weightType: text });
  }

  // handleEdibleFoodTypeChange(text) {
  //     this.setState({edibleFoodWasteType: text})
  // }

  // handleInedibleFoodTypeChange(text) {
  //     this.setState({inedibleFoodWasteType: text})
  // }

  // handleCarbsContentChange(event) {
  //     this.setState({carbsContent: event.target.value})
  // }

  // handleProteinContentChange(event) {
  //     this.setState({proteinContent: event.target.value})
  // }

  // handleFibreContentChange(event) {
  //     this.setState({fibreContent: event.target.value})
  // }

  // handleFatContentChange(event) {
  //     this.setState({fatContent: event.target.value})
  // }

  // handleMoistureChange(event) {
  //     this.setState({moisture: event.target.value})
  // }

  // handleInedibleMoistureChange(event) {
  //     this.setState({inedibleMoisture: event.target.value})
  // }

  handleFoodWasteGHGChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      ghg: Number(e.target.value) * 2.5,
    });
  };

  handleFoodCostChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      foodWasteCost: (Number(e.target.value) * 0.85).toFixed(2),
    });
  };

  handleInedibleFoodCostChange = (e) => {
    //console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
      costOfInedibleFoodWaste: (Number(e.target.value) * 0.85).toFixed(2),
    });
  };

  pressButton = (e) => {
    e.preventDefault();
    this.props.startData(this.state);
  };

  handleFoodIntakeSubmit = (e) => {
    e.preventDefault();
    this.setState({});
    this.props.createFoodIntakeData(this.state);
  };

  handleCheckboxTick = (e) => {
    if (e.target.name === "checkedA") {
      this.setState({
        [e.target.name]: e.target.checked,
        checkedB: !e.target.checked,
        eatingInOrOut: "Eating In",
      });
    } else if (e.target.name === "checkedB") {
      this.setState({
        [e.target.name]: e.target.checked,
        checkedA: !e.target.checked,
        eatingInOrOut: "Eating Out",
      });
    }
  };

  // handleFoodNameEntry(text){
  //     this.setState({
  //         foodName: text
  //     })
  // }

  // handleAutoCompleteValueEntry(text){
  //     this.setState( (prevState) => ({
  //         autocompleteEntries: {...prevState.autocompleteEntries, text}
  //     }));
  // }

  // handleFoodWasteSubmitMobile = (e) => {
  //     e.preventDefault();
  //     this.setState({
  //     })
  //     this.props.createFoodWasteData(this.state);
  // }

  // handleSubmit = (e) => {
  //     e.preventDefault();
  // //    console.log(this.state);
  //     this.props.createProduct(this.state)
  //     this.props.history.push('/products')
  // }

  componentDidMount() {
    if (isMobile) {
      this.setState({ formWidth: "72vw" /*formHeight: "545px"*/ });
    } else if (isBrowser) {
      this.setState({ formWidth: "261px" /*formHeight: "545px"*/ });
    }
  }

  render() {
    const { data, auth } = this.props;
    // console.log(data.[auth.uid].writtenFoodWasteData);
    // console.log(time);
    // console.log(Date(time));
    const { foodWaste, foodSurplus } = this.state;
    if (!auth.uid) return <Redirect to="/login" />;
    if (data) {
      const filteredData =
        data && data.filter((datas) => datas.email === auth.email);
      // console.log(foodWaste);
      // console.log(foodSurplus);

      // 284 - paddingBottom:

      return (
        <div style={{ width: "100%", height: "100%" }}>
          <MobileView>
            <h3
              style={{
                paddingTop: "8vh",
                color: "black",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Update Food Intake
            </h3>
          </MobileView>
          <BrowserView>
            <h4
              style={{
                paddingTop: "8vh",
                color: "black",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Update Food Intake
            </h4>
          </BrowserView>

          <div
            style={{
              display: "flex",
              margin: "auto",
              float: "center",
              flexWrap: "wrap",
              width: this.state.formWidth,
            }}
          >
            {/*<Button
              style={{ width: this.state.formWidth, borderColor: "#aab41e" }}
              className="custom-btn-2"
              as={Link}
              to="/account"
            >
              Back
            </Button>*/}
            <DefaultButton text="Back" styling="green" goTo="/account" />
          </div>

          {filteredData.length === 0 ? (
            <Card>
              <Card.Body>
                <Card.Text className="text-center">
                  <Heading
                    priority="1"
                    text="Start tracking your food waste now"
                  />
                  <DefaultButton
                    text="Start now"
                    styling="green"
                    onClick={this.pressButton}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
                height: "190%",
              }}
            >
              {/* <BrowserView> */}

              <Card
                style={{
                  // width: "90%",
                  width: this.state.formWidth,
                  // height: "100%"
                  //height: this.state.formHeight,
                  marginBottom: "10vh",
                  // backgroundColor: 'lightgray'
                }}
              >
                {/* onSubmit={this.handleFoodWasteSubmit}     */}
                <Form className="form-layout" style={{ padding: "10px" }}>
                  <h5
                    className="text-center"
                    style={{
                      margin: "30px",
                      fontSize: "23px",
                      fontWeight: "600",
                    }}
                  >
                    Food Intake
                  </h5>

                  <div>
                    <div style={{ padding: "0 10% 0 10%" }}>Meal</div>
                    <Form.Group
                      style={{
                        padding: "0 10% 0 10%",
                        // paddingBottom: "20px",
                        display: "flex",
                      }}
                    >
                      <InputGroup>
                        <DDMenuStyle>
                          <Dropdown>
                            <DropdownToggle
                              variant="secondary"
                              style={{ width: "190px" }}
                              className="dd"
                            >
                              {this.state.meal}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.changeMeal(e.target.textContent)
                                  }
                                >
                                  Breakfast
                                </div>
                              </DropdownItem>

                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.changeMeal(e.target.textContent)
                                  }
                                >
                                  Lunch
                                </div>
                              </DropdownItem>

                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.changeMeal(e.target.textContent)
                                  }
                                >
                                  Dinner
                                </div>
                              </DropdownItem>

                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.changeMeal(e.target.textContent)
                                  }
                                >
                                  Other
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </DDMenuStyle>
                      </InputGroup>
                    </Form.Group>

                    <div style={{ padding: "0 10% 0 10%" }}>Food Name</div>
                    <Form.Group
                      style={{ padding: "0 10% 0 10%", display: "flex" }}
                    >
                      <Autocomplete
                        // multiple
                        id="foodName"
                        options={this.state.foodOptions}
                        getOptionLabel={(option) => option.name}
                        filterOptions={(x) => x}
                        freeSolo
                        // limitTags={1}
                        // getOptionLabel={(option) => option.name}
                        style={{ width: "100%" }}
                        size="small"
                        onChange={(e) =>
                          this.setState({ foodName: e.target.textContent })
                        }
                        onInputChange={(e) => this.handleFoodApi(e)}
                        // renderTags={(value, getTagProps) =>
                        //     value.map((option, index) => (
                        //       <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        //     ))
                        // }

                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Enter Food Name"
                            variant="outlined"
                          />
                        )}
                      />
                    </Form.Group>

                    <div style={{ padding: "0 10% 0 10%" }}>
                      Local or Non-local?
                    </div>
                    <Form.Group
                      style={{
                        padding: "0 10% 0 10%",
                        display: "flex",
                      }}
                    >
                      {/* <InputGroup>
                                <DropdownButton
                                    variant="outline-secondary"
                                    title={this.state.producedLocally}
                                    id="lnldd"
                                >
                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Local Produce
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem as="button" type="button">
                                        <div onClick={(e) => this.handleProducedLocallyChange(e.target.textContent)}>
                                            Non-local Produce
                                        </div>
                                    </DropdownItem>

                                </DropdownButton>
                            </InputGroup> */}

                      <InputGroup>
                        <DDMenuStyle>
                          <Dropdown>
                            <DropdownToggle
                              variant="secondary"
                              style={{ width: "190px" }}
                              className="dd"
                            >
                              {this.state.producedLocally}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.handleProducedLocallyChange(
                                      e.target.textContent
                                    )
                                  }
                                >
                                  Local Produce
                                </div>
                              </DropdownItem>

                              <DropdownItem as="button" type="button">
                                <div
                                  onClick={(e) =>
                                    this.handleProducedLocallyChange(
                                      e.target.textContent
                                    )
                                  }
                                >
                                  Non-local Produce
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </DDMenuStyle>
                      </InputGroup>
                    </Form.Group>

                    <div style={{ padding: "0 10% 0 10%" }}>
                      Eating In or Out?
                    </div>
                    <Form.Group
                      style={{ padding: "0 10% 0 10%", display: "flex" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{
                              color: "#aab41e",
                              "&$checked": { color: "#aab41e" },
                            }}
                            checked={this.state.checkedA}
                            name="checkedA"
                            onChange={(e) => this.handleCheckboxTick(e)}
                          />
                        }
                        label="Eating In"
                      />
                    </Form.Group>
                    <Form.Group
                      style={{
                        padding: "0 10% 0 10%",
                        marginTop: "-25px",
                        display: "flex",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={{
                              color: "#aab41e",
                              "&$checked": { color: "#aab41e" },
                            }}
                            checked={this.state.checkedB}
                            name="checkedB"
                            onChange={(e) => this.handleCheckboxTick(e)}
                          />
                        }
                        label="Eating Out"
                      />
                    </Form.Group>

                    <Divider />

                    {/* <Button style={{margin: "0 10% 0 10%", backgroundColor: '#aab41e', width: "80%", marginTop: "20px"}} onClick={(e) => {this.handleFoodIntakeSubmit(e); this.clearEFWForm(); this.notificationTest() }} variant="secondary" type="button">
                            Update
                        </Button> */}

                    <div>
                      {this.state.meal !== "Select Meal" &&
                      this.state.foodName !== "" &&
                      this.state.eatingInOrOut !== "" &&
                      this.state.producedLocally !== "Select" ? (
                        <Button
                          style={{
                            margin: "0 10% 0 10%",
                            backgroundColor: "#aab41e",
                            width: "80%",
                            marginTop: "20px",
                          }}
                          onClick={(e) => {
                            this.handleFoodIntakeSubmit(e);
                            this.clearEFWForm();
                            this.notificationTest();
                          }}
                          variant="secondary"
                          type="button"
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          style={{
                            margin: "0 10% 0 10%",
                            width: "80%",
                            marginTop: "20px",
                          }}
                          variant="secondary"
                          disabled
                        >
                          Update
                        </Button>
                      )}
                    </div>

                    {/* <Divider /> */}
                  </div>
                </Form>
              </Card>
            </div>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

/*const foodOptions = [
  { title: "Cereal" },
  { title: "Bacon" },
  { title: "Baked Beans" },
  { title: "Porridge" },
  { title: "Pancake" },
  { title: "Beef" },
  { title: "Chicken" },
  { title: "Pork" },
  { title: "Apple" },
  { title: "Banana" },
  { title: "Orange" },
  { title: "Pear" },
  { title: "Grapes" },
  { title: "Chocolate" },
  { title: "Crisps" },
  { title: "Pasta" },
  { title: "Bolognese" },
  { title: "Potato" },
  { title: "Chips" },
  { title: "Milk" },
  { title: "Fruit Juice" },
  { title: "Onion" },
]; */

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.firestore.ordered.data,
    user: state.firebase.profile,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startData: (product) => dispatch(startData(product)),
    // createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
    // createFoodSurplusData: (product) => dispatch(createFoodSurplusData(product)),
    createFoodIntakeData: (product) => dispatch(createFoodIntakeData(product)),
  };
};

const CardStyle = styled.div`
  .card {
    color: rgb(59, 59, 59);
    background-color: rgb(238, 238, 238);
    border: none;
    border-radius: 5px;
    padding: 70px 0 50px 0;
  }

  .card-body {
    height: 200px;
  }
`;

const DDMenuStyle = styled.div`
  .dd {
    background-color: white;
    color: grey;
    border-color: grey;
  }
`;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "data",
        doc: props.auth.uid,
      },
    ];
  })
)(FoodIntake);

//export default FoodIntake;

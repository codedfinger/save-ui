const initState = {
  authError: null,
  meals: [],
  savedMeals: [],
  shoppingList: [],
  inventory: [],
  plans: [],
  items: [],
  newPlans: [],
  weekPlans: [],
  allItems:[],
  singleMealPlan:[],


};

const mealPlannerReducer = (state = initState, action) => {
  switch (action.type) {
    //#region start
    case "CREATE_MEAL_PLAN":
      console.log("meal planner created", action.mealPlanner);
      return {
        ...state,
        authError: null, 
      };
    case "CREATE_MEAL_PLANNER_ERROR":
      console.log("error, meal plan not created", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
      case "GENERATE_MEAL_PLAN":
      console.log("meal planner generated", action.plan);
      return {
        ...state,
        authError: null, 
      };
    case "GENERATE_MEAL_PLANNER_ERROR":
      console.log("error, meal plan not generated", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
      case "REMOVE_ALL_MEAL_PAN":
      console.log("successfully removed all meal plan", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "REMOVE_ALL_MEAL_PLAN_ERROR":
      console.log("error, couldn't remove all meal plan", action.err);
      return {
        ...state,
        authError: "delete meal failed",
      };
      case "GET_MEAL_PLANS":
        console.log("get meals plans success", action.payload);
        return {
          ...state,
          plans: action.payload,
          authError: null,
        };
      case "GET_MEAL_PLANS_ERROR":
        console.log("error, couldn't fetch meals", action.err);
        return {
          ...state,
          authError: "Get meals failed",
        };
        case "GET_WEEK_PLANS":
        console.log("get week plans success", action.payload);
        return {
          ...state,
          weekPlans: action.payload,
          authError: null,
        };
      case "GET_WEEK_PLANS_ERROR":
        console.log("error, couldn't fetch meals", action.err);
        return {
          ...state,
          authError: "Get meals failed",
        };
      case "GET_NEW_PLANS":
      console.log("get meal new plan success", action.payload);
      return {
        ...state,
        newPlans: action.payload,
        authError: null,
      };
    case "GET_NEW_PLANS_ERROR":
      console.log("error, couldn't fetch new plan", action.err);
      return {
        ...state,
        authError: "Get meals failed",
      };

      case "GET_SINGLE_MEAL_PLAN":
        console.log("get single meal from plan success", action.payload);
        return {
          ...state,
          singleMealPlan: action.payload,
          authError: null,
        };
      case "GET_SINGLE_MEAL_PLAN_ERROR":
        console.log("error, couldn't fetch single  meals from plan", action.err);
        return {
          ...state,
          authError: "Get single meal plan failed",
        };

      case "EDIT_NEW_PLAN":
      console.log("successfully edited", action.data);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_NEW_PLAN_ERROR":
      console.log("error, couldn't edit meal", action.err);
      return {
        ...state,
        authError: "Edit meal failed",
      };

        case "DELETE_MEAL_PLAN":
          console.log("successfully deleted item");
          return {
            ...state,
            authError: null,
          };
        case "DELETE_MEAL_PLAN_ERROR":
          console.log("error, couldn't delete item", action.err);
          return {
            ...state,
            authError: "delete item failed",
          };
        case "GET_ALL_MEAL_PLAN":
        console.log("getting all meal panner items", action.plan);
        return {
          ...state,
          allItems: action.plan,
          authError: null,
        };
        case "EDIT_INVENTORY":
      console.log("successfully edited", action.data);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_INVENTORY_ERROR":
      console.log("error, couldn't edit inventory item", action.err);
      return {
        ...state,
        authError: "Edit inventory item failed",
      };
    //#endregion
    default:
      return state;
  }
};

export default mealPlannerReducer;

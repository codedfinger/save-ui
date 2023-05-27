import React, { Component } from "react";
import { PageWrap } from "../SubComponents/PageWrap";
import Divider from "@mui/material/Divider";
import tip1 from "../../images/tip1.jpg";
import tip2 from "../../images/tip2.jpg";
import tip3 from "../../images/tip3.jpg";
import tip4 from "../../images/tip4.jpg";
import tip5 from "../../images/tip5.jpg";

class FoodReduction extends Component {
  render() {
    return (
      <PageWrap
        header="Reduction Tips"
        subtitle="Food Waste Reduction Tips"
        goTo="/account"
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <p style={{ textAlign: "left", padding: "10px 2% 0 2%" }}>
            Food waste is a bigger problem than many people realize.
            <br />
            <br />
            In fact, nearly one-third of all food produced in the world is
            discarded or wasted for various reasons. That equates to nearly{" "}
            <b>1.3 billion tons</b> every year.
            <br />
            <br />
            Not surprisingly, industrialized countries like the United States
            waste more food than developing nations. In 2010, the average
            American generated about 219 pounds (99 kg) of food waste, according
            to the US Environmental Protection Agency (EPA).
            <br />
            <br />
            While you might not think food waste affects you, think again.
            <br />
            <br />
            Tossing edible food doesn’t just waste money. Discarded food is sent
            to landfills, where it rots and produces methane gas, which is the
            second most common greenhouse gas. In other words, throwing out your
            food contributes to climate change.
            <br />
            <br />
            It wastes a huge amount of water, too. According to the World
            Resources Institute, 24% of all the water used for agriculture is
            lost through food waste every year. That’s 45 trillion gallons
            (about 170 trillion liters).
            <br />
            <br /> These things will help to reduce food waste:-{" "}
          </p>
          <Divider variant="middle" />
          <p style={{ textAlign: "left", padding: "10px 2% 0 2%" }}>
            {" "}
            <h3>1. Shop Smart:-</h3>{" "}
            <img
              src={tip1}
              alt="tip1"
              className="img-fluid rounded fix-image"
            />{" "}
            Most people tend to buy more food than they need. Though buying in
            bulk may be convenient, research has shown that this shopping method
            leads to more food waste. To avoid buying more food than you need,
            make frequent trips to the grocery store every few days rather than
            doing a bulk shopping trip once a week. Make a point to use up all
            the food you purchased during the last trip to the market before
            buying more groceries. Additionally, try making a list of items that
            you need to buy and stick to that list. This will help you reduce
            impulse buying and reduce food waste as well
          </p>
          <Divider variant="middle" />
          <p style={{ textAlign: "left", padding: "10px 2% 0 2%" }}>
            {" "}
            <h3>2. Store Food Correctly:-</h3>{" "}
            <img
              src={tip2}
              alt="tip2"
              className="img-fluid rounded fix-image"
            />{" "}
            Improper storage leads to a massive amount of food waste. According
            to the Natural Resource Defense Council, about two-thirds of
            household waste in the United Kingdom is due to food spoilage. Many
            people are unsure how to store fruits and vegetables, which can lead
            to premature ripening and, eventually, rotten produce. For instance,
            potatoes, tomatoes, garlic, cucumbers and onions should never be
            refrigerated. These items should be kept at room temperature.
            Separating foods that produce more ethylene gas from those that
            don’t is another great way to reduce food spoilage. Ethylene
            promotes ripening in foods and could lead to spoilage.
          </p>
          <Divider variant="middle" />
          <p style={{ textAlign: "left", padding: "10px 2% 0 2%" }}>
            <h3>3. Learn to Preserve:-</h3>{" "}
            <img
              src={tip3}
              alt="tip3"
              className="img-fluid rounded fix-image"
            />{" "}
            While you might think fermenting and pickling are new fads, food
            preservation techniques like these have been used for thousands of
            years. Pickling, a type of preservation method using brine or
            vinegar, may have been used as far back as 2400 BC. Pickling,
            drying, canning, fermenting, freezing and curing are all methods you
            can use to make food last longer, thus reducing waste. Not only will
            these methods shrink your carbon footprint, they will save you money
            as well. What’s more, most preservation techniques are simple and
            can be fun. For example, canning an excess of ripe apples and
            turning them into applesauce, or pickling fresh carrots from the
            market will provide you with a delicious and long-lasting treat that
            even kids will enjoy.
          </p>
          <Divider variant="middle" />
          <p style={{ textAlign: "left", padding: "10px 2% 0 2%" }}>
            <h3>4. Don’t Be a Perfectionist:-</h3>{" "}
            <img
              src={tip4}
              alt="tip4"
              className="img-fluid rounded fix-image"
            />{" "}
            Did you know that rummaging through a bin of apples until you find
            the most perfect-looking one contributes to food waste? Though
            identical in taste and nutrition, so-called “ugly” fruits and
            vegetables get passed up for produce that is more pleasing to the
            eye. The consumer demand for flawless fruits and vegetables has led
            major grocery chains to buy only picture-perfect produce from
            farmers. This leads to tons of perfectly good food going to waste.
            It’s such a big issue that major grocery chains like Walmart and
            Whole Foods have started offering “ugly” fruits and vegetables at a
            discount in an attempt to reduce waste. Do your part by choosing
            slightly imperfect produce at the grocery store, or better yet,
            directly from the farmer.
          </p>
          <Divider variant="middle" />
          <p style={{ textAlign: "left", padding: "10px 2% 50px 2%" }}>
            <h3>5. Keep Your Fridge Clutter-Free:-</h3>{" "}
            <img
              src={tip5}
              alt="tip5"
              className="img-fluid rounded fix-image"
            />{" "}
            You’ve probably heard the saying, “out of sight, out of mind.” This
            rings especially true when it comes to food. While having a
            well-stocked fridge can be a good thing, an overly filled fridge can
            be bad when it comes to food waste. Help avoid food spoilage by
            keeping your fridge organized so you can clearly see foods and know
            when they were purchased. A good way to stock your fridge is by
            using the FIFO method, which stands for “first in, first out.” For
            example, when you buy a new carton of berries, place the newer
            package behind the old one. This helps ensure that older food gets
            used, not wasted.
          </p>
        </div>
      </PageWrap>
    );
  }
}

export default FoodReduction;

import React, { useState } from "react";
import Control from "./control";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import "../FarmPlan.css";
import { useEffect } from "react";

export default function FarmerAuth() {
  //stage 0 are you an existing farm
  const [existing, setExisting] = useState(false);

  //stage 1 (are you a famring association member)
  const [association, setAssociation] = useState(false);

  //stage 2 (certificate of incorporation)
  const [certificate, setCertificate] = useState("");

  //stage 3 location
  const [farm, setFarm] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostcode] = useState("");

  //stage 4 farming sector
  const [sector, setSector] = useState("Horticulture");

  //stage 5 sustainability
  //handles how the sustainable practices list will vary for each sector
  let practices;
  switch (sector) {
    default:
    case "Horticulture":
      practices = [
        "Permaculture",
        "Biodynamic Farming",
        "Agroforestry",
        "Food forestry",
        "Poly culture",
        "Regenerative agriculture",
        "Crop rotation",
        "Mulching/ground cover",
        "Growth of heirlooms",
        "Natural pest management",
        "Others",
      ];
      break;
    case "Livestock":
      practices = ["Permaculture", "Natural animal raising", "Others"];
      break;
    case "Aquaculture":
      practices = ["Permaculture", "Natural fish harvest", "Others"];
      break;
    case "Insect Farm":
      practices = ["Permaculture", "Others"];
      break;
    case "Other":
      practices = [
        "Permaculture",
        "Biodynamic Farming",
        "Agroforestry",
        "Food forestry",
        "Poly culture",
        "Regenerative agriculture",
        "Crop rotation",
        "Mulching/ground cover",
        "Growth of heirlooms",
        "Natural animal raising",
        "Natural pest management",
        "Natural fish harvest",
        "Others",
      ];
      break;
  }

  //handles the state of items in the checklist
  const [practice, setPractice] = useState([]);
  const [futurePractice, setFuturePractice] = useState([]);
  const [effective, setEffective] = useState("");

  useEffect(() => {
    setPractice(new Array(practices.length).fill(false));
    setFuturePractice(new Array(practices.length).fill(false));
    console.log(practice);
  }, [sector]);

  return (
    <PageWrap goTo="/account" header="My Farm Plan" subtitle="Build your plan">
      <Control
        existing={existing}
        setExisting={setExisting}
        association={association}
        setAssociation={setAssociation}
        certificate={certificate}
        setCertificate={setCertificate}
        farm={farm}
        setFarm={setFarm}
        address1={address1}
        setAddress1={setAddress1}
        address2={address2}
        setAddress2={setAddress2}
        town={town}
        setTown={setTown}
        country={country}
        setCountry={setCountry}
        postcode={postcode}
        setPostcode={setPostcode}
        sector={sector}
        setSector={setSector}
        practices={practices}
        practice={practice}
        setPractice={setPractice}
        futurePractice={futurePractice}
        setFuturePractice={setFuturePractice}
        effective={effective}
        setEffective={setEffective}
      />
    </PageWrap>
  );
}

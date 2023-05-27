import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import "./Map.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { PageWrap } from "../../SubComponents/PageWrap";

import { getMapData } from "../../../store/actions/dataActions";
import { firestoreConnect } from "react-redux-firebase";

//Map component
const Map = (props) => {
  const [locationstate, setLocation] = useState([]);

  //handle data from firebase
  useEffect(() => {
    setLocation([]);
    if (props.data !== null && props.data !== undefined) {
      updateMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  //Handle data from firebase
  const updateMap = async () => {
    var mapData = Object.values(props.data);

    var locationArray = [];
    mapData.forEach((doc) => {
      var index = locationArray.findIndex((x) => x.location === doc.location);

      var obj = {
        foodWasteWeight: doc.foodWasteWeight,
        location: doc.location,
        coords: doc.coords,
        users: 1,
      };

      //If location does not exist, add to array, if exists, add to location total weight
      if (index === -1) {
        locationArray.push(obj);
      } else {
        locationArray[index].foodWasteWeight += doc.foodWasteWeight;
        locationArray[index].users += 1;
      }
    });

    locationArray.forEach((doc) => {
      try {
        var obj = {
          lat: doc.coords[0],
          lng: doc.coords[1],
          location: doc.location,
          users: doc.users,
          foodWasteWeight: doc.foodWasteWeight,
        };
        setLocation((oldArray) => [...oldArray, obj]);
      } catch (err) {
        //console.log(err);
      }
    });
  };

  //Marker colours
  //const large = { color: "#ffffff", fillColor: "#ec7063", fillOpacity: 0.5 };
  const medium = { color: "#ffffff", fillColor: "#f5b041", fillOpacity: 0.5 };
  const small = { color: "#ffffff", fillColor: "#58d68d", fillOpacity: 0.5 };

  //Map Marker
  function MapMarker(props) {
    //Handle Marker Color based on users
    var color;
    if (props.users <= 10) {
      color = small;
      // } else if (props.foodWasteWeight <= 100) {
      //   color = medium;
    } else {
      color = medium;
    }

    //If only 1 user, or many users
    var _users = "User";
    if (props.users > 1) _users = "Users";

    return (
      <CircleMarker
        center={[props.lat, props.lng]}
        pathOptions={color}
        radius={18}
      >
        <Tooltip>
          {props.location}: {props.users} {_users}
        </Tooltip>
      </CircleMarker>
    );
  }

  //Cluster Marker
  const createClusterCustomIcon = function (cluster) {
    var children = cluster.getAllChildMarkers();
    var sum = 0;

    children.forEach((child) => {
      sum += child._tooltip.options.children[2];
    });

    //Color based on no of users
    var c = " ";
    if (sum < 10) {
      c += "small";
      // } else if (sum < 100) {
      //   c += "medium";
    } else {
      c += "medium";
    }

    return L.divIcon({
      html: `<b>${sum}</b>`,
      className: "marker-cluster-custom" + c,
      iconSize: L.point(40, 40, true),
    });
  };

  //Redirect if not logged in
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <PageWrap header="Users Map" goTo="/account">
      <MapContainer
        className="map-data"
        center={[0, 0]}
        zoom={1.4}
        minZoom={1.4}
        maxZoom={12}
        scrollWheelZoom={true}
        maxBounds={[
          [84.865782, -179.632962],
          [-84.865782, 199.335822],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          polygonOptions={{
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5,
            smoothFactor: 20,
          }}
          showCoverageOnHover={true}
          maxClusterRadius={50}
        >
          {locationstate.map(
            ({ lat, lng, foodWasteWeight, location, users }, index) => (
              <MapMarker
                key={index}
                lat={lat}
                lng={lng}
                foodWasteWeight={foodWasteWeight}
                location={location}
                users={users}
              />
            )
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </PageWrap>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    // data: state.data.getData,
    data: state.firestore.data.mapData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMapData: (product) => dispatch(getMapData(product)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth) return [];
    return [
      {
        collection: "mapData",
        storeAs: "mapData",
      },
    ];
  })
)(Map);

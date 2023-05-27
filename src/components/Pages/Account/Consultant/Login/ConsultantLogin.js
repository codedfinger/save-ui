import React, { useState, useEffect } from "react";

import "../../../Account/UserAccount.css";
import "../../../Auth/Mob.css";
import { Title } from "../../../Auth/MobComponents";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signIn } from "../../../../../store/actions/consultingActions/consultantAuthActions";

const ConsultantLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    var data = {
      email: email,
      password: password,
    };
    props.signIn(data);
  }
  const { authError } = props;
  return (
    <Title subtitle="Log In to your Consultant Account">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="signup-center subtitles row">
          <Link to="/forgot-password" style={{ color: "#AFBA15" }}>
            Forgot your password?
          </Link>
        </div>
      </Form>
      <div className="auth-error">{authError ? <p> {authError}</p> : null}</div>
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
    </Title>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantLogin);

import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import { Form, Card, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import LoginCSS from "./Login.module.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getUserDetails, dispatch, ACTIONS } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      dispatch({ type: ACTIONS.RESET_CART });
      await login(emailRef.current.value, passwordRef.current.value).then(
        getUserDetails()
      );
      history.push("/");
      setTimeout(dispatch({ type: ACTIONS.SET_CART_ITEMS }), 4000);
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div className={LoginCSS.loginContainer}>
      <Card className={LoginCSS.loginCard} style={{ width: "500px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className={LoginCSS.loginForm} onSubmit={handleSubmit}>
            <Form.Group className="mt-4" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={LoginCSS.loginText}
                type="email"
                // pattern=".+@gmail\.com"
                placeholder="joe@gmail.com"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group className="mt-4" id="password">
              <Form.Label className={LoginCSS.loginPassword}>
                Password
              </Form.Label>
              <Form.Control
                className={LoginCSS.loginText}
                type="password"
                ref={passwordRef}
                // pattern=""
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className={LoginCSS.loginButton}
              type="submit"
              variant="danger"
            >
              LOG IN
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className={LoginCSS.loginFooter}>
        <div className={LoginCSS.loginForgotPassword}>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <div className="w-50 text-center">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import auth from "../services/auth0";

function Auth() {
  const history = useHistory();

  const hash = history.location.hash;

  console.log(history);

  useEffect(() => {
    new auth().parseHash(hash);
  }, []);

  if (!hash) return <Redirect to="/" />;
  return <div>loading...</div>;
}

export default Auth;

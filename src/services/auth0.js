import auth0 from "auth0-js";
import config from "../auth_config.json";

class Auth0 {
  auth;

  constructor() {
    this.auth = new auth0.WebAuth({
      domain: config.domain,
      clientID: config.clientId,
      //audience: config.audience,
      redirectUri: window.location.origin
    });
  }

  async signup(email, password, username) {
    this.auth.signup(
      {
        connection: "Username-Password-Authentication",
        email,
        username,
        password
      },
      function(err) {
        if (err) return alert("Something went wrong: " + err.message);
        return alert("success signup without login!");
      }
    );
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.auth.client.login(
        {
          username,
          password,
          realm: "Username-Password-Authentication"
        },
        function(error, authResult) {
          if (error) {
            console.log(error);
            alert("Something went wrong: " + error.description);
            return reject(error);
          }
          alert("success logged in");
          console.log(authResult);
          return resolve(authResult);
        }
      );
    });
  }

  async parseHash(hash) {
    debugger;
    this.auth.parseHash(
      {
        hash,
        responseType: "token",
        realm: "Username-Password-Authentication"
      },
      function(error) {
        debugger;
        if (error) return alert("Something went wrong: " + error.description);
        return alert("success logged in");
      }
    );
  }
}

export default Auth0;

import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@material-ui/core";

const GoogleLog = () => {
  const responseGoogle = (response) => {
    console.log(response.xt);
  };
  return (
    <GoogleLogin
      clientId="22058456601-i1dqo8jj6tvllrm0cv6db9vs817dfabo.apps.googleusercontent.com"
      render={(renderProps) => (
        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <FcGoogle size={20} style={{ marginRight: "0.5rem" }} /> Continue with
          Google
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLog;

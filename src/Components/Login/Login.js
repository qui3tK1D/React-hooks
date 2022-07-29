import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import classes from "./Login.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = function (state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = function (state, action) {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if ((action.type = "INPUT_BLUR")) {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

function Login() {
  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // stop useEffect when form is valid
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // run initial load and depend on dependencies
    const identifier = setTimeout(() => {
      setTimeout(() => {
        setFormIsValid(emailState.isValid && passwordState.isValid);
      }, 1000);
    }, 500);

    return () => {
      // run before next effect or before compo unmounte
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailHandler = function (e) {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const passwordHandler = function (e) {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };

  // class invalid input
  const validateEmailHandler = function (e) {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = function () {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const loginHandler = function (e) {
    e.preventDefault();

    if (formIsValid) {
      ctx.onLogin({ emailState, passwordState });
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else if (!passwordIsValid) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={loginHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          label="E-mail"
          id="email"
          value={emailState.value}
          onChange={emailHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          label="Password"
          id="password"
          value={passwordState.value}
          onChange={passwordHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;

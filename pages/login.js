import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../share/redux/authSlice";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState(false);
  const [cookies, setCookies] = useCookies(["accessToken", "userId", "email"]);
  const dispatch = useDispatch();

  // user redux
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(`redux auth => ${JSON.stringify(auth)}`);
  }, [auth]);

  useEffect(() => {
    if (values.email.length > 5) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [values]);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://binar-blog-app.herokuapp.com/login", values)
      .then((res) => {
        const { accessToken, id, email } = res.data;
        setCookies("accessToken", accessToken, { maxAge: 60000 });
        setCookies("userId", id, { maxAge: 60000 });
        setCookies("email", email, { maxAge: 60000 });
        // set redux to logged in
        dispatch(setLogin(accessToken));
      })
      .catch((err) => alert("Login lu salah coy"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" onChange={handleOnChange} value={values.email} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={handleOnChange} type="password" />
        </div>
        <div>
          <button type="submit">Login</button>{" "}
        </div>
        {warning ? <div>Kepanjangan wooyy</div> : <div></div>}
      </form>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import Api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  //navigate
  const navigate = useNavigate();

  //destructure context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext);

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);
  const [loginFailed, setLoginFailed] = useState([]);

  //function "login"
  const login = async (e) => {
    e.preventDefault();

    //call api login
    await Api.post("/api/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        //set token and user to cookie
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", JSON.stringify(response.data.data.user));

        //assign true to state "isAuthenticated"
        setIsAuthenticated(true);

        //redirect ke halaman dashboard
        navigate("/admin/dashboard", { replace: true });
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data);

        //assign error to state "loginFailed"
        setLoginFailed(error.response.data);
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card border-0 rounded shadow-sm">
          <div className="card-body">
            <h4>LOGIN</h4>
            <hr />
            {validation.errors && (
              <div className="alert alert-danger mt-2 pb-0">
                {validation.errors.map((error, index) => (
                  <p key={index}>
                    {error.path} : {error.msg}
                  </p>
                ))}
              </div>
            )}
            {loginFailed.message && (
              <div className="alert alert-danger mt-2">
                {loginFailed.message}
              </div>
            )}
            <form onSubmit={login}>
              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Magic } from "magic-sdk";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Track loading status

  const magic = new Magic(process.env.REACT_APP_MAGIC_LINK_PUBLISH_KEY);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
  
    const email = new FormData(e.target).get("email");
  
    try {
      if (email === "dev@ai42.com") { // Check if the provided email is the test email
        /* One-liner login with email OTP 🤯 */
        await magic.auth.loginWithEmailOTP({ email });
  
        const Token = await magic.user.getIdToken();
        localStorage.setItem("userData", `{"email":"${email}"}`);
        localStorage.setItem("userToken", `{"Token":"${Token}"}`);
  
        navigate("/subscribe");
      } else {
        alert("Invalid email. Please use dev@ai42.com for testing.");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading back to false when login is completed
    }
  };
  

  return (
    <div className="main_login">
      <div className="container max-w-[1280px] m-auto">
        <div className="sub_login flex flex-col items-center justify-center h-screen">
          <p className="mb-8 text-4xl font-bold text-center text-white">
            Welcome to AI42 <br /> Dating Coach
          </p>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-sm text-slate-500">
                Just enter your email and start generating images for free
              </p>
              <div className="login_form grid gap-6">
                <form onSubmit={handleLogin}>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label className="login_label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="login_input"
                        id="email"
                        placeholder="name@example.com"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        name="email"
                      />
                      <p className="text-red-700"></p>
                    </div>
                    <button
                      type="submit"
                      className="let-me-in_btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-blue-700"
                      disabled={loading} // Disable the button when loading is true
                    >
                      {loading ? "Logging In..." : "Let me in"}
                    </button>

                    <div className="mt-4 text-xs text-center text-slate-500">
                      By continuing, you agree to our{" "}
                      <a className="underline" target="_blank" href="/terms">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a className="underline" target="_blank" href="/privacy">
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

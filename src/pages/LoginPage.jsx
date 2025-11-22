import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PiEye, PiEyeClosed} from "react-icons/pi";

const AdminLogin = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [passwordShown, setPasswordShown] = useState(false);
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();

 const togglePasswordVisibility = () => {
  setPasswordShown(!passwordShown);
 };

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
   const res = await fetch("https://right-bite-store.onrender.com/api/v1/auth/sign-in", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
   });

   if (res.ok) {
    const data = await res.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    localStorage.setItem("adminEmail", email);

    navigate("/admin/dashboard");
   } else if (res.status === 404) {
    setError("Email not found.");
   } else if (res.status === 400) {
    setError("Invalid login credentials.");
   } else {
    setError("An error occurred. Please try again.");
   }
  } catch (err) {
   setError("Server is unavailable. Please try later.");
   console.error("Login error:", err);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex bg-gray-100">
   <div
    className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat"
    style={{
     backgroundImage: "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200')",
    }}
   />

   <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
    <div className="w-full max-w-md space-y-8">
     <div className="text-center">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back Admin</h1>
      <p className="text-gray-600">Sign in to manage your dashboard</p>
     </div>

     <form
      onSubmit={handleLogin}
      className="mt-8 space-y-6"
     >
      <div>
       <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-2"
       >
        Email address
       </label>
       <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#234D2E] focus:border-transparent outline-none transition"
        placeholder="Enter your email address"
       />
      </div>

      <div>
       <div className="flex justify-between items-center mb-2">
        <label
         htmlFor="password"
         className="block text-sm font-medium text-gray-700"
        >
         Password
        </label>
        <button
         type="button"
         onClick={togglePasswordVisibility}
         className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition"
        >
         {passwordShown ? (
          <>
           <PiEyeClosed className="w-4 h-4" />
           Hide
          </>
         ) : (
          <>
           <PiEye className="w-4 h-4" />
           Show
          </>
         )}
        </button>
       </div>
       <div className="relative">
        <input
         id="password"
         type={passwordShown ? "text" : "password"}
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#234D2E] focus:border-transparent outline-none transition"
         placeholder="Enter your password"
        />
       </div>
       <a
        href="/forgot-password"
        className="inline-block mt-2 text-sm text-gray-900 hover:underline font-medium"
       >
        Forgot your password?
       </a>
      </div>

      {error && (
       <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      <button
       type="submit"
       disabled={isLoading}
       className="w-full bg-[#234D2E] hover:bg-[#2D6B41] text-white font-medium py-4 px-6 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
       {isLoading ? (
        <span className="flex items-center justify-center gap-2">
         <svg
          className="animate-spin h-5 w-5"
          viewBox="0 0 24 24"
         >
          <circle
           className="opacity-25"
           cx="12"
           cy="12"
           r="10"
           stroke="currentColor"
           strokeWidth="4"
           fill="none"
          />
          <path
           className="opacity-75"
           fill="currentColor"
           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
         </svg>
         Logging in...
        </span>
       ) : (
        "Log in"
       )}
      </button>
     </form>
    </div>
   </div>
  </div>
 );
};

export default AdminLogin;

import { useState, useEffect } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = function () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const navigate = useNavigate();

  const { signUp } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
        setValidationError({ message: "Passwords do not match" });
        return;
    };

    setLoading(true);
    setValidationError(null); // Clear validation error if checks pass

    try {
      const response = await signUp({
        name,
        lastName,
        email,
        password,
      });
      setUserCreated(response);
    } catch (error) {
      console.error("Error submitting user info:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userCreated) {
      const timer = setTimeout(() => {
        navigate("/signin");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [userCreated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Creating User..." : "Create User"}
        </button>

        {/* Validation Error */}
        {validationError && (
            <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {validationError.message}
            </div>
        )}

        {/* User Created Feedback */}
        {userCreated && (
            <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
            User created successfully! Redirecting to Gemini
            </div>
        )}
        <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
      </form>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { useNavigate, Link } from "react-router-dom";  // Import Link

export const SignIn = function() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState(null);

    const navigate = useNavigate();

    const { signIn, signinWithGoogle, isLoggedIn } = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setValidationError(null);

        try {
          await signIn({ email, password });
          console.log("Sign-in successful");
          navigate("/");
        } catch (error) {
          console.error("Error signing in:", error);
          setValidationError(error);
        } finally {
          setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
          await signinWithGoogle();
          console.log("Google Sign-In successful");
          navigate("/");
        } catch (error) {
          console.log("Failed to sign in with Google.", error);
          setValidationError(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Sign In</h2>

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
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors mt-2"
            >
              Sign In with Google
            </button>

            {validationError && (
              <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {validationError.message}
              </div>
            )}

            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>
    );
};

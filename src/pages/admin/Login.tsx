import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();

  const resetCaptcha = () => {
    captchaRef.current?.reset();
    setCaptchaToken(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, captchaToken }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Login failed");
        resetCaptcha();
      }
    } catch (error) {
      toast.error("Network error");
      resetCaptcha();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 p-4">
      <Card className="w-full max-w-md shadow-lg border-sky-500/10">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-sky-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="flex justify-center pt-2">
              {import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
              import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={
                    import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
                    import.meta.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                    ""
                  }
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={resetCaptcha}
                  onErrored={resetCaptcha}
                />
              ) : (
                <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 w-full text-center">
                  ⚠️ reCAPTCHA not configured
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-sky-500 hover:bg-sky-600"
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;

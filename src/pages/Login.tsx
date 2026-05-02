import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left duration-500">
          <div className="space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <PlusCircle className="text-primary-foreground h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">PropelAI</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your workspace.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Email Address</label>
              <Input type="email" placeholder="name@company.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold tracking-tight text-foreground/80">Password</label>
                <Link to="#" className="text-sm text-primary hover:underline underline-offset-4">Forgot password?</Link>
              </div>
              <Input type="password" required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 font-bold shadow-lg shadow-primary/10">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline underline-offset-4">Create account</Link>
          </p>
        </div>
      </div>

      {/* Right Column: Hero/Context */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-muted/30 border-l relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-md space-y-12 relative z-10 text-center lg:text-left">
           <div className="space-y-6">
             <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-6 w-6" />
             </div>
             <h2 className="text-4xl font-bold tracking-tight leading-tight">Speed up your workflow, close more deals.</h2>
             <p className="text-muted-foreground text-lg">
                PropelAI helps freelancers save hours every week while actually improving their proposal conversion rates.
             </p>
           </div>
           
           <div className="space-y-4">
              {[
                "10x faster proposal writing",
                "Built-in tracking and revenue analytics",
                "Gemini 3 powered personalization"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                   </div>
                   <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

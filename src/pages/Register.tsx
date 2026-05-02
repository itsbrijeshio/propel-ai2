import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Register() {
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
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-muted-foreground">Start your free trial today and land your next client.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Full Name</label>
              <Input type="text" placeholder="John Doe" required className="h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Email Address</label>
              <Input type="email" placeholder="name@company.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Password</label>
              <Input type="password" required className="h-11" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Confirm Password</label>
              <Input type="password" required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 font-bold shadow-lg shadow-primary/10">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Column: Hero/Context */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
        <div className="max-w-md space-y-12 relative z-10">
           <div className="space-y-6">
             <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Sparkles className="h-6 w-6" />
             </div>
             <h2 className="text-4xl font-bold tracking-tight leading-tight">Focus on your craft, not the paperwork.</h2>
             <p className="text-primary-foreground/80 text-lg">
                Stop obsessing over blank pages. Let PropelAI handle the heavy lifting of proposal writing so you can focus on building.
             </p>
           </div>
           
           <div className="space-y-4">
              {[
                "10 Free proposals every month",
                "Advanced AI tailored to your skills",
                "Ready in less than 60 seconds"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                   </div>
                   <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
           </div>

           <div className="pt-8 border-t border-white/10 italic text-primary-foreground/60 text-sm">
             "The best $24 I spend every month as a freelancer. It basically paid for itself with the first gig I landed."
             <div className="mt-2 font-bold not-italic">— Alex P., Fullstack Dev</div>
           </div>
        </div>
      </div>
    </div>
  );
}

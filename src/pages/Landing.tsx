import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  BarChart3, 
  ChevronRight,
  PlusCircle,
  MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <PlusCircle className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">PropelAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Button asChild size="sm">
            <Link to="/register">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden border-b">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              New: Gemini 3 powered proposal engine
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.1] mb-8"
            >
              Write proposals that <span className="text-primary italic">actually</span> get replies
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
            >
              Generate, manage, and improve your proposals with AI — built for freelancers who want more clients, not more typing.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base" asChild>
                <Link to="/#pricing">View Pricing</Link>
              </Button>
            </motion.div>
            
            {/* Dashboard Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 w-full max-w-5xl rounded-2xl border bg-card shadow-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none"></div>
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Product UI Preview" 
                className="w-full h-auto opacity-90 transition-transform duration-700 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Three simple steps to your next contract.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Paste job description", text: "Drop in the client requirement from Upwork, Fiverr, or email.", icon: MessageSquare },
                { title: "Generate proposals", text: "Get multiple tailored versions instantly with different tones.", icon: Sparkles },
                { title: "Track and improve", text: "See what works and refine your approach over time.", icon: BarChart3 },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 border-b">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Designed for professional freelancers</h2>
                <div className="space-y-8 mt-10">
                  {[
                    { title: "AI Proposal Generation", desc: "Create personalized proposals in seconds based on your specific profile and skill set.", icon: Sparkles },
                    { title: "Tone Control", desc: "Adjust your style instantly: Professional, Friendly, or Direct depending on the client's vibe.", icon: Zap },
                    { title: "Full Tracking", desc: "Keep all your proposals in one place with clear status indicators for sent, replied, and hired.", icon: BarChart3 },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-primary/5 absolute -top-10 -right-10 w-64 h-64 blur-3xl"></div>
                <img 
                  src="https://picsum.photos/seed/freelancer/800/800" 
                  alt="Feature visualization" 
                  className="rounded-2xl border shadow-xl relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-muted/20">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mb-16">Start for free and upgrade as you scale your business.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 flex flex-col items-start gap-6 border-2 relative hover:border-border transition-colors">
                <div className="text-left w-full">
                  <h3 className="text-2xl font-bold">Free Plan</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/ forever</span>
                  </div>
                </div>
                <ul className="space-y-3 text-left w-full text-sm">
                  {["10 proposals per month", "Basic tones", "Save proposals", "Standard support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-auto" asChild>
                  <Link to="/register">Start Free</Link>
                </Button>
              </Card>

              <Card className="p-8 flex flex-col items-start gap-6 border-2 border-primary relative shadow-xl shadow-primary/10">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                <div className="text-left w-full">
                  <h3 className="text-2xl font-bold text-primary">Pro Plan</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">$24</span>
                    <span className="text-muted-foreground text-sm font-normal">/ mo</span>
                  </div>
                </div>
                <ul className="space-y-3 text-left w-full text-sm">
                  {["Unlimited proposals", "Multiple versions", "Advanced proposal tracking", "Priority generation", "Custom bio optimization"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-auto py-6 text-lg" asChild>
                  <Link to="/register">Upgrade to Pro</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold tracking-tight mb-6">Start writing better proposals today</h2>
            <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">Join 2,000+ freelancers closing bigger deals with AI efficiency.</p>
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-lg font-bold" asChild>
              <Link to="/register">Create your account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-card text-muted-foreground text-sm">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <PlusCircle className="text-primary h-5 w-5" />
              <span className="text-lg font-bold tracking-tight text-foreground">PropelAI</span>
            </div>
            <p>© 2026 PropelAI Platform. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

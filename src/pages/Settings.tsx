import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  Shield, 
  Moon, 
  Sun,
  Globe,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useTheme } from '@/components/ThemeProvider';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your freelancer profile, billing, and app preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-muted/30 p-1 mb-8 border h-auto flex flex-wrap gap-1">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-2 px-4 shadow-none data-[state=active]:shadow-sm">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2 py-2 px-4 shadow-none data-[state=active]:shadow-sm">
            <SettingsIcon className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2 py-2 px-4 shadow-none data-[state=active]:shadow-sm">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 py-2 px-4 shadow-none data-[state=active]:shadow-sm">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-muted/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Freelancer Profile</CardTitle>
              <CardDescription>This information is used by PropelAI to personalize your proposals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight text-foreground/80">Full Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight text-foreground/80">Pro Title</label>
                  <Input defaultValue="Senior Full Stack Developer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-tight text-foreground/80">Professional Bio</label>
                <Textarea 
                  className="min-h-[120px]"
                  defaultValue="Passionate developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js and AWS cloud infrastructure."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold tracking-tight text-foreground/80">Skills (Separated by commas)</label>
                <div className="space-y-4">
                  <Input defaultValue="React, TypeScript, Node.js, AWS, Tailwind, PostgreSQL" />
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'AWS', 'Tailwind', 'PostgreSQL'].map(skill => (
                      <Badge key={skill} variant="secondary" className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight text-foreground/80">Exp. (Years)</label>
                  <Input type="number" defaultValue={8} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight text-foreground/80">Hourly Rate ($)</label>
                  <Input type="number" defaultValue={85} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight text-foreground/80">Currency</label>
                  <Input defaultValue="USD" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline">Reset Changes</Button>
                <Button onClick={handleSave} className="px-8 font-bold">Save Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-muted/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">App Preferences</CardTitle>
              <CardDescription>Customize your workspace experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">Dark Mode</h4>
                    <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-bold"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border shadow-sm text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">Default Tone</h4>
                    <p className="text-xs text-muted-foreground">Pre-select your favorite writing style.</p>
                  </div>
                </div>
                <select className="bg-background border rounded-md text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Confident</option>
                  <option>Direct</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="border-muted/20 shadow-sm bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge className="bg-primary hover:bg-primary font-bold uppercase tracking-widest text-[10px] px-3 py-1">PRO</Badge>
              </CardTitle>
              <CardDescription>Your Pro subscription renovates on April 12, 2024.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">$24</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              <div className="pt-4 border-t flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">View Invoices</Button>
                <Button className="flex-1 font-bold">Manage Subscription</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="p-20 text-center text-muted-foreground italic border border-dashed rounded-xl">
           Security settings are coming soon to your workspace.
        </TabsContent>
      </Tabs>
    </div>
  );
}

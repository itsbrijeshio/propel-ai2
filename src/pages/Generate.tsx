import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Save, 
  RefreshCcw,
  AlertCircle,
  FileText,
  User,
  Tags
} from 'lucide-react';
import { generateProposal } from '@/services/geminiService';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

const tones = [
  { id: 'professional', label: 'Professional', desc: 'Standard business tone' },
  { id: 'friendly', label: 'Friendly', desc: 'Approachable and warm' },
  { id: 'confident', label: 'Confident', desc: 'Bold and expert-led' },
  { id: 'direct', label: 'Direct', desc: 'Concise and to the point' },
];

export default function Generate() {
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [versions, setVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<number>(0);
  const [hasCopied, setHasCopied] = useState(false);

  // Mock user profile for demo
  const userProfile = {
    name: 'John Doe',
    title: 'Senior Full Stack Developer',
    experienceYears: 8,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'AWS'],
    bio: 'Passionate developer with 8+ years of experience building scalable web applications and SaaS products.'
  };

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description first.");
      return;
    }

    setIsGenerating(true);
    setVersions([]);
    
    try {
      const result = await generateProposal(jobDescription, tone, userProfile);
      if (result && result.length > 0) {
        setVersions(result);
        toast.success("Proposals generated successfully!");
      } else {
        toast.error("Failed to generate proposal. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (versions[selectedVersion]) {
      navigator.clipboard.writeText(versions[selectedVersion]);
      setHasCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
      {/* Left Column: Input */}
      <div className="lg:col-span-5 space-y-6 animate-in slide-in-from-left duration-500">
        <Card className="border-muted/20 shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Job Details
            </CardTitle>
            <CardDescription>Provide the client's requirements to generate a tailored proposal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Job Description</label>
              <Textarea 
                placeholder="Paste the job description from Upwork, Fiverr, or Email here..." 
                className="min-h-[300px] resize-none focus-visible:ring-primary/20 transition-all border-muted-foreground/20"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest leading-none">
                  {jobDescription.length} characters
                </span>
                {jobDescription.length > 50 && (
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5 font-bold tracking-tighter">GOOD DETAIL</Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold tracking-tight text-foreground/80">Desired Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-full h-11 border-muted-foreground/20">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <div className="flex flex-col items-start scale-95 origin-left">
                        <span className="font-semibold">{t.label}</span>
                        <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/25 relative overflow-hidden group"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Proposal
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed border-muted-foreground/30 bg-transparent">
          <CardContent className="p-4 flex gap-3 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-primary/60" />
            <p>
              Gemini will use your <strong>active profile</strong> to personalize these proposals. 
              Update your skills and bio in <span className="font-bold text-primary underline decoration-primary/30 underline-offset-4 cursor-pointer">Settings</span> for better results.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Results */}
      <div className="lg:col-span-7 space-y-6 animate-in slide-in-from-right duration-500">
        {!versions.length && !isGenerating ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl bg-muted/20 text-center min-h-[500px]">
             <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-primary/40" />
             </div>
             <h3 className="text-xl font-bold mb-2">Ready to generate?</h3>
             <p className="text-muted-foreground max-w-sm">
                Paste a job description on the left and click generate to get started. 
                Our AI will create 3 custom versions for you.
             </p>
          </div>
        ) : (
          <Card className="border-muted/20 shadow-lg min-h-[600px] flex flex-col relative overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 mb-4">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }} 
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                </div>
                <p className="text-sm font-semibold tracking-widest uppercase animate-pulse">Brainstorming options...</p>
              </div>
            )}
            
            <CardHeader className="pb-0 border-b overflow-x-auto">
              <Tabs defaultValue="0" className="w-full" onValueChange={(v) => setSelectedVersion(parseInt(v))}>
                <div className="flex items-center justify-between">
                  <TabsList className="bg-transparent border-none p-0 h-11">
                    {versions.map((_, idx) => (
                      <TabsTrigger 
                        key={idx} 
                        value={idx.toString()}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 h-full transition-all"
                      >
                        Version {idx + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-y-auto">
              <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedVersion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="markdown-body"
                  >
                    <ReactMarkdown>{versions[selectedVersion]}</ReactMarkdown>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>

            <div className="p-4 border-t bg-muted/10 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy} className="h-10 px-4 group bg-card">
                  {hasCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button variant="outline" className="h-10 px-4 bg-card group">
                  <Save className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  Save Draft
                </Button>
              </div>
              <Button className="h-10 px-6 font-bold shadow-md shadow-primary/10">
                Finalize & Mark Sent
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

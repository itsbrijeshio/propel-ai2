import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  Trash2, 
  Calendar,
  Sparkles,
  DollarSign,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Proposal, ProposalStatus } from '@/types';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

// Mock data fetch
const getProposalById = (id: string): Proposal | undefined => {
  const mockProposals: Proposal[] = [
    { 
      id: '1', 
      title: 'React Expert needed for FinTech Dashboard', 
      status: 'replied', 
      createdAt: '2024-03-20', 
      tone: 'Professional',
      jobDescription: 'Seeking a senior React developer to build a financial analytics dashboard with complex data visualizations using D3.js and Recharts. Integration with internal banking APIs required. High attention to detail and performance is a must.',
      content: "Dear Client,\n\nI was excited to see your posting for a **Senior React Developer**. With over 8 years of experience building scalable dashboards for financial institutions, I believe I am uniquely positioned to deliver this project.\n\n### Why me?\n- **FinTech Expertise**: I have built secure dashboards for 3 major banks.\n- **Data Viz Master**: Deep experience with D3.js and Recharts (as seen in my portfolio).\n- **Performance Obsessed**: I specialize in optimizing React rendering for high-frequency data updates.\n\nI would love to discuss how I can help your team. When work can we jump on a quick 10-minute discovery call?\n\nBest regards,\nJohn Doe",
      versions: []
    },
    { 
      id: '3', 
      title: 'Python Scraper for Real Estate Data', 
      status: 'hired', 
      createdAt: '2024-03-18', 
      tone: 'Direct',
      jobDescription: 'Need a fast scraper to collect property data from various portals.',
      content: 'I have built high-performance scrapers using Selenium and BeautifulSoup...',
      revenue: 1200,
      versions: []
    },
  ];
  return mockProposals.find(p => p.id === id);
};

const statusColors: Record<ProposalStatus, string> = {
  draft: 'bg-slate-100 text-slate-700',
  sent: 'bg-blue-100 text-blue-700',
  replied: 'bg-orange-100 text-orange-700',
  hired: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

export default function ProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const proposal = getProposalById(id || '');
  const [hasCopied, setHasCopied] = useState(false);
  const [revenue, setRevenue] = useState(proposal?.revenue?.toString() || '');

  if (!proposal) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <h2 className="text-2xl font-bold mb-4">Proposal not found</h2>
        <Button onClick={() => navigate('/proposals')}>Back to List</Button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal.content);
    setHasCopied(true);
    toast.success("Proposal text copied!");
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb & Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/proposals')}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{proposal.title}</h2>
              <Badge className={cn("px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none", statusColors[proposal.status])}>
                {proposal.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {proposal.createdAt}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">{proposal.tone} Tone</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button size="sm" onClick={handleCopy} className="flex-1 sm:flex-none">
            {hasCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            Copy Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-muted/20 shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/10 border-b py-3 px-6">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Final Proposal Content
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown>{proposal.content}</ReactMarkdown>
            </CardContent>
          </Card>

          <Card className="border-muted/20 bg-muted/5">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm">Job Description (Context)</CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                 {proposal.jobDescription}
               </p>
             </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions/Tracking */}
        <div className="space-y-6">
          <Card className="border-muted/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Track Outcome</CardTitle>
              <CardDescription>Update the status as the conversation progresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start h-12 hover:bg-blue-50 transition-colors">
                  <Send className="mr-3 h-4 w-4 text-blue-500" />
                  Mark as Sent
                </Button>
                <Button variant="outline" className="justify-start h-12 hover:bg-orange-50 transition-colors">
                  <MessageSquare className="mr-3 h-4 w-4 text-orange-500" />
                  Mark as Replied
                </Button>
                <Button variant="outline" className="justify-start h-12 hover:bg-green-50 transition-colors">
                  <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                  Mark as Hired
                </Button>
              </div>

              <div className="pt-4 border-t space-y-3">
                 <label className="text-sm font-semibold tracking-tight text-foreground/80">Project Revenue ($)</label>
                 <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="number" 
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      placeholder="Amount" 
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold" 
                    />
                 </div>
                 <Button variant="secondary" className="w-full h-10 font-bold mt-2">Update Revenue</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/20 bg-primary/5 border-primary/10 overflow-hidden">
            <div className="p-6">
              <h4 className="text-sm font-bold tracking-tight mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Improve this proposal?
              </h4>
              <p className="text-xs text-muted-foreground mb-4">
                Redo with a different tone or adjust your profile for better conversion.
              </p>
              <Button size="sm" variant="outline" className="w-full border-primary/20 hover:bg-primary/10" onClick={() => navigate('/generate')}>
                Regenerate New Versions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

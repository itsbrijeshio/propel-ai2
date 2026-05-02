import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MoreVertical, 
  Eye, 
  Copy, 
  Trash2, 
  Search, 
  Filter,
  Plus,
  Calendar,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Proposal, ProposalStatus } from '@/types';

const mockProposals: Proposal[] = [
  { 
    id: '1', 
    title: 'React Expert needed for FinTech Dashboard', 
    status: 'replied', 
    createdAt: '2024-03-20', 
    tone: 'Professional',
    jobDescription: 'Seeking a senior React developer to build a financial analytics dashboard...',
    content: 'Dear Client, I notice you are looking for a senior React developer...',
    versions: []
  },
  { 
    id: '2', 
    title: 'Fullstack Developer for E-commerce MVP', 
    status: 'sent', 
    createdAt: '2024-03-19', 
    tone: 'Confident',
    jobDescription: 'Build an e-commerce platform with Stripe integration...',
    content: 'Hi! Building MVPs is my specialty. I have delivered 5+ e-commerce projects...',
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
  { 
    id: '4', 
    title: 'UI/UX Redesign for Mobile App', 
    status: 'draft', 
    createdAt: '2024-03-17', 
    tone: 'Friendly',
    jobDescription: 'A meditation app needs a UI overhaul for a more modern look.',
    content: 'I love your app concept! The meditation space requires calm, minimal UI...',
    versions: []
  },
  { 
    id: '5', 
    title: 'Shopify Customization & SEO', 
    status: 'lost', 
    createdAt: '2024-03-15', 
    tone: 'Professional',
    jobDescription: 'Optimizing themes and improving mobile page speed.',
    content: 'Shopify speed is critical for conversion. I can optimize your Liquid files...',
    versions: []
  },
];

const statusColors: Record<ProposalStatus, string> = {
  draft: 'bg-slate-100 text-slate-700',
  sent: 'bg-blue-100 text-blue-700',
  replied: 'bg-orange-100 text-orange-700',
  hired: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

const filterTabs: { label: string; value: ProposalStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Drafts', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Replied', value: 'replied' },
  { label: 'Hired', value: 'hired' },
];

export default function Proposals() {
  const [activeTab, setActiveTab] = useState<ProposalStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredProposals = mockProposals.filter(p => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Proposals</h2>
          <p className="text-muted-foreground">Manage and track the progress of all your generated proposals.</p>
        </div>
        <Button onClick={() => navigate('/generate')} className="shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg border w-full md:w-auto">
          {filterTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "px-4 text-xs font-semibold tracking-wide h-8",
                activeTab === tab.value ? "shadow-sm border" : "text-muted-foreground"
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search proposals..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[400px]">Proposal Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Tone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.length > 0 ? (
              filteredProposals.map((p) => (
                <TableRow 
                  key={p.id} 
                  className="hover:bg-muted/20 cursor-pointer group"
                  onClick={() => navigate(`/proposals/${p.id}`)}
                >
                  <TableCell className="font-semibold py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      {p.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none", statusColors[p.status])}>
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                       <Calendar className="h-3 w-3" />
                       {p.createdAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    {p.tone}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/proposals/${p.id}`)}>
                          <Eye className="mr-2 h-4 w-4 opacity-70" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4 opacity-70" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4 opacity-70" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No proposals found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

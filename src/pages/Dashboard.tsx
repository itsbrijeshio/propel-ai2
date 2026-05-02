import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  FileText, 
  Send, 
  MessageSquare, 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Proposal } from '@/types';

const stats = [
  { label: 'Total Proposals', value: 48, icon: FileText, change: '+12%', color: 'text-blue-600' },
  { label: 'Sent', value: 36, icon: Send, change: '+5%', color: 'text-indigo-600' },
  { label: 'Replied', value: 14, icon: MessageSquare, change: '+18%', color: 'text-orange-600' },
  { label: 'Hired', value: 6, icon: CheckCircle, change: '+2%', color: 'text-green-600' },
];

const chartData = [
  { name: 'Mon', sent: 4, hired: 1 },
  { name: 'Tue', sent: 7, hired: 0 },
  { name: 'Wed', sent: 5, hired: 2 },
  { name: 'Thu', sent: 8, hired: 1 },
  { name: 'Fri', sent: 12, hired: 2 },
  { name: 'Sat', sent: 6, hired: 0 },
  { name: 'Sun', sent: 3, hired: 0 },
];

const recentProposals: Partial<Proposal>[] = [
  { id: '1', title: 'React Expert needed for FinTech Dashboard', status: 'replied', createdAt: '2024-03-20', tone: 'Professional' },
  { id: '2', title: 'Fullstack Developer for E-commerce MVP', status: 'sent', createdAt: '2024-03-19', tone: 'Confident' },
  { id: '3', title: 'Python Scraper for Real Estate Data', status: 'hired', createdAt: '2024-03-18', tone: 'Direct' },
  { id: '4', title: 'UI/UX Redesign for Mobile App', status: 'draft', createdAt: '2024-03-17', tone: 'Friendly' },
];

const statusColors = {
  draft: 'bg-slate-100 text-slate-700',
  sent: 'bg-blue-100 text-blue-700',
  replied: 'bg-orange-100 text-orange-700',
  hired: 'bg-green-100 text-green-700',
  lost: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="text-[10px] font-bold border-muted-foreground/20">
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-muted/20 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Performance
            </CardTitle>
            <CardDescription>Activity overview for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="hired" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Secondary Insights */}
        <div className="space-y-4">
          <Card className="border-muted/20 shadow-sm flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reply Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">38.8%</span>
                <span className="text-xs text-green-600 flex items-center font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  +4.2%
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-primary h-full w-[38.8%] transition-all duration-1000"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-muted/20 shadow-sm flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">16.6%</span>
                <span className="text-xs text-green-600 flex items-center font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  +1.1%
                </span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-green-500 h-full w-[16.6%] transition-all duration-1000"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Proposals */}
      <Card className="border-muted/20 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Recent Proposals</CardTitle>
            <CardDescription>View your latest drafted and sent items</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold">
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentProposals.map((proposal) => (
              <div 
                key={proposal.id} 
                className="flex items-center justify-between p-4 px-6 hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">{proposal.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {proposal.createdAt}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">{proposal.tone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge className={cn("px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none", statusColors[proposal.status as keyof typeof statusColors])}>
                    {proposal.status}
                  </Badge>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

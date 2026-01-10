import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function Schedule() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Study Schedule</h1>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Your Schedule</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Schedule your study sessions here. Feature coming soon!</p></CardContent>
      </Card>
    </div>
  );
}

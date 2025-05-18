
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomProgress } from "@/components/ui/custom-progress";
import { cn } from "@/lib/utils";

interface RFPStatusCardProps {
  title: string;
  total: number;
  items: {
    label: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

const RFPStatusCard = ({ title, total, items, className }: RFPStatusCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className={`w-3 h-3 rounded-full mr-2`} 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.value}</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((item.value / total) * 100)}%
                  </span>
                </div>
              </div>
              <CustomProgress 
                value={(item.value / total) * 100} 
                className="h-2"
                indicatorColor={item.color}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RFPStatusCard;

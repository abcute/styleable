
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinalContentProps {
  text: string;
  isPaid: boolean;
  onOpenPayment: () => void;
}

const FinalContent = ({ text, isPaid, onOpenPayment }: FinalContentProps) => {
  const displayText = isPaid ? text : text.substring(0, 300) + "...";

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">最终文章</h2>
      
      <div className="relative">
        <div className={cn(
          "p-4 bg-white border rounded-md whitespace-pre-line",
          !isPaid && "max-h-[300px] overflow-hidden"
        )}>
          {displayText}
        </div>
        
        {!isPaid && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white flex flex-col justify-end items-center py-8">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Lock className="h-8 w-8 mx-auto text-indigo-500 mb-2" />
              <h3 className="font-medium text-lg mb-2">解锁完整内容</h3>
              <p className="text-gray-600 mb-4">支付 $2.00 美元即可查看全文</p>
              <Button onClick={onOpenPayment}>立即解锁</Button>
            </div>
          </div>
        )}
      </div>
      
      {isPaid && (
        <div className="mt-6 flex justify-between">
          <Button variant="outline">复制全文</Button>
          <Button variant="outline">下载 PDF</Button>
        </div>
      )}
    </Card>
  );
};

export default FinalContent;

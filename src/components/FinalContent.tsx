
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface FinalContentProps {
  text: string;
  isPaid: boolean;
  onOpenPayment: () => void;
}

const FinalContent = ({ text, isPaid, onOpenPayment }: FinalContentProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const displayText = isPaid ? text : text.substring(0, 300) + "...";

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "复制成功",
        description: "全文已复制到剪贴板",
        duration: 2000,
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法复制文本，请重试",
        variant: "destructive",
      });
    }
  };

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
          <Button 
            variant="outline" 
            onClick={handleCopyText}
            className="flex items-center gap-2"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                复制全文
              </>
            )}
          </Button>
          <Button variant="outline">下载 PDF</Button>
        </div>
      )}
    </Card>
  );
};

export default FinalContent;

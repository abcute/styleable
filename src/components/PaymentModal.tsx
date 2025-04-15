
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

const PaymentModal = ({ isOpen, onClose, onSuccess, amount }: PaymentModalProps) => {
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Here we would integrate with Stripe
      // This is a mock implementation
      // In a real integration, we'd call an API to create a Stripe checkout session
      
      // Simulating a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsProcessing(false);
      onSuccess();
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{t("payment.title")}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-center mb-6">
            <div className="text-3xl font-bold mr-1">${amount}.00</div>
            <div className="text-gray-500">USD</div>
          </div>
          
          <Card className="p-4 mb-6 bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">{t("payment.benefits")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{t("payment.benefit1")}</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{t("payment.benefit2")}</span>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-2 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span>{t("payment.benefit3")}</span>
              </li>
            </ul>
          </Card>
          
          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-base flex items-center gap-2" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("payment.processing")}
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  {t("payment.pay")}
                </>
              )}
            </Button>
            
            <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              {t("payment.secure")}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

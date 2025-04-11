
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    icon: LucideIcon;
    label: string;
  }[];
}

const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-start w-full max-w-3xl">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex flex-1 flex-col items-center">
              <div className={cn(
                "rounded-full p-3 mb-2",
                isCompleted ? "bg-green-100 text-green-600" :
                isActive ? "bg-indigo-100 text-indigo-600" : 
                "bg-gray-100 text-gray-400"
              )}>
                <StepIcon className="h-5 w-5" />
              </div>
              <div className="text-xs text-center">
                {step.label}
              </div>
              {!isLast && (
                <div className={cn(
                  "h-0.5 w-full flex-1 mt-6", 
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                )}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

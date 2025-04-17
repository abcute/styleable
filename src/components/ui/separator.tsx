
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, children, ...props },
    ref
  ) => {
    const hasChildren = React.Children.count(children) > 0;

    if (!hasChildren) {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "shrink-0 bg-border",
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div className="relative flex items-center w-full">
        <span className="flex-grow bg-border h-[1px]" />
        {children}
        <span className="flex-grow bg-border h-[1px]" />
      </div>
    );
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

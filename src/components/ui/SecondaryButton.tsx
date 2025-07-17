// components/ui/SecondaryButton.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-[#215197] text-[#215197] hover:bg-[#215197]/10 min-w-[240px] justify-between",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
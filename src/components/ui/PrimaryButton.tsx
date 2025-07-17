// components/ui/PrimaryButton.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // použiješ, ak chceš dynamic className kombinácie

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <Button
      variant="default"
      className={cn(
        "bg-[#215197] hover:bg-[#1b4077] text-white min-w-[240px] justify-between",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
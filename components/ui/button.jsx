import * as React from "react";
import { Slot } from "radix-ui";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ring-offset-cream disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy text-cream hover:bg-navy-soft ",
        outline: "border border-navy text-navy bg-transparent hover:bg-navy hover:text-cream",
        light: "bg-cream text-navy hover:bg-cream-deep",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-10 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        accent:
          "bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition",
        sidebar:
          "bg-transparent items-center text-white transition text-slate-900 flex justify-start gap-5 hover:bg-slate-300 focus:ring-0 focus:ring-transparent focus:ring-offset-0 dark:hover:bg-slate-800",
        radio:
          "bg-slate-400 transition text-white hover:!bg-blue-600 dark:bg-slate-600 dark:text-slate-100 relative",
        card: "flex cursor-pointer border border-transparent flex-col items-center gap-5 rounded-xl text-[2.2rem] font-semibold relative transition bg-slate-400 hover:bg-blue-600 dark:hover:bg-blue-600 text-slate-100 dark:bg-slate-600",
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        sidebar: "h-auto rounded-xl pl-3 pr-7 py-3",
        card: "h-auto py-14 w-80",
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

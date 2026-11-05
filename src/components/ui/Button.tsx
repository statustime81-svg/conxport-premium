import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102D3C] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#FF6A35] text-[#102D3C] hover:bg-[#E44310]',
        secondary: 'bg-[#233b43] text-white hover:bg-[#32535b]',
        outline: 'border border-[#FF6A35]/60 text-[#FF6A35] hover:bg-[#FF6A35]/10',
        ghost: 'text-current hover:bg-current/10',
      },
      size: { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base', icon: 'h-11 w-11' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, size, type = 'button', ...props }, ref,
) {
  return <button ref={ref} type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
});

export { Button, buttonStyles };

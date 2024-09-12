import React from 'react';

type ComponentWithoutRef<T extends keyof JSX.IntrinsicElements> = React.ComponentPropsWithoutRef<T>;

export const Card = React.forwardRef<HTMLDivElement, ComponentWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  )
);

export const CardHeader = React.forwardRef<HTMLDivElement, ComponentWithoutRef<'div'>>(
  (props, ref) => (
    <div ref={ref} className="flex flex-col space-y-1.5 p-6" {...props} />
  )
);

export const CardTitle = React.forwardRef<HTMLHeadingElement, ComponentWithoutRef<'h3'>>(
  (props, ref) => (
    <h3 ref={ref} className="text-lg font-semibold leading-none tracking-tight" {...props} />
  )
);

export const CardContent = React.forwardRef<HTMLDivElement, ComponentWithoutRef<'div'>>(
  (props, ref) => (
    <div ref={ref} className="p-6 pt-0" {...props} />
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardContent.displayName = 'CardContent';
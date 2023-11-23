import * as React from 'react';

import { cn } from '@/lib/utils';

type HTMLRootTags = 'section' | 'aside' | 'article' | 'div';

const Root = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { as?: HTMLRootTags }
>(({ className, as, ...props }, ref) => {
  const Tag = as || 'div';
  return (
    <Tag
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
});
Root.displayName = 'Card';

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
Header.displayName = 'Card.Header';

type HTMLHeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const Title = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: HTMLHeaderTag }
>(({ className, as, ...props }, ref) => {
  const Tag = as || 'h3';
  return (
    <Tag
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
});
Title.displayName = 'Card.Title';

const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
Description.displayName = 'Card.Description';

const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
Content.displayName = 'Card.Content';

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
Footer.displayName = 'Card.Footer';

export { Root, Header, Footer, Title, Description, Content };

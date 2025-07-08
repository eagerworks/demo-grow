import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./Button";
import NextLink from "next/link";
import cn from "@/helpers/cn";

type Props = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

function Link({ className, variant, size, href, children, ...props }: Props) {
  return (
    <NextLink href={href} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </NextLink>
  );
}

export { Link };

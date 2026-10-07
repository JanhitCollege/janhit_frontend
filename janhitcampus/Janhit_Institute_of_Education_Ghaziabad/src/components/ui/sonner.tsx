import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-navy group-[.toaster]:border-gold/30 group-[.toaster]:shadow-lg font-sans",
          description: "group-[.toast]:text-navy/70",
          actionButton:
            "group-[.toast]:bg-gold group-[.toast]:text-navy",
          cancelButton:
            "group-[.toast]:bg-navy/10 group-[.toast]:text-navy",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

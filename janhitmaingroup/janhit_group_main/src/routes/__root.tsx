import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
  Link,
  useLocation,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-hero text-primary-foreground px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-display font-bold text-gradient-gold">404</h1>
        <p className="mt-4 text-lg opacity-90">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-gradient-gold text-gold-foreground font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-display font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/@admin");

  if (isAdminRoute) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </QueryClientProvider>
  );
}

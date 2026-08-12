import { useCallback, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";


function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function useDesktopHashLocation(): [string, (path: string) => void] {
  const readHash = () => {
    const value = window.location.hash.replace(/^#/, "");
    return value || "/";
  };
  const [location, setLocation] = useState(readHash);
  useEffect(() => {
    const onHashChange = () => setLocation(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const navigate = useCallback((path: string) => {
    window.location.hash = path || "/";
    setLocation(path || "/");
  }, []);
  return [location, navigate];
}

function Router() {
  const isDesktopFileProtocol = typeof window !== "undefined" && window.location.protocol === "file:";
  return isDesktopFileProtocol ? (
    <WouterRouter hook={useDesktopHashLocation}>
      <Routes />
    </WouterRouter>
  ) : (
    <Routes />
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

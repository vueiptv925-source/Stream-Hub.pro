import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ApiDocs from "./pages/ApiDocs";
import Decoder from "./pages/Decoder";
import Providers from "./pages/Providers";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/decoder" component={Decoder} />
      <Route path="/providers" component={Providers} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

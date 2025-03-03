"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

/**
 * Error boundary component
 */
export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Add error event listener for uncaught errors
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      setHasError(true);
      setError(new Error(event.message));
    };

    window.addEventListener("error", handleError);

    return () => window.removeEventListener("error", handleError);
  }, []);

  const handleReset = () => {
    setHasError(false);
    setError(null);
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          {error?.message || "An unexpected error occurred"}
        </p>
        <Button onClick={handleReset}>
          Try again
        </Button>
      </div>
    );
  }

  return <>{children}</>;
} 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Component to display error messages with an optional retry button
 * @param message - The error message to display
 * @param onRetry - Optional callback function to retry the operation
 */
export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-start">
          <AlertTitle>Error</AlertTitle>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 px-2 text-xs bg-destructive/10 hover:bg-destructive/20 border-destructive/20"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </div>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
} 
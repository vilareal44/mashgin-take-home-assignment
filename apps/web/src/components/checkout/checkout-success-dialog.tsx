"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CheckoutSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: string | null;
}

/**
 * Dialog component for success message after checkout
 */
export function CheckoutSuccessDialog({
  open,
  onClose,
  orderId
}: CheckoutSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Checkout Success</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[500px]">
        <div className="py-12 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            Payment Successful!
          </h2>
          <p className="text-muted-foreground mb-4">
            Your order was submitted successfully.
          </p>
          {orderId && (
            <p className="mt-2 mb-6 font-medium">Order ID: {orderId}</p>
          )}
          <Button
            onClick={onClose}
            className="w-full sm:w-auto px-8"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
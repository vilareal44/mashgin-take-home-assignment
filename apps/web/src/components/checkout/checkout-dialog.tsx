"use client";

import { AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCartStore } from "@/lib/store/cart-store";
import { useCheckoutStore } from "@/lib/store/checkout-store";
import { CheckoutSuccessDialog } from "./checkout-success-dialog";
import { CheckoutDialogForm, CheckoutFormValues } from "./checkout-dialog-form";
import type { CheckoutData } from "@/types/checkout-data";
import type { CartItem } from "@/types/cart-item";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * A dialog component for checkout and payments
 */
export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const {
    isSubmitting,
    error,
    paymentComplete,
    submitCheckout,
    resetState,
    orderId
  } = useCheckoutStore();

  const [resetForm, setResetForm] = useState<() => void>(() => () => {});

  const handleSetFormReset = useCallback((resetFn: () => void) => {
    setResetForm(() => resetFn);
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    // Format the data for the API
    const checkoutData: CheckoutData = {
      name: data.name,
      creditCardNumber: data.cardNumber.replace(/\s/g, ''),
      expirationDate: data.expiryDate,
      cvc: data.cvc,
      address: data.address,
      total: getTotalPrice(),
      items: items.map(item => ({
        id: item.id,
        quantity: item.quantity
      } as CartItem))
    };

    try {
      await submitCheckout(checkoutData);
    } catch {
      // Error is already handled in the store
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
      resetState();
    }
    onOpenChange(isOpen);
  };

  const handleSuccessClose = () => {
    resetForm();
    resetState();
    clearCart();
    onOpenChange(false);
  };

  // Show success dialog if payment is complete
  if (paymentComplete) {
    return (
      <CheckoutSuccessDialog
        open={open}
        onClose={handleSuccessClose}
        orderId={orderId}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Provide payment details to complete your order.
            <br />
            Note: This is a mock payment. Provide any card details.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="border rounded-md p-4 mb-4">
          <h3 className="font-medium mb-2">Order Summary</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <CheckoutDialogForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          totalPrice={getTotalPrice()}
          setFormReset={handleSetFormReset}
        />
      </DialogContent>
    </Dialog>
  );
} 
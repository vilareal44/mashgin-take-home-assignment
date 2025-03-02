"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMaskInput } from "react-imask";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/cart-store";
import { useCheckoutStore } from "@/lib/store/checkout-store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema for checkout dialog validation
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  cardNumber: z
    .string()
    .min(19, { message: "Please enter a valid card number" })
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, { message: "Please enter a valid card number" }),
  expiryDate: z
    .string()
    .min(5, { message: "Please enter a valid expiry date" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Please enter a valid expiry date (MM/YY)" }),
  cvc: z
    .string()
    .min(3, { message: "CVC must be 3 or 4 digits" })
    .max(4, { message: "CVC must be 3 or 4 digits" })
    .regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const {
    isSubmitting,
    error,
    paymentComplete,
    submitCheckout,
    resetState
  } = useCheckoutStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      address: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Format the data for the API
    const checkoutData = {
      name: data.name,
      creditCardNumber: data.cardNumber.replace(/\s/g, ''),
      expirationDate: data.expiryDate,
      cvc: data.cvc,
      address: data.address,
      total: getTotalPrice(),
      items: items.map(item => ({
        id: item.id,
        quantity: item.quantity
      }))
    };

    try {
      await submitCheckout(checkoutData);

      // Set a timeout to reset the form and close the dialog
      setTimeout(() => {
        form.reset();
        resetState();
        clearCart();
        onOpenChange(false);
      }, 3000);
    } catch {
      // Error is already handled in the store
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      resetState();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {paymentComplete ? (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground">Your order was submitted.</p>
          </div>
        ) : (
          <>
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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field: { onChange, value, ref, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <IMaskInput
                          mask="0000 0000 0000 0000"
                          radix="."
                          unmask={false}
                          inputRef={(el) => {
                            ref(el);
                            if (el) {
                              el.className = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
                            }
                          }}
                          placeholder="0000 0000 0000 0000"
                          value={value}
                          onAccept={(value) => onChange(value)}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field: { onChange, value, ref, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <IMaskInput
                            mask="00/00"
                            radix="."
                            unmask={false}
                            inputRef={(el) => {
                              ref(el);
                              if (el) {
                                el.className = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
                              }
                            }}
                            placeholder="MM/YY"
                            value={value}
                            onAccept={(value) => onChange(value)}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvc"
                    render={({ field: { onChange, value, ref, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <IMaskInput
                            mask="0000"
                            radix="."
                            unmask={false}
                            inputRef={(el) => {
                              ref(el);
                              if (el) {
                                el.className = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
                              }
                            }}
                            placeholder="123"
                            value={value}
                            onAccept={(value) => onChange(value)}
                            {...fieldProps}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : `Pay $${getTotalPrice().toFixed(2)}`}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 
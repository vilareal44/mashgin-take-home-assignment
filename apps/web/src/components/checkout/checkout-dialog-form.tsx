"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

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

export type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutDialogFormProps {
  onSubmit: (data: CheckoutFormValues) => Promise<void>;
  isSubmitting: boolean;
  totalPrice: number;
  setFormReset: (resetFn: () => void) => void;
}

export function CheckoutDialogForm({
  onSubmit,
  isSubmitting,
  totalPrice,
  setFormReset
}: CheckoutDialogFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      address: "",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  // Provide the reset function to parent component
  React.useEffect(() => {
    setFormReset(() => form.reset);
  }, [form.reset, setFormReset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            {isSubmitting ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// Export the form schema to be used by other components
export { formSchema }; 
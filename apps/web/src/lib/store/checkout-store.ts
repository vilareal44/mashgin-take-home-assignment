import { create } from 'zustand';
import api from '@/src/lib/api';

interface CheckoutState {
  isSubmitting: boolean;
  error: string | null;
  paymentComplete: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setPaymentComplete: (paymentComplete: boolean) => void;
  resetState: () => void;
  submitCheckout: (checkoutData: {
    name: string;
    creditCardNumber: string;
    expirationDate: string;
    cvc: string;
    address: string;
    total: number;
    items: { id: number; quantity: number }[];
  }) => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isSubmitting: false,
  error: null,
  paymentComplete: false,

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  setPaymentComplete: (paymentComplete) => set({ paymentComplete }),

  resetState: () => set({
    isSubmitting: false,
    error: null,
    paymentComplete: false,
  }),

  submitCheckout: async (checkoutData) => {
    try {
      set({ isSubmitting: true, error: null });

      await api.post('/checkout', checkoutData);

      set({ paymentComplete: true, isSubmitting: false });
      return Promise.resolve();
    } catch (err) {
      set({ isSubmitting: false, error: "Error occurred, try again" });
      console.error("Checkout error:", err);
      return Promise.reject(err);
    }
  },
})); 
import { create } from 'zustand';
import * as api from '@/lib/api';
import type { CheckoutData } from '@/types/checkout-data';

interface CheckoutState {
  isSubmitting: boolean;
  error: string | null;
  paymentComplete: boolean;
  orderId: string | null;
  resetState: () => void;
  submitCheckout: (checkoutData: CheckoutData) => Promise<void>;
}

const initialState = {
  isSubmitting: false,
  error: null,
  paymentComplete: false,
  orderId: null,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  resetState: () => set(initialState),

  submitCheckout: async (checkoutData: CheckoutData) => {
    try {
      set({ isSubmitting: true, error: null });

      const response = await api.checkout(checkoutData);

      set({
        paymentComplete: true,
        isSubmitting: false,
        orderId: response.id
      });

    } catch (err) {
      set({ isSubmitting: false, error: "Error occurred, try again" });
      console.error("Checkout error:", err);
    }
  },
})); 
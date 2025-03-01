import { create } from 'zustand';
import api from '@/lib/api';

interface CheckoutState {
  isSubmitting: boolean;
  error: string | null;
  paymentComplete: boolean;
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

const initialState = {
  isSubmitting: false,
  error: null,
  paymentComplete: false,
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ...initialState,

  resetState: () => set(initialState),

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
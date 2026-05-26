"use client";

import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import InputField from "@/components/ui/Input/InputField";
import SelectField from "@/components/ui/Select/SelectField";
import ToastContainer from "@/components/ui/Toast/ToastContainer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShippingInfo } from "@/types";
import { validateCheckoutForm, ValidationErrors } from "@/lib/validation";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/hooks/useAuth";
import { sendEmails } from "@/lib/email";

function CheckoutForm() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { toasts, showToast, removeToast } = useToast();

  const [form, setForm] = useState<ShippingInfo>({
    email: currentUser?.email ?? "",
    phone: "",
    firstName: currentUser?.firstName ?? "",
    lastName: currentUser?.lastName ?? "",
    country: "Country",
    state: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const update = (field: keyof ShippingInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handleSubmit = async () => {
    const newErrors = validateCheckoutForm(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors before continuing.", "error");
      return;
    }

    const cartKey = currentUser ? `cart__${currentUser.email}` : "cart";
    const cart = localStorage.getItem(cartKey);
    const order = {
      id: Date.now(),
      shippingInfo: form,
      items: cart ? JSON.parse(cart) : [] as import("@/types").CartItem[],
      total: cart ? (JSON.parse(cart) as import("@/types").CartItem[]).reduce((sum, item) => sum + item.price * item.quantity, 0) : 0,
      placedAt: new Date().toISOString(),
    };

    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem(cartKey);

    showToast("Order placed successfully!", "success");

    try {
      await sendEmails({
        customerName: order.shippingInfo.firstName,
        customerEmail: order.shippingInfo.email,
        orderId: order.id,
        total: order.total,
      });
    } catch (err: any) {
      console.error("Email send failed - status:", err?.status, "text:", err?.text, "full:", JSON.stringify(err));
    }

    setTimeout(() => router.push("/order-confirmed"), 800);
  };

  return (
    <div className="mt-8">
      <div>
        <h3 className="checkout-subtitle">Contact Info</h3>
        <div className="space-y-3">
          <div>
            <InputField type="email" placeholder="Email" className="w-full lg:w-[468px]"
              value={form.email} onChange={update("email")} />
            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
          </div>
          <div>
            <InputField placeholder="Phone" className="w-full lg:w-[468px]"
              value={form.phone} onChange={update("phone")} />
            {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="checkout-subtitle">Shipping Address</h3>
        <div className="space-y-3">
          <div className="flex gap-1 lg:inline-flex">
            <div className="w-full lg:w-[231px]">
              <InputField placeholder="First Name" className="w-full"
                value={form.firstName} onChange={update("firstName")} />
              {errors.firstName && <p className="text-red-500 text-[11px] mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-full lg:w-[231px]">
              <InputField placeholder="Last Name" className="w-full"
                value={form.lastName} onChange={update("lastName")} />
              {errors.lastName && <p className="text-red-500 text-[11px] mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <SelectField className="w-full lg:w-[468px]"
              options={["Country", "India", "USA", "Canada", "UK", "Australia"]}
              value={form.country} onChange={update("country")} />
            {errors.country && <p className="text-red-500 text-[11px] mt-1">{errors.country}</p>}
          </div>

          <div>
            <InputField placeholder="State / Region" className="w-full lg:w-[468px]"
              value={form.state} onChange={update("state")} />
            {errors.state && <p className="text-red-500 text-[11px] mt-1">{errors.state}</p>}
          </div>

          <div>
            <InputField placeholder="Address" className="w-full lg:w-[468px]"
              value={form.address} onChange={update("address")} />
            {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
          </div>

          <div className="flex gap-1">
            <div className="w-full lg:w-[231px]">
              <InputField placeholder="City" className="w-full"
                value={form.city} onChange={update("city")} />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>
            <div className="w-full lg:w-[231px]">
              <InputField placeholder="Postal Code" className="w-full"
                value={form.postalCode} onChange={update("postalCode")} />
              {errors.postalCode && <p className="text-red-500 text-[11px] mt-1">{errors.postalCode}</p>}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end lg:w-[468px]">
          <PrimaryButton title="Place Order"
            className="w-full lg:w-[231px] font-beatriceDeckMedium text-[14px]"
            onClick={handleSubmit} />
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default CheckoutForm;

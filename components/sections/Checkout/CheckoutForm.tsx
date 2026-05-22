"use client";

import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import InputField from "@/components/ui/Input/InputField";
import SelectField from "@/components/ui/Select/SelectField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShippingInfo } from "@/types";

type FormData = ShippingInfo;

function CheckoutForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "Country",
    state: "",
    address: "",
    city: "",
    postalCode: "",
  }); 
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const update = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.email) newErrors.email = "Required";
    if (!form.phone) newErrors.phone = "Required";
    if (!form.firstName) newErrors.firstName = "Required";
    if (!form.lastName) newErrors.lastName = "Required";
    if (form.country === "Country") newErrors.country = "Required";
    if (!form.state) newErrors.state = "Required";
    if (!form.address) newErrors.address = "Required";
    if (!form.city) newErrors.city = "Required";
    if (!form.postalCode) newErrors.postalCode = "Required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cart = localStorage.getItem("cart");
    const order = {
      id: Date.now(),
      shippingInfo: form,
      items: cart ? JSON.parse(cart) : [],
      placedAt: new Date().toISOString(),
    };
 
    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    router.push("/order-confirmed");
  };

  return (
    <div className="mt-8">
      <div>
        <h3 className="checkout-subtitle">Contact Info</h3>
        <div className="space-y-3">
          <div>
            <InputField
              type="email"
              placeholder="Email"
              className="w-full lg:w-[468px]"
              value={form.email}
              onChange={update("email")}
            />
            {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
          </div>
          <div>
            <InputField
              placeholder="Phone"
              className="w-full lg:w-[468px]"
              value={form.phone}
              onChange={update("phone")}
            />
            {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="checkout-subtitle">Shipping Address</h3>
        <div className="space-y-3">
          <div className="flex gap-1 lg:inline-flex">
            <div className="w-full lg:w-[231px]">
              <InputField
                placeholder="First Name"
                className="w-full"
                value={form.firstName}
                onChange={update("firstName")}
              />
              {errors.firstName && <p className="text-red-500 text-[11px] mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-full lg:w-[231px]">
              <InputField
                placeholder="Last Name"
                className="w-full"
                value={form.lastName}
                onChange={update("lastName")}
              />
              {errors.lastName && <p className="text-red-500 text-[11px] mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <SelectField
              className="w-full lg:w-[468px]"
              options={["Country", "India", "USA", "Canada"]}
              value={form.country}
              onChange={update("country")}
            />
            {errors.country && <p className="text-red-500 text-[11px] mt-1">{errors.country}</p>}
          </div>

          <div>
            <InputField
              placeholder="State / Region"
              className="w-full lg:w-[468px]"
              value={form.state}
              onChange={update("state")}
            />
            {errors.state && <p className="text-red-500 text-[11px] mt-1">{errors.state}</p>}
          </div>

          <div>
            <InputField
              placeholder="Address"
              className="w-full lg:w-[468px]"
              value={form.address}
              onChange={update("address")}
            />
            {errors.address && <p className="text-red-500 text-[11px] mt-1">{errors.address}</p>}
          </div>

          <div className="flex gap-1">
            <div className="w-full lg:w-[231px]">
              <InputField
                placeholder="City"
                className="w-full"
                value={form.city}
                onChange={update("city")}
              />
              {errors.city && <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>}
            </div>
            <div className="w-full lg:w-[231px]">
              <InputField
                placeholder="Postal Code"
                className="w-full"
                value={form.postalCode}
                onChange={update("postalCode")}
              />
              {errors.postalCode && <p className="text-red-500 text-[11px] mt-1">{errors.postalCode}</p>}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end lg:w-[468px]">
          <PrimaryButton
            title="Place Order"
            className="w-full lg:w-[231px] font-beatriceDeckMedium text-[14px]"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;

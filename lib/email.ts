import emailjs from "@emailjs/browser";

type SendEmailProps = {
  customerName: string;
  customerEmail: string;
  orderId:number;
  total: number;
};

export const sendEmails = async ({
  customerName,
  customerEmail,
  total,
}: SendEmailProps) => {

  // CUSTOMER EMAIL
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_CUSTOMER_TEMPLATE_ID!,
    {
      customer_name: customerName,
      customer_email: customerEmail,
      total: total,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );

  // ADMIN EMAIL
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_ADMIN_TEMPLATE_ID!,
    {
      customer_name: customerName,
      customer_email: customerEmail,
      total: total,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};
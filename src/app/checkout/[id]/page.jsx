import CheckoutForm from "@/app/components/forms/CheckoutForms";

export default async function CheckoutPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/service/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log("checkout", data);

  return (
    <div>
      <CheckoutForm service={data}></CheckoutForm>
    </div>
  );
}

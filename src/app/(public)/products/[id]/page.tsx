export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Product Details: {id}</h1>
      <p className="text-muted-foreground">Product description and details will go here.</p>
    </div>
  );
}

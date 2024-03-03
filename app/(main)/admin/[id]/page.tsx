export default async function Admin({ params }: { params: { id: string } }) {
  return (
    <div className='container mt-8 flex flex-col gap-4'>
      <h1 className='text-3xl font-extrabold tracking-tight'>
        Album {params.id}
      </h1>
    </div>
  );
}

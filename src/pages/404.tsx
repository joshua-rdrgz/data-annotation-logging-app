export default function NotFoundPage() {
  return (
    <div className='h-screen flex flex-col gap-10 items-center justify-center text-center px-10'>
      <h1 className='text-6xl font-bold'>This page wasn&apos;t found 😭</h1>
      <h2 className='text-3xl font-medium'>
        Please pick one of the pages from the navigation menu to continue using
        the application.
      </h2>
    </div>
  );
}

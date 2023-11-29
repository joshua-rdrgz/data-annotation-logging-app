export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-screen w-3/4 mx-auto flex flex-col items-center justify-center'>
      <div className='w-5/6 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-10 items-center'>
        {children}
      </div>
    </main>
  );
};

function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-[1024px] px-6">
      {children}
    </div>
  );
}

export default Container;
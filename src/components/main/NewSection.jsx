function NewSection() {
  return (
    <section className="h-[50vh] w-full flex justify-center items-center bg-white">
      <div className="w-2/3 flex flex-col items-center gap-8 text-center">
        <h1 className="text-xl sm:text-4xl font-bold tracking-tight">
          Habitly habit tracker helps you to be your best, most productive self,
          a few points at a time. ✨
        </h1>
        <h2 className="tracking-wider">
          &quot;Productivity is never an accident. It is always the result of a
          commitment to excellence, intelligent planning, and focused
          effort.&quot; – Paul J. Meyer
        </h2>
      </div>
    </section>
  );
}

export default NewSection;

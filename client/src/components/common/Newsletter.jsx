import Container from "../layout/Container";

function Newsletter() {
  return (
    <section className="py-4">
      <Container>

        <div className="rounded-3xl bg-gradient-to-r from-[#0B5A53] to-[#148F86] px-6 py-8 text-center text-white shadow-xl">


          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Weekly Fitness Newsletter
          </span>
          
          <h2 className="text-2xl font-bold md:text-3xl">
            Stay Consistent. Stay Informed.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-green-100 md:text-base">
            Get weekly fitness tips, nutrition advice, and evidence-based
            training guides delivered straight to your inbox.
          </p>

          <div className="mx-auto mt-6 flex max-w-xl overflow-hidden rounded-full bg-white shadow-md">

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 text-sm text-slate-800 outline-none"
            />

            <button className="bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-black">
              Subscribe
            </button>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default Newsletter;
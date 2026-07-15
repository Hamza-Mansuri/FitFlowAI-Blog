import Container from "../layout/Container";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white py-3 md:py-3 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}

          <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400">
            📚 Evidence-Based Fitness Education
          </span>

          {/* Heading */}

          <h1 className="mt-1 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-white">
            Learn.
            <span className="text-green-600 dark:text-green-400"> Train.</span>
            <br />
            Transform Your Lifestyle.
          </h1>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
            Explore science-backed articles on strength training,
            nutrition, fat loss, recovery, and healthy living to
            build lasting fitness habits.
          </p>

        </div>
      </Container>
    </section>
  );
}

export default Hero;
import ConvertForm from "@/components/forms/ConvertForm";

export default function Home() {
  return (
    <main className="">
      {/* <div className="grid">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 self-center place-self-center z-10 p-2 space-y-2">
          <h1 className="text-center text-3xl md:text-5xl lg:text-7xl">
            Color Converter
          </h1>
          <p>Bring a color code!</p>
          <Button>Convert Now →</Button>
        </div>

        <div className="col-start-1 col-end-1 row-start-1 row-end-1 min-h-80 max-h-[40vw] overflow-hidden">
          <ul className="grid grid-cols-[repeat(8,1fr)] grid-rows-[repeat(7,80px)] overflow-hidden">
            {Array.from({ length: TILE_COUNT }).map((square, index) => (
              <li
                className="blur-3xl hover:blur-none hover:z-10 hover:shadow-md transition-all"
                key={index}
                style={{ backgroundColor: test[index] }}
              />
            ))}
          </ul>
        </div>
      </div> */}

      <ConvertForm />

      {/* <div className="container pt-5 pb-10">
        <p>
          Every now and then I need a color conversion utility. Most sites that
          exist for this either don&apos;t support many formats or are riddled
          with advertisements.
        </p>

        <p>
          The colors are converted using the{" "}
          <a
            href="https://github.com/ilariaventurini/colors-convert"
            className="text-sky-600 dark:text-sky-500 underline underline-offset-4 hover:no-underline"
          >
            colors-convert
          </a>{" "}
          package.
        </p>
      </div> */}
    </main>
  );
}

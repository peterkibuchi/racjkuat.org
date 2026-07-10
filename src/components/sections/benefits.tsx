import { HeaderSection } from "~/components/header-section";
import { MaxWidthWrapper } from "~/components/max-width-wrapper";
import { benefits } from "~/config/marketing";

export function Benefits() {
  return (
    <section className="pb-8 md:pb-12 lg:pb-24">
      <div className="pt-28 pb-6">
        <MaxWidthWrapper className="px-0">
          <HeaderSection
            label="Benefits"
            title="Discover what Rotaract has to offer."
            subtitle="Here are some of the benefits of joining our community."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-linear-to-b from-[#d41367]/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                />
                <div className="relative">
                  <h3 className="font-heading font-semibold">
                    {benefit.title}
                  </h3>

                  <p className="mt-4 pb-6 text-muted-foreground">
                    {benefit.description}
                  </p>

                  {/* <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
                    <Button
                      variant="secondary"
                      size="sm"
                      rounded="xl"
                      className="px-4"
                    >
                      <Link href="/" className="flex items-center gap-2">
                        <span>Read more</span>
                        <Icons.arrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>

      <div className="mx-auto text-center md:max-w-232">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          To learn more about our club, please visit the about page or our
          social media pages linked below.
        </p>
      </div>
    </section>
  );
}

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4  py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center ">
        <h1 className={title()}>Welcome to &nbsp;</h1>
        <h1 className={title({ color: "green" })}>Repowerlab&nbsp;</h1>
        <br />
        <h1 className={title()}>
          your administration site
        </h1>
       
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/blog"}
        >
          Success cases
        </Link>
      
      </div>

     

    </section>
  );
}

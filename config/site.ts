export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Repowerlab admin",
  description: "Site for administration",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Success cases",
      href: "/blog",
    },
   
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

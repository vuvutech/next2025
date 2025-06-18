// /config/site.ts
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "College of Sustainable Transformation and Development (COSTrAD)",
  shortName: "COSTrAD",
  description:
    "Strategic Voting, Voting Strategies, Election Strategy, Territorial Vision, Leadership Development, Governance, Sustainable Institutions, National Development, Economic Growth, Political Participation, Civic Engagement, Community Building, Social Responsibility, Ethical Leadership, Spiritual Leadership, God's Mission, Dominance Mandate, Ruling with God, Strategic Stewardship, Kingship, Priesthood, Visionary Leadership, Effective Governance, Responsible Leadership, Political Engagement, Social Impact, Community Impact, Economic Impact",
  author: "Pius Opoku-Fofie",
  year: new Date().getFullYear(),
  navItems: [
    {
      label: "Home",
      href: "/",
      number: "01",
    },
    {
      label: "About",
      href: "/about",
      number: "02",
    },
    {
      label: "COSTrAD",
      href: "/costrad",
      number: "03",
    },
    {
      label: "Institutes",
      href: "/institutes",
      number: "04",
    },
    {
      label: "Contact",
      href: "/contact",
      number: "05",
    },
    {
      label: "Donate",
      href: "/donate",
      number: "06",
    },
    {
      label: "Contact",
      href: "/contact",
      number: "07",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
      number: "01",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      number: "02",
    },
    {
      label: "Projects",
      href: "/projects",
      number: "03",
    },
    {
      label: "Team",
      href: "/team",
      number: "04",
    },
    {
      label: "Calendar",
      href: "/calendar",
      number: "05",
    },
    {
      label: "Settings",
      href: "/settings",
      number: "06",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
      number: "07",
    },
    {
      label: "Logout",
      href: "/logout",
      number: "08",
    },
  ],

  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    facebook: "https://www.facebook.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export const quickLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms",
  },
  {
    label: "Cookies",
    href: "/cookies",
  },
];
export const affiliateMenu = [
  {
    label: "COSTrAD",
    href: "https://www.costrad.org",
  },
  {
    label: "GAPNET",
    href: "https://www.gapnetwork.org",
  },
  {
    label: "Logos-Rhema Foundation",
    href: "https://www.logosrhema.org",
  },
];
export const menuItems = [
  { number: "01", label: "Welcome", href: "/" },
  { number: "02", label: "The Book", href: "/the-book" },
  { number: "03", label: "The Author", href: "/the-author" },
  {
    number: "04",
    label: "Strategic Voter 101",
    href: "/strategic-voter-101",
  },
  // { number: '05', label: 'Events & Webinars', href: '/events-and-webinar' },
  { number: "05", label: "contact", href: "/contact" },
];

export const shareSocial = {
  url: "https://www.costrad.org",
  title: "COSTrAD - By: Dr. Abu Bako",
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Running on the client
    return "";
  }
  // Running on the server
  return process.env.BASE_URL ?? "http://localhost:3000";
};

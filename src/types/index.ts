import { type JSX } from "react";
import { type LucideIcon, type LucideProps } from "lucide-react";

export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type PreviewImage = {
  title: string;
  href: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  classification: string;
  image: string;
  review: string;
};

export type FooterItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon: LucideIcon | ((props: LucideProps) => JSX.Element);
};

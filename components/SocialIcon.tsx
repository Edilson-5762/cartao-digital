// components/SocialIcon.tsx
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import type { SocialIconName } from "@/lib/site-data";

const icons: Record<SocialIconName, typeof FaWhatsapp> = {
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}

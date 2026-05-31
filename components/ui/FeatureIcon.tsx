import {
  FaSyringe,
  FaSnowflake,
  FaHandHoldingMedical,
  FaHandHoldingHeart,
  FaUserDoctor,
  FaMicroscope,
  FaEarthAsia,
  FaDna,
  FaComments,
  FaShieldHeart,
  FaSeedling,
  FaVenus,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { EmbryoIcon, MicroInjectionIcon, OvumIcon } from "./icons";

// Central icon registry. Generic medical icons come from Font Awesome
// (react-icons); fertility-specific marks with no library equivalent
// (the Alchemy IVF logo mark, ICSI) stay as custom SVGs.
//
// All icons inherit colour from `currentColor`, so a parent `text-*` class
// (or the className passed here) controls the colour, matching how the
// surrounding tiles were already styled.

type IconComponent = (p: { className?: string }) => React.ReactElement;

const registry: Record<string, IconComponent> = {
  // Service pillars
  consultation: (p) => <FaComments {...p} />,
  wellness: (p) => <FaSeedling {...p} />,
  gyno: (p) => <FaVenus {...p} />,
  facilitation: (p) => <FaHandHoldingMedical {...p} />,

  // Treatments (referenced elsewhere / future use)
  ivf: (p) => <EmbryoIcon {...p} />,
  iui: (p) => <FaSyringe {...p} />,
  icsi: (p) => <MicroInjectionIcon {...p} />,
  donor: (p) => <FaHandHoldingMedical {...p} />,
  preservation: (p) => <FaSnowflake {...p} />,

  // Why choose
  doctors: (p) => <FaUserDoctor {...p} />,
  labs: (p) => <FaMicroscope {...p} />,
  tourism: (p) => <FaEarthAsia {...p} />,
  care: (p) => <FaHandHoldingHeart {...p} />,

  // Trust highlights
  ovum: (p) => <OvumIcon {...p} />,
  counselling: (p) => <FaComments {...p} />,
  genetics: (p) => <FaDna {...p} />,
  aftercare: (p) => <FaShieldHeart {...p} />,
};

export type FeatureIconName = keyof typeof registry;

export interface FeatureIconProps {
  name: string;
  className?: string;
}

export function FeatureIcon({ name, className }: FeatureIconProps) {
  const Icon = registry[name] ?? registry.care;
  return <Icon className={className} />;
}

// Re-export so callers can check membership / list names if needed.
export const featureIconNames = Object.keys(registry);
export type { IconType };

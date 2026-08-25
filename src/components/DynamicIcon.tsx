import React from 'react';
import {
  Sparkles,
  Zap,
  Home,
  Building2,
  Leaf,
  Hammer,
  KeyRound,
  Flame,
  Sun,
  Archive,
  Waves,
  Wind,
  Shirt,
  Utensils,
  Dog,
  UtensilsCrossed,
  Bath,
  Bed,
  Sofa,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  Star,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Award,
  Users,
  ChevronRight,
  Heart,
  Droplets,
  BadgeCheck,
  Check
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Zap,
  Home,
  Building2,
  Leaf,
  Hammer,
  KeyRound,
  Flame,
  Refrigerator: Archive,
  Sun,
  Archive,
  Waves,
  Wind,
  Shirt,
  Utensils,
  Dog,
  UtensilsCrossed,
  Bath,
  Bed,
  Sofa,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  Star,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  Award,
  Users,
  ChevronRight,
  Heart,
  Droplets,
  BadgeCheck,
  Check
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const IconComponent = iconMap[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
};

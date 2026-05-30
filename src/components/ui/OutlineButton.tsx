import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutlineButtonProps {
  to: string;
  label: string;
  className?: string;
}

export const OutlineButton = ({ to, label, className }: OutlineButtonProps) => {
  return (
    <Link to={to} className={cn("btn-outline-travel text-sm self-start md:self-auto cursor-pointer", className)}>
      {label} <ArrowUpRight className="w-4 h-4" />
    </Link>
  );
};

export default OutlineButton;

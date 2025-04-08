import { InfoIcon } from "lucide-react";
import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InfoTipIconProps = {
  icon?: ReactNode;
  content: ReactNode;
};
function InfoTipIcon({ icon, content }: InfoTipIconProps) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-muted-foreground">
            {icon || <InfoIcon size={16} />}
          </TooltipTrigger>
          <TooltipContent>{content}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default InfoTipIcon;

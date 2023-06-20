import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Placement } from 'react-bootstrap/esm/types';

type CustomTooltipProps = {
  text: string;
  children: React.ReactNode;
  placement: Placement | undefined;
};

const CustomTooltip = ({ text, children, placement }: CustomTooltipProps) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{text}</Tooltip>}
    >
      <div>{children}</div>
    </OverlayTrigger>
  );
};

export default CustomTooltip;

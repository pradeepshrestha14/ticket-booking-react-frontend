import { UserOutlined, StarOutlined, CrownOutlined } from "@ant-design/icons";
import { TicketTier } from "@/types/api";
import React from "react";

// No conditionals in JSX
// Easy to extend tiers
export const ticketTierIconMap: Record<TicketTier, React.ReactNode> = {
  VIP: <CrownOutlined style={{ fontSize: 24 }} />,
  FRONT_ROW: <StarOutlined style={{ fontSize: 24 }} />,
  GA: <UserOutlined style={{ fontSize: 24 }} />,
};

import { CreditCardOutlined } from "@ant-design/icons";
import React from "react";

/**
 * TICKET ICON SYSTEM - BACKEND-DRIVEN DESIGN
 *
 * This module implements a dynamic, scalable approach to ticket tier icons and colors.
 * Unlike traditional hardcoded approaches, this system is completely unaware of specific
 * ticket tier types and can handle any number of tiers provided by the backend.
 *
 * WHY THIS APPROACH:
 * - We cannot hardcode the types of ticket tiers (like "VIP", "FRONT_ROW", "GA") because:
 *   1. The backend should have full control over tier definitions
 *   2. New tiers can be added/removed without frontend code changes
 *   3. Different events might have completely different tier structures
 *   4. Maintains scalability and flexibility for future requirements
 *
 * HOW IT WORKS:
 * - Each tier gets a consistent, visually appealing color based on its name
 * - Colors are generated using a hash function for consistency (same tier = same color)
 * - Uses a curated 8-color palette for professional appearance
 * - Frontend remains completely agnostic to tier names and quantities
 *
 * BENEFITS:
 * - Zero frontend changes needed when backend adds new tiers
 * - Automatic visual differentiation between tiers
 * - Professional, colorful interface
 * - Future-proof architecture
 */

/**
 * Generate a consistent color for a tier based on its name
 * @param tier - The tier name
 * @returns A hex color string
 */
const getTierColor = (tier: string): string => {
  // Simple hash function to generate consistent colors for the same tier
  let hash = 0;
  for (let i = 0; i < tier.length; i++) {
    hash = tier.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use a nice color palette
  const colors = [
    "#1890ff", // Blue
    "#52c41a", // Green
    "#faad14", // Gold
    "#f5222d", // Red
    "#722ed1", // Purple
    "#13c2c2", // Cyan
    "#eb2f96", // Pink
    "#fa8c16", // Orange
  ];

  return colors[Math.abs(hash) % colors.length];
};

/**
 * Get a colorful icon for any ticket tier
 * Each tier gets a consistent color based on its name
 * @param tier - The tier name to generate color for
 * @returns React node containing a colored ticket icon
 */
export const getTierIcon = (tier: string): React.ReactNode => {
  const color = getTierColor(tier);
  return <CreditCardOutlined style={{ fontSize: 24, color }} />;
};

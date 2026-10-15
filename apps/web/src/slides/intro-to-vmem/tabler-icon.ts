import type { ComponentType } from "react";
import { IconBolt } from "@tabler/icons-react";
import type { SidebarIconProps } from "@/components/sidebar-icons/BaseIcon";

/** A @tabler/icons-react component. */
export type TablerIcon = typeof IconBolt;

/** Tabler or custom sidebar icon — both accept size/stroke/className. */
export type SlideIcon = TablerIcon | ComponentType<SidebarIconProps>;

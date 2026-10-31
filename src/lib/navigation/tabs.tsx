import { cx } from "../styles/classes";
import { type ReactNode } from "react";
import {
Tabs as AriaTabs,
Tab,
TabList,
TabPanel,
type Key
} from "react-aria-components";

export interface TabSpec {
  id: Key;
  label: ReactNode;
  badge?: ReactNode;
  content: ReactNode;
}
export interface TabsProps {
  "aria-label": string;
  className?: string;
  tabs: TabSpec[];
  selectedKey?: Key;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
}
/** Switch between views of the same thing. Arrow keys move between tabs. */
export function Tabs({ tabs, "aria-label": label, className, ...props }: TabsProps) {
  return (
    <AriaTabs {...props} className={cx(className)}>
      <TabList aria-label={label} className={cx("plumb-tablist")}>
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id} className={cx("plumb-tab")}>
            {t.label}
            {t.badge}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => (
        <TabPanel key={t.id} id={t.id} className={cx("plumb-tabpanel")}>
          {t.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}

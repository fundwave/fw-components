import * as React from "react";

import * as RechartsPrimitive from "recharts";

import { cn } from "../utils/tailwind";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
  light: "",
  dark: ".dark"
} as const;
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | {
        color?: string;
        theme?: never;
      }
    | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
      }
  );
};
type ChartContextProps = {
  config: ChartConfig;
};
const ChartContext = React.createContext<ChartContextProps | null>(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return (
    <ChartContext.Provider
      value={{
        config
      }}
    >
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "fwr:flex fwr:aspect-video fwr:justify-center fwr:text-xs [&_.recharts-cartesian-axis-tick_text]:fwr:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:fwr:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:fwr:stroke-border [&_.recharts-dot[stroke='#fff']]:fwr:stroke-transparent [&_.recharts-layer]:fwr:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:fwr:stroke-border [&_.recharts-radial-bar-background-sector]:fwr:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fwr:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:fwr:stroke-border [&_.recharts-sector[stroke='#fff']]:fwr:stroke-transparent [&_.recharts-sector]:fwr:outline-hidden [&_.recharts-surface]:fwr:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);
  if (!colorConfig.length) {
    return null;
  }
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n")
      }}
    />
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    label?: string;
    labelFormatter?: (label: any, payload: any) => React.ReactNode;
    labelClassName?: string;
    formatter?: (value: any, name: any, props: any, index: number, payload: any) => React.ReactNode;
    color?: string;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }
>(
  (
    { active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey },
    ref
  ) => {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label as keyof typeof config]?.label || label : itemConfig?.label;
      if (labelFormatter) {
        return <div className={cn("fwr:font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }
      if (!value) {
        return null;
      }
      return <div className={cn("fwr:font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !payload?.length) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return (
      <div
        ref={ref}
        className={cn(
          "fwr:grid fwr:min-w-[8rem] fwr:items-start fwr:gap-1.5 fwr:rounded-lg fwr:border fwr:border-border/50 fwr:bg-background fwr:px-2.5 fwr:py-1.5 fwr:text-xs fwr:shadow-sm-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="fwr:grid fwr:gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return (
              <div
                key={item.dataKey}
                className={cn(
                  "fwr:flex fwr:w-full fwr:flex-wrap fwr:items-stretch fwr:gap-2 [&>svg]:fwr:h-2.5 [&>svg]:fwr:w-2.5 [&>svg]:fwr:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("fwr:shrink-0 fwr:rounded-[2px] fwr:border-[--color-border] fwr:bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed"
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div className={cn("fwr:flex fwr:flex-1 fwr:justify-between fwr:leading-none", nestLabel ? "items-end" : "items-center")}>
                      <div className="fwr:grid fwr:gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="fwr:text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && <span className="fwr:font-mono fwr:font-medium fwr:tabular-nums fwr:text-foreground">{item.value.toLocaleString()}</span>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegend = RechartsPrimitive.Legend;
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return (
    <div ref={ref} className={cn("fwr:flex fwr:items-center fwr:justify-center fwr:gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item: any) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div key={item.value} className={cn("fwr:flex fwr:items-center fwr:gap-1.5 [&>svg]:fwr:h-3 [&>svg]:fwr:w-3 [&>svg]:fwr:text-muted-foreground")}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="fwr:h-2 fwr:w-2 fwr:shrink-0 fwr:rounded-[2px]"
                style={{
                  backgroundColor: item.color
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;
  let configLabelKey: string = key;
  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === "string") {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }
  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}
export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

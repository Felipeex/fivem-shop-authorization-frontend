"use client";
import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tooltip from "@radix-ui/react-tooltip";

interface DiscordTokenProps {
  discordToken: string;
}

export function DiscordToken({ discordToken }: DiscordTokenProps) {
  console.log(discordToken);
  const [tooltipOpen, setTooltopOpen] = useState(false);
  const [inputToken] = useState(discordToken);
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent<HTMLInputElement>) {
    setTooltopOpen(true);
    setCopied(true);
    await navigator.clipboard.writeText(inputToken);
    setTimeout(() => {
      setTooltopOpen(false);
    }, 3000);
  }

  return (
    <Accordion.Root
      className="bg-[#36393F] w-full rounded-[5px] shadow-[0_2px_10px] shadow-black/5 mt-[26px] overflow-hidden"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <ul className="flex items-center gap-3">
            <span className="icon-[ic--baseline-discord] text-3xl text-[#5865F2]" />
            <span className="text-base font-semibold">Discord BOT</span>
          </ul>
        </AccordionTrigger>
        <AccordionContent>
          <span className="text-[17px] font-medium">Token</span>
          <Tooltip.Root open={tooltipOpen}>
            <Tooltip.Trigger asChild>
              <div
                onMouseEnter={() => setTooltopOpen(true)}
                onMouseLeave={() => {
                  copied
                    ? setTimeout(() => {
                        setTooltopOpen(false);
                      }, 2000)
                    : setTooltopOpen(false);
                }}
                className="w-full relative mt-[10px] rounded-[5px] overflow-hidden"
                onClick={handleCopy}
              >
                <div className="absolute w-[97%] h-6 mt-4 ml-1 mx-auto rounded-[5px] bg-[rgba(45, 52, 57, 0.03)] backdrop-blur-sm hover:backdrop-blur-none" />
                <input
                  value={inputToken}
                  className="w-full border border-[#5F71CB] flex-1 p-[15px] rounded-[5px] bg-transparent outline-none"
                  disabled
                />
                <span className="opacity-70">
                  Esse token não pode ser compartilhado, e não poderá ser
                  renovado ou revogado.
                </span>
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-[#444851] px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                sideOffset={5}
              >
                {copied ? "Copiado" : "Copiar"}

                <Tooltip.Arrow className="fill-[#444851]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}

const AccordionItem = forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  { children: React.ReactNode; className?: string; value: string }
>(function ({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Item
      className={classNames(
        "focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  );
});
AccordionItem.displayName = "AccordionTrigger";

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof Accordion.Trigger>,
  { children: React.ReactNode; className?: string }
>(function ({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "group flex px-[18px] py-[25px] flex-1 cursor-default items-center justify-between bg-[#36393F] text-[15px] leading-none outline-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <span className="icon-[ep--arrow-up-bold] text-xl bg-[#5F71CB] ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  React.ElementRef<typeof Accordion.Content>,
  { children: React.ReactNode; className?: string }
>(function AccordionContent({ children, className, ...props }, forwardedRef) {
  return (
    <Accordion.Content
      className={classNames(
        "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5 flex flex-col">{children}</div>
    </Accordion.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

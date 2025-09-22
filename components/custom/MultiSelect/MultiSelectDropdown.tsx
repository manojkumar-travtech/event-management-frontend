"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MultiSelectDropdownProps } from "./multiSelectTypes.types";

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (val: string) => {
    const option = options.find((o) => String(o.value) === val);
    if (!option) return;

    const actualValue = option.value;
    const newValue = value.includes(actualValue)
      ? value.filter((v) => v !== actualValue)
      : [...value, actualValue];
    onChange?.(newValue);
  };

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label)
    .join(", ");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-10 flex w-full min-w-0 items-center justify-between bg-white border border-[#D0D5DD] rounded px-4 py-2 text-[16px] font-normal text-[#344054] shadow-xs outline-none font-['Lato'] cursor-pointer transition-[color,box-shadow]",
            "focus-visible:border-primary-50 focus-visible:ring-primary-50 focus-visible:ring-[3px]",
            "aria-invalid:border-error-500 dark:aria-invalid:border-error-200 disabled:pointer-events-none disabled:opacity-50",
            className
          )}
        >
          <span
            className={cn(
              "truncate flex-1 text-left",
              selectedLabels ? "text-[#344054]" : "text-muted-foreground"
            )}
          >
            {selectedLabels || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#667085]" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 rounded border border-[#D0D5DD] bg-white shadow-xs"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-10 px-4 py-2 text-[16px] font-['Lato'] border-b border-[#D0D5DD]"
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <CommandItem
                  key={String(option.value)}
                  value={String(option.value)}
                  onSelect={toggleOption}
                  disabled={option.disabled}
                  className={cn(
                    "flex items-center justify-between cursor-pointer px-4 py-2 text-[16px] font-['Lato'] text-[#344054] rounded-md",
                    "hover:bg-gray-50 focus:bg-primary-50 focus:text-primary-700",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex flex-col gap-0.5 truncate">
                    <span className="truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="ml-2 h-4 w-4 shrink-0 text-[#344054]" />
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectDropdown;

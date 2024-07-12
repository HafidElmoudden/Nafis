"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, HelpCircleIcon } from "lucide-react";

interface DropdownItem {
    id: string | number;
    name: string;
}

interface DropdownProps extends PopoverProps {
    items: DropdownItem[];
    placeholder?: string;
    onSelect: (item: DropdownItem) => void;
    isSearchEnabled?: boolean;
    className?: string;
    tooltipMessage?: string;
    isError?: boolean;
}

export function Dropdown({
    items,
    placeholder = "...قم باختيار العنصر المناسب",
    onSelect,
    isSearchEnabled = false,
    className,
    tooltipMessage,
    isError,
    ...props
}: DropdownProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<DropdownItem>();

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item);
        setOpen(false);
        onSelect(item);
    };

    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label={placeholder}
                    aria-expanded={open}
                    className={cn("flex-1 flex-row-reverse justify-between w-full h-10 border border-accent-100 shadow-sm data-[state=open]:border-1 data-[state=open]:border-blue-600 data-[state=open]:shadow-custom-blue-shadow text-right", { ["border-[#FDA29B] shadow-custom-red-shadow"]: isError }, className)}
                >
                    <p className="text-[#667085]">{selectedItem ? selectedItem.name : placeholder}</p>
                    <div className="flex gap-2">
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                        {tooltipMessage && <Tooltip delayDuration={300}>
                            <TooltipTrigger>
                                <HelpCircleIcon color="#98A2B3" size={16} />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={10} className="bg-[#101828]">
                                <p>{tooltipMessage}</p>
                            </TooltipContent>
                        </Tooltip>}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    {isSearchEnabled && <CommandInput placeholder={`...البحث`} />}
                    <CommandList>
                        <CommandEmpty>.القائمة فارغة</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => handleSelect(item)}
                                >
                                    {item.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedItem?.id === item.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

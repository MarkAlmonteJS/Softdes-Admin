'use client'
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export function EditOrder({ status, onStatusChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (newStatus) => {
        onStatusChange(newStatus);
        setIsOpen(false);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Edit</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <DropdownMenu isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
                    <DropdownMenuTrigger>Status update</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div onClick={() => handleItemClick("Pending")}>
                            <Button>
                                <DropdownMenuLabel>Pending</DropdownMenuLabel>
                            </Button>
                        </div>
                        <DropdownMenuSeparator />
                        <div onClick={() => handleItemClick("Processing")}>
                            <Button>
                                <DropdownMenuLabel>Processing</DropdownMenuLabel>
                            </Button>
                        </div>
                        <DropdownMenuSeparator />
                        <div onClick={() => handleItemClick("Completed")}>
                            <Button>
                                <DropdownMenuLabel>Completed</DropdownMenuLabel>
                            </Button>
                        </div>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </PopoverContent>
        </Popover>
    );
}
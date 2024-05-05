'use client'
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function EditButton({ onEdit, initialInvoice }) {
  const [editableInvoice, setEditableInvoice] = useState(initialInvoice);

  const handleInputChange = (e, field) => {
    // Parse the input value as a float to keep it as a number
    const value = parseFloat(e.target.value);
    setEditableInvoice({
      ...editableInvoice,
      [field]: isNaN(value) ? editableInvoice[field] : value, // Check if the parsed value is NaN (Not a Number)
    });
  };

  const handleSubmit = () => {
    onEdit(editableInvoice);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Edit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Invoice</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={editableInvoice.name}
                onChange={(e) => handleInputChange(e, 'name')}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="method">Price</Label>
              <Input
                id="price"
                value={editableInvoice.price}
                onChange={(e) => handleInputChange(e, 'price')}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="amount">Stock</Label>
              <Input
                id="stock"
                value={editableInvoice.stock}
                onChange={(e) => handleInputChange(e, 'stock')}
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <div className="text-right">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

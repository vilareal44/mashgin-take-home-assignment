"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { MenuItem } from "@/src/lib/types";
import { useCartStore } from "@/src/lib/store/cart-store";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem, items, incrementQuantity, decrementQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(item);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-slate-200">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_HOST}/assets/${item.imageId}.jpg`}
          alt={item.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => decrementQuantity(item.id)}
            >
              -
            </Button>
            <Badge variant="secondary">{quantity}</Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={() => incrementQuantity(item.id)}
            >
              +
            </Button>
          </div>
        ) : (
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        )}
      </CardFooter>
    </Card>
  );
} 
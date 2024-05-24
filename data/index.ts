/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import {Product} from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

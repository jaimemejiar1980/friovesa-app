import { PRODUCT_TYPES } from "../../../constants/wordpress";

interface OrderProductRequest {
  id: number
  quantity: number
}

export class OrderProductRequestDto {
  product_id: number
  quantity: number

  constructor({ id, quantity }: OrderProductRequest) {
    this.product_id = id;
    this.quantity = quantity;
  }
}

export class OrderSimpleProductRequestDto extends OrderProductRequestDto {
  type: string

  constructor({ id, quantity }: OrderProductRequest) {
    super({ id, quantity })
    this.type = PRODUCT_TYPES.SIMPLE;
  }
}

export class OrderVariableProductRequestDto extends OrderProductRequestDto {
  type: string

  constructor({ id, quantity }: OrderProductRequest) {
    super({ id, quantity })
    this.type = PRODUCT_TYPES.VARIABLE;
  }
}

interface OrderBundleProductRequest extends OrderProductRequest {
  bundle: OrderProductRequest[]
}

export class OrderBundleProductRequestDto extends OrderProductRequestDto {
  type: string
  bundle: OrderProductRequest[]

  constructor({ id, quantity, bundle }: OrderBundleProductRequest) {
    super({ id, quantity })
    this.type = PRODUCT_TYPES.BUNDLE;
    this.bundle = bundle || [];
  }
}

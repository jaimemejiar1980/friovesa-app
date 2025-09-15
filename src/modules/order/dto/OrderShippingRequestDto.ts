interface Shipping {
  firstName?: string
  lastName?: string
  company?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  email?: string
  phone?: string
}

export class OrderShippingRequestDto {
  readonly first_name?: string
  readonly last_name?: string
  readonly company?: string
  readonly address_1?: string
  readonly address_2?: string
  readonly city?: string
  readonly state?: string
  readonly postcode?: string
  readonly country?: string
  readonly email?: string
  readonly phone?: string

  constructor({
    firstName,
    lastName,
    company,
    address1,
    address2,
    city,
    state,
    postcode,
    country,
    email,
    phone,
  }: Shipping) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.company = company;
    this.address_1 = address1;
    this.address_2 = address2;
    this.city = city;
    this.state = state;
    this.postcode = postcode;
    this.country = country;
    this.email = email;
    this.phone = phone;
  }
}


interface OrderShippingLineRequest {
  methodId: string
  methodTitle: string
  total: string
}

export class OrderShippingLineRequestDto {
  readonly method_id: string
  readonly method_title: string
  readonly total: string

  constructor({ methodId, methodTitle, total }: OrderShippingLineRequest) {
    this.method_id = methodId;
    this.method_title = methodTitle;
    this.total = total;
  }
}

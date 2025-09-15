interface Billing {
  firstName?: string
  lastName?: string
  company?: string
  address1?: string
  address2?: string
  city?: string
  postcode?: string
  country?: string
  state?: string
  email?: string
  phone?: string
}

export class OrderBillingRequestDto {
  readonly first_name?: string
  readonly last_name?: string
  readonly company?: string
  readonly address_1?: string
  readonly address_2?: string
  readonly city?: string
  readonly postcode?: string
  readonly country?: string
  readonly state?: string
  readonly email?: string
  readonly phone?: string

  constructor({
    firstName,
    lastName,
    company,
    address1,
    address2,
    city,
    postcode,
    country,
    state,
    email,
    phone,
  }: Billing) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.company = company;
    this.address_1 = address1;
    this.address_2 = address2;
    this.city = city;
    this.postcode = postcode;
    this.country = country;
    this.state = state;
    this.email = email;
    this.phone = phone;
  }
}

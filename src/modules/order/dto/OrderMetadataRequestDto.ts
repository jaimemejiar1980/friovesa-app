interface OrderMetadata {
  companyType: string;
  documentType: string;
  document: string;
  sector: string;
  shippingCompany?: string;
  shippingInvoice?: string;
  shippingEmail?: string;
}
/**
 * Data Transfer Object for Order Metadata requests.
 */
export class OrderMetadataRequestDto {
  readonly company_type: string;
  readonly document_type: string;
  readonly document: string;
  readonly sector: string;
  readonly shipping_company?: string;
  readonly shipping_invoice?: string;
  readonly shipping_email?: string;

  constructor(metadata: OrderMetadata) {
    this.company_type = metadata.companyType;
    this.document_type = metadata.documentType;
    this.document = metadata.document;
    this.sector = metadata.sector;
    this.shipping_company = metadata.shippingCompany;
    this.shipping_invoice = metadata.shippingInvoice;
    this.shipping_email = metadata.shippingEmail;
  }
}

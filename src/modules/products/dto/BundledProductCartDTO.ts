import { ProductDTO } from "./ProductDTO";

export class BundledProductCartDTO {
  public id: number;
  public name: string;
  public type: string;
  public description: string;
  public shortDescription: string;
  public sku: string;
  public price: string;
  public regularPrice: string;
  public formattedPrice: string;
  public salePrice: string;
  public stockQuantity: number;
  public categories: string[];
  public imageUrl: string;
  public variations: string;
  public priceHtml: string;
  public relatedIds: number[];
  public inStock: boolean;
  public catalogVisibility: string;
  public bundle: ProductDTO[];

  constructor(data: Partial<BundledProductCartDTO>) {
    this.id = data.id!;
    this.name = data.name!;
    this.type = data.type!;
    this.description = data.description!;
    this.shortDescription = data.shortDescription!;
    this.sku = data.sku!;
    this.price = data.price!;
    this.regularPrice = data.regularPrice!;
    this.formattedPrice = data.formattedPrice!;
    this.salePrice = data.salePrice!;
    this.stockQuantity = data.stockQuantity!;
    this.categories = data.categories || [];
    this.imageUrl = data.imageUrl!;
    this.variations = data.variations!;
    this.priceHtml = data.priceHtml!;
    this.relatedIds = data.relatedIds || [];
    this.inStock = data.inStock!;
    this.catalogVisibility = data.catalogVisibility!;
    this.bundle = data.bundle || [];
  }
}

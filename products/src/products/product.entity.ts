export interface Hierarchy {
  hierarchyName: string;
  hierarchyDescription: string;
}

export interface Product {
  skuCode: string;
  description: string;
  price: number;
  productType: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  unitMeasurement: string;
  hierarchies: Hierarchy[]
}

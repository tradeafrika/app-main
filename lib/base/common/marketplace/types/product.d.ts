
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  country: string
  image: File,
  sellerId: string
  sellerName: string
  inStock: boolean
  minOrderQuantity: number
  specifications: Record<string, string>
  tags: string[]
}
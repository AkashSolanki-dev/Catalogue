// Note: This file contains the API utility functions that retrieve the products and product details from the Fake Store API.
//The retrieveProducts function retrieves all products, while the retrieveProduct function retrieves a single product by its ID. The functions use the fetch API to make HTTP requests to the Fake Store API and return the response data as JSON. If an error occurs during the request, the functions return an error object with details about the error.
interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

interface ErrorResponse {
  error: string
  more: string
}

const ENDPOINT = 'https://fakestoreapi.com'

async function retrieveProducts(): Promise<Product[] | ErrorResponse[]> {
  try {
    const response = await fetch(`${ENDPOINT}/products`)
    if (!response.ok) {
      throw new Error(`Failed to retrieve products: ${response.statusText}`)
    }
    const jsonBody: Product[] = await response.json()
    return jsonBody
  } catch (error) {
    console.error('Error retrieving products:', error)
    return [
      {
        error: 'Unable to retrieve products',
        more: JSON.stringify(error),
      },
    ]
  }
}

async function retrieveProduct(
  id: number
): Promise<Product | { error: string; more: string }> {
  try {
    const response = await fetch(`${ENDPOINT}/products/${id}`)
    if (!response.ok) {
      throw new Error(
        `Failed to retrieve product id ${id}: ${response.statusText}`
      )
    }
    const jsonBody: Product = await response.json()
    return jsonBody
  } catch (error) {
    console.error('Error retrieving product:', error)
    return {
      error: `Unable to retrieve product id ${id}`,
      more: JSON.stringify(error),
    }
  }
}

export { retrieveProducts, retrieveProduct }
export type { Product, ErrorResponse }

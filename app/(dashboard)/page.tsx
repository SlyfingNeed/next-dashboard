// import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset)
  );

  // const [showForm, setShowForm] = useState(false);
  // const [formData, setFormData] = useState<{
  //   image: File | null;
  //   name: string;
  //   price: string;
  //   stock: string;
  // }>({
  //   name: '',
  //   price: '',
  //   stock: '',
  //   image: null
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // interface FormData {
  //   image: File | null;
  //   name: string;
  //   price: string;
  //   stock: string;
  //   imageUrl: string;
  // }

  interface SearchParams {
    q: string;
    offset: string;
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const defaultImageUrl = 'https://example.com/default-image.jpg';
  //   await addProductToDb({ ...formData, imageUrl: defaultImageUrl });
  //   setShowForm(false);
  //   // Optionally, refresh the product list or revalidate the path
  // };

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      {/* {showForm && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Price:</label>
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Stock:</label>
            <input type="text" name="stock" value={formData.stock} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Create Product</Button>
        </form>
      )} */}
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
// function uploadImage(image: File | null) {
//   if (!image) {
//     throw new Error('No image provided.');
//   }
//   // Implement the logic to upload the image and return the URL
//   return 'https://www.freepik.com/free-photo/luxury-3d-product-backdrop-rose-gold-with-orange-background_15670150.htm#fromView=search&page=1&position=16&uuid=8b8724a2-e996-4852-8b18-840007b0dbc7&new_detail=true'; // Replace with actual image URL
// }
// async function addProductToDb(product: { imageUrl: string; image: File | null; name: string; price: string; stock: string; }) {
//   // Using the default image URL directly
//   const imageUrl = product.imageUrl;

//   // Assuming you have a database function to add the product
//   const response = await fetch('/api/products', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: product.name,
//       price: product.price,
//       stock: product.stock,
//       imageUrl: imageUrl,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to add product to the database');
//   }

//   return await response.json();
// }



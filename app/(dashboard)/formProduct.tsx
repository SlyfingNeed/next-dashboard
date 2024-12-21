import React, { useState } from 'react';
import { addProductToDb } from '@/lib/db';
import { Button } from '@/components/ui/button';

const FormProduct = () => {
interface FormData {
    imageUrl: string;
    name: string;
    status: string;
    price: string;
    stock: number;
}

const [formData, setFormData] = useState<FormData>({
    imageUrl: '',
    name: '',
    status: 'active',
    price: '',
    stock: 0
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await addProductToDb({ ...formData, price: parseFloat(formData.price) });
    // Optionally, reset the form or show a success message
    setFormData({
        imageUrl: '',
        name: '',
        status: 'active',
        price: '',
        stock: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label>Nama:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleInputChange} required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label>Harga:</label>
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Total Penjualan:</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
      </div>
      <Button type="submit">Create Product</Button>
    </form>
  );
};

export default FormProduct;
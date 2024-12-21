import React, { useState } from 'react';
import { addProductToDb } from '@/lib/db';
import { Button } from '@/components/ui/button';

const FormProduct = () => {
interface FormData {
    imageUrl: string;
    nama: string;
    status: string;
    harga: string;
    totalPenjualan: number;
}

const [formData, setFormData] = useState<FormData>({
    imageUrl: '',
    nama: '',
    status: 'active',
    harga: '',
    totalPenjualan: 0
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await addProductToDb(formData);
    // Optionally, reset the form or show a success message
    setFormData({
        imageUrl: '',
        nama: '',
        status: 'active',
        harga: '',
        totalPenjualan: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label>Nama:</label>
        <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} required />
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
        <input type="text" name="harga" value={formData.harga} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Total Penjualan:</label>
        <input type="text" name="totalPenjualan" value={formData.totalPenjualan} onChange={handleInputChange} required />
      </div>
      <Button type="submit">Create Product</Button>
    </form>
  );
};

export default FormProduct;
'use client';

import React, { useEffect, useState } from 'react';
import { Users, Search, Mail, Calendar, MessageSquare, Star, Loader2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  createdAt: string;
  totalReviews: number;
  avgRating: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/customers');
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-sans text-brand-900">
            Danh Sách Khách Hàng ({customers.length})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Thông tin tài khoản khách hàng đã đăng nhập Google để đánh giá dịch vụ
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-brand-700 text-xs font-semibold border border-blue-100 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Bảo mật dữ liệu quản trị viên</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tên khách hàng hoặc email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
            <span className="text-xs">Đang tải danh sách khách hàng...</span>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4 whitespace-nowrap">Khách hàng</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Email</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Vai trò</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Ngày đăng ký</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Tổng đánh giá</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Điểm TB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {customer.image ? (
                          <img
                            src={customer.image}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                            {customer.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <span className="font-bold text-gray-900">{customer.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          customer.role === 'ADMIN'
                            ? 'bg-gold-50 text-gold-800 border border-gold-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {customer.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{new Date(customer.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md">
                        <MessageSquare className="w-3 h-3" />
                        <span>{customer.totalReviews}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-amber-500">
                      {customer.avgRating !== '-' ? (
                        <span className="inline-flex items-center gap-1">
                          {customer.avgRating} <Star className="w-3 h-3 fill-current" />
                        </span>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-gray-400 text-xs">
            Không tìm thấy khách hàng nào.
          </div>
        )}
      </div>
    </div>
  );
}


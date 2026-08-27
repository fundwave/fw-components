import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@fw-components/react/src/Table';

function TableShowcase() {
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Table Component</h1>
        <p className="text-lg text-gray-600">
          Display structured data in rows and columns.
        </p>
      </div>

      <ShowcaseSection title="Table Examples" description="Different table layouts">
        <VariantSection title="Basic Table">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </VariantSection>

        <VariantSection title="Striped Table">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default TableShowcase;

import React from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import { StatCard, StatCardGroup } from '@fw-components/react/src/StatCard';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

function StatCardShowcase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Stat Card Component</h1>
        <p className="text-lg text-gray-600">
          Display key metrics and statistics.
        </p>
      </div>

      <ShowcaseSection title="Stat Card Examples">
        <VariantSection title="Basic Stat Cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="bg-white rounded-xl shadow-sm-lg p-6 border-l-4 border-purple-600">
              <div className="text-sm text-gray-500 font-medium uppercase">Total Users</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">12,543</div>
              <div className="text-sm text-green-600 mt-2">↑ 12.5% from last month</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm-lg p-6 border-l-4 border-blue-600">
              <div className="text-sm text-gray-500 font-medium uppercase">Revenue</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">$45,231</div>
              <div className="text-sm text-green-600 mt-2">↑ 8.3% from last month</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm-lg p-6 border-l-4 border-green-600">
              <div className="text-sm text-gray-500 font-medium uppercase">Conversions</div>
              <div className="text-3xl font-bold text-gray-900 mt-2">89.4%</div>
              <div className="text-sm text-red-600 mt-2">↓ 2.1% from last month</div>
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Stat Cards with Icons">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-sm-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm opacity-90 font-medium">New Orders</div>
                  <div className="text-4xl font-bold mt-2">324</div>
                  <div className="text-sm opacity-75 mt-2">Last 24 hours</div>
                </div>
                <div className="text-5xl opacity-50">📦</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-sm-lg p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm opacity-90 font-medium">Active Users</div>
                  <div className="text-4xl font-bold mt-2">1,429</div>
                  <div className="text-sm opacity-75 mt-2">Currently online</div>
                </div>
                <div className="text-5xl opacity-50">👥</div>
              </div>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default StatCardShowcase;

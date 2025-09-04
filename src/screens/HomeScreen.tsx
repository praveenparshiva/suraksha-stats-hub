import React, { useState } from 'react';
import { Search, Users, IndianRupee, TrendingUp, Calendar } from 'lucide-react';
import { useService } from '@/contexts/ServiceContext';
import { CustomerCard } from '@/components/service/CustomerCard';
import { StatCard } from '@/components/service/StatCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HomeScreen() {
  const { customers, getCurrentMonthStats, searchCustomers, deleteCustomer } = useService();
  const [searchQuery, setSearchQuery] = useState('');
  
  const stats = getCurrentMonthStats();
  const displayCustomers = searchQuery ? searchCustomers(searchQuery) : customers.slice(0, 5);
  
  const currentMonth = new Date().toLocaleDateString('en-IN', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-header-text p-6 -mx-4 -mt-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Suraksha Service</h1>
          <p className="text-header-subtitle">Tank & Sump Cleaning Services</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            {currentMonth} Overview
          </h2>
          <Badge variant="outline" className="text-xs">
            Live Data
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Income"
            value={`₹${stats.totalIncome.toLocaleString('en-IN')}`}
            icon={IndianRupee}
            className="bg-gradient-to-br from-green-50 to-green-100"
          />
          
          <StatCard
            title="Customers Served"
            value={stats.customersServed}
            subtitle="This month"
            icon={Users}
            className="bg-gradient-to-br from-blue-50 to-blue-100"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card p-3 rounded-lg border border-card-border text-center">
            <div className="text-lg font-bold text-service-sump">{stats.serviceBreakdown.sump}</div>
            <div className="text-xs text-muted-foreground">Sump Only</div>
          </div>
          
          <div className="bg-card p-3 rounded-lg border border-card-border text-center">
            <div className="text-lg font-bold text-service-tank">{stats.serviceBreakdown.tank}</div>
            <div className="text-xs text-muted-foreground">Tank Only</div>
          </div>
          
          <div className="bg-card p-3 rounded-lg border border-card-border text-center">
            <div className="text-lg font-bold text-service-both">{stats.serviceBreakdown.both}</div>
            <div className="text-xs text-muted-foreground">Both Services</div>
          </div>
        </div>
      </div>

      {/* Recent Services */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            Recent Services
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary hover:text-primary-dark"
          >
            View All
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers, phone, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Customer List */}
        <div className="space-y-3">
          {displayCustomers.length > 0 ? (
            displayCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onDelete={deleteCustomer}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'No customers found' : 'No services recorded yet'}
            </div>
          )}
        </div>
        
        {!searchQuery && customers.length > 5 && (
          <div className="text-center pt-2">
            <Button variant="outline" size="sm">
              Load More ({customers.length - 5} more)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
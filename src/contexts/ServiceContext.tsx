import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerRecord, MonthlyStats } from '@/types/service';
import { toast } from '@/hooks/use-toast';

interface ServiceContextType {
  customers: CustomerRecord[];
  addCustomer: (customer: Omit<CustomerRecord, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<CustomerRecord>) => void;
  deleteCustomer: (id: string) => void;
  getCurrentMonthStats: () => MonthlyStats;
  getMonthlyHistory: () => MonthlyStats[];
  searchCustomers: (query: string) => CustomerRecord[];
  loading: boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const STORAGE_KEY = 'suraksha_service_data';

// Generate dummy data for demo purposes
const generateDummyData = (): CustomerRecord[] => {
  const dummyCustomers: CustomerRecord[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      address: '123 MG Road, Bangalore',
      serviceDate: '2024-01-15',
      serviceType: 'sump',
      price: 2500,
      notes: 'Regular customer, monthly service',
      createdAt: '2024-01-15T10:00:00.000Z'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 9876543211',
      address: '456 Brigade Road, Bangalore',
      serviceDate: '2024-01-20',
      serviceType: 'tank',
      price: 3500,
      notes: 'New installation cleaning',
      createdAt: '2024-01-20T14:30:00.000Z'
    },
    {
      id: '3',
      name: 'Suresh Reddy',
      phone: '+91 9876543212',
      address: '789 Koramangala, Bangalore',
      serviceDate: '2024-01-25',
      serviceType: 'both',
      price: 5000,
      notes: 'Complete cleaning service',
      createdAt: '2024-01-25T09:15:00.000Z'
    },
    {
      id: '4',
      name: 'Anita Patel',
      phone: '+91 9876543213',
      address: '321 Indiranagar, Bangalore',
      serviceDate: '2024-01-10',
      serviceType: 'sump',
      price: 2500,
      createdAt: '2024-01-10T16:45:00.000Z'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      phone: '+91 9876543214',
      address: '654 Whitefield, Bangalore',
      serviceDate: '2024-01-05',
      serviceType: 'tank',
      price: 3000,
      notes: 'Emergency service call',
      createdAt: '2024-01-05T11:20:00.000Z'
    }
  ];
  return dummyCustomers;
};

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setCustomers(parsedData);
      } else {
        // Initialize with dummy data
        const dummyData = generateDummyData();
        setCustomers(dummyData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to dummy data
      const dummyData = generateDummyData();
      setCustomers(dummyData);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save data to localStorage whenever customers change
  useEffect(() => {
    if (!loading && customers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    }
  }, [customers, loading]);

  const addCustomer = (customerData: Omit<CustomerRecord, 'id' | 'createdAt'>) => {
    const newCustomer: CustomerRecord = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setCustomers(prev => [newCustomer, ...prev]);
    toast({
      title: "Customer Added",
      description: `Service record for ${customerData.name} has been saved.`,
    });
  };

  const updateCustomer = (id: string, updates: Partial<CustomerRecord>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
    toast({
      title: "Record Updated",
      description: "Customer record has been updated successfully.",
    });
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    toast({
      title: "Record Deleted",
      description: "Customer record has been deleted.",
    });
  };

  const getCurrentMonthStats = (): MonthlyStats => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    const monthCustomers = customers.filter(customer => 
      customer.serviceDate.startsWith(currentMonth)
    );

    const totalIncome = monthCustomers.reduce((sum, customer) => sum + customer.price, 0);
    const customersServed = monthCustomers.length;
    
    const serviceBreakdown = monthCustomers.reduce((breakdown, customer) => {
      breakdown[customer.serviceType]++;
      return breakdown;
    }, { sump: 0, tank: 0, both: 0 });

    return {
      totalIncome,
      customersServed,
      serviceBreakdown,
      month: currentMonth,
    };
  };

  const getMonthlyHistory = (): MonthlyStats[] => {
    const monthlyData = new Map<string, MonthlyStats>();
    
    customers.forEach(customer => {
      const month = customer.serviceDate.substring(0, 7); // YYYY-MM
      
      if (!monthlyData.has(month)) {
        monthlyData.set(month, {
          totalIncome: 0,
          customersServed: 0,
          serviceBreakdown: { sump: 0, tank: 0, both: 0 },
          month,
        });
      }
      
      const stats = monthlyData.get(month)!;
      stats.totalIncome += customer.price;
      stats.customersServed++;
      stats.serviceBreakdown[customer.serviceType]++;
    });

    return Array.from(monthlyData.values()).sort((a, b) => b.month.localeCompare(a.month));
  };

  const searchCustomers = (query: string): CustomerRecord[] => {
    if (!query.trim()) return customers;
    
    const lowercaseQuery = query.toLowerCase();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.phone.includes(query) ||
      customer.address.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <ServiceContext.Provider
      value={{
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        getCurrentMonthStats,
        getMonthlyHistory,
        searchCustomers,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
}
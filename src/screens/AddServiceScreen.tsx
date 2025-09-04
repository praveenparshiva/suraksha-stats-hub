import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Phone, MapPin, IndianRupee, FileText, Save } from 'lucide-react';
import { useService } from '@/contexts/ServiceContext';
import { ServiceFormData } from '@/types/service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AddServiceScreen() {
  const { addCustomer } = useService();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ServiceFormData>({
    defaultValues: {
      serviceDate: new Date().toISOString().split('T')[0], // Today's date
      serviceType: 'sump',
    }
  });

  const serviceType = watch('serviceType');

  const onSubmit = async (data: ServiceFormData) => {
    try {
      addCustomer({
        name: data.name.trim(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        serviceDate: data.serviceDate,
        serviceType: data.serviceType,
        price: parseFloat(data.price),
        notes: data.notes?.trim() || undefined,
      });
      
      // Reset form after successful submission
      reset({
        serviceDate: new Date().toISOString().split('T')[0],
        serviceType: 'sump',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const serviceTypeOptions = [
    { value: 'sump', label: 'Sump Cleaning', price: '2,500' },
    { value: 'tank', label: 'Tank Cleaning', price: '3,500' },
    { value: 'both', label: 'Both Services', price: '5,000' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 -mx-4 -mt-4 mb-6">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Add New Service</h1>
          <p className="text-blue-100">Record a new customer service</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information */}
        <Card className="p-4">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            Customer Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter customer's full name"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[\+]?[\d\s\-\(\)]{10,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address"
                rows={3}
                {...register('address', {
                  required: 'Address is required',
                  minLength: { value: 10, message: 'Please enter a complete address' }
                })}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-xs text-destructive mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-4">
          <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Service Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="serviceDate">Service Date *</Label>
              <Input
                id="serviceDate"
                type="date"
                {...register('serviceDate', { required: 'Service date is required' })}
                className={errors.serviceDate ? 'border-destructive' : ''}
              />
              {errors.serviceDate && (
                <p className="text-xs text-destructive mt-1">{errors.serviceDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select
                value={serviceType}
                onValueChange={(value) => setValue('serviceType', value as any)}
              >
                <SelectTrigger className={errors.serviceType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex justify-between items-center w-full">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          (~₹{option.price})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price Charged (₹) *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`pl-10 ${errors.price ? 'border-destructive' : ''}`}
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Price must be greater than 0' },
                    max: { value: 99999, message: 'Price seems too high' }
                  })}
                />
              </div>
              {errors.price && (
                <p className="text-xs text-destructive mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes or observations..."
                rows={3}
                {...register('notes')}
              />
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary-light/5">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Service Record
              </div>
            )}
          </Button>
        </Card>
      </form>
    </div>
  );
}
import React from 'react';
import { Phone, MapPin, Calendar, IndianRupee, Trash2, Edit } from 'lucide-react';
import { CustomerRecord } from '@/types/service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CustomerCardProps {
  customer: CustomerRecord;
  onEdit?: (customer: CustomerRecord) => void;
  onDelete?: (id: string) => void;
}

const serviceTypeConfig = {
  sump: { label: 'Sump Cleaning', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  tank: { label: 'Tank Cleaning', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  both: { label: 'Both Services', color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

export function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
  const serviceConfig = serviceTypeConfig[customer.serviceType];
  const serviceDate = new Date(customer.serviceDate).toLocaleDateString('en-IN');

  return (
    <Card className="p-4 bg-card border border-card-border hover:shadow-md transition-all duration-200">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground text-base">{customer.name}</h3>
            <Badge 
              variant="outline" 
              className={`mt-1 text-xs ${serviceConfig.color}`}
            >
              {serviceConfig.label}
            </Badge>
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(customer)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(customer.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{customer.phone}</span>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{customer.address}</span>
          </div>
        </div>

        {/* Service Details */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{serviceDate}</span>
          </div>
          
          <div className="flex items-center gap-1 text-base font-semibold text-primary">
            <IndianRupee className="h-4 w-4" />
            <span>{customer.price.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              "{customer.notes}"
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
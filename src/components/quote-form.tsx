'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../hooks/use-toast';
import { getFabrics } from '../lib/data-client';
import type { Fabric } from '../lib/types';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  fabric: z.string().min(1, { message: 'Please select a fabric.' }),
  quantity: z.coerce.number().min(100, { message: 'Minimum quantity for wholesale is 100 meters.' }),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof formSchema>;

export function QuoteForm() {
  const { toast } = useToast();
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSPREE_URL = 'https://formspree.io/f/xrbajzny';

  useEffect(() => {
    async function loadFabrics() {
      const fabricsData = await getFabrics();
      setFabrics(fabricsData);
    }
    loadFabrics();
  }, []);
  
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      fabric: '',
      quantity: 100,
      message: '',
    },
  });

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Thank you for your request! We will get back to you shortly.',
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Request a Wholesale Quote</CardTitle>
        <CardDescription>
          Fill out the form below for bulk orders and custom solutions. We'll get back to you shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Company Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fabric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabric of Interest</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fabric" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fabrics.map((fabric) => (
                          <SelectItem key={fabric.id} value={fabric.name}>
                            {fabric.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (meters)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project, custom requirements, etc."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Request a Quote'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import { z } from 'zod';

export const BookingFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự'),

  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,10}$/,
      'Số điện thoại không hợp lệ'
    ),

  email: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),

  language: z.enum(['vi', 'en', 'fr', 'zh', 'ko', 'ja'], {
    required_error: 'Vui lòng chọn ngôn ngữ',
  }),

  pickupPoint: z
    .string()
    .min(2, 'Điểm đón phải có ít nhất 2 ký tự'),

  destination: z
    .string()
    .min(2, 'Điểm đến phải có ít nhất 2 ký tự'),

  date: z
    .string()
    .min(1, 'Vui lòng chọn ngày đón'),

  time: z
    .string()
    .min(1, 'Vui lòng chọn giờ đón'),

  passengers: z
    .number({
      required_error: 'Vui lòng nhập số hành khách',
      invalid_type_error: 'Số hành khách phải là số',
    })
    .int('Số hành khách phải là số nguyên')
    .min(1, 'Ít nhất 1 hành khách')
    .max(7, 'Tối đa 7 hành khách'),

  route: z.string().optional(),

  notes: z
    .string()
    .max(500, 'Ghi chú tối đa 500 ký tự')
    .optional(),
});

export type BookingFormValues = z.infer<typeof BookingFormSchema>;

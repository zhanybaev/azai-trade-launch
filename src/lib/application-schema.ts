import { z } from 'zod';

const shortText = (max: number) => z.string().trim().max(max);
const optionalInteger = (min: number, max: number) => z.preprocess(
  (value) => value === '' || value === undefined || value === null ? null : Number(value),
  z.number().int().min(min).max(max).nullable(),
);

export const applicationSchema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your full name.').max(100),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(30).regex(/^[+\d\s().-]+$/, 'Please enter a valid phone number.').refine(value => value.replace(/\D/g, '').length >= 7, 'Please enter a valid phone number.'),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  company_name: shortText(150),
  mc_number: shortText(12).regex(/^\d*$/, 'Use digits only for your MC number.'),
  dot_number: shortText(12).regex(/^\d*$/, 'Use digits only for your DOT number.'),
  truck_type: z.enum(['Dry van', 'Reefer', 'Flatbed', 'Step deck', 'Power only', 'Box truck', 'Other'], { errorMap: () => ({ message: 'Please select your truck type.' }) }),
  number_of_trucks: z.coerce.number().int().min(1, 'Enter at least one truck.').max(10000),
  truck_year: optionalInteger(1950, 2030),
  current_location: z.string().trim().min(2, 'Please enter your current location.').max(150),
  preferred_lanes: shortText(500),
  freight_type: shortText(150),
  years_experience: optionalInteger(0, 80),
  comments: shortText(2000),
  contact_consent: z.boolean().refine(value => value, 'Please agree to be contacted before submitting.'),
  website: z.string().max(0),
});
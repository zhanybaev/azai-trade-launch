import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { applicationSchema } from '@/lib/application-schema';
import { submitApplication } from '@/lib/applications.functions';

type Props = { open: boolean; onOpenChange: (open: boolean) => void };
type Field = { name: string; label: string; type?: string; required?: boolean; placeholder?: string; max?: number; min?: number; autoComplete?: string };
const personal: Field[] = [
  { name: 'full_name', label: 'Full Name', required: true, autoComplete: 'name', max: 100 },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, autoComplete: 'tel', max: 30 },
  { name: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email', max: 255 },
];
const company: Field[] = [
  { name: 'company_name', label: 'Company Name', autoComplete: 'organization', max: 150 },
  { name: 'mc_number', label: 'MC Number', placeholder: 'e.g. 123456', max: 12 },
  { name: 'dot_number', label: 'DOT Number', placeholder: 'e.g. 1234567', max: 12 },
];

export function ApplicationModal({ open, onOpenChange }: Props) {
  const [pending, setPending] = useState(false);
  const [received, setReceived] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const sendApplication = useServerFn(submitApplication);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = applicationSchema.safeParse({ ...values, contact_consent: values.contact_consent === 'on' });
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => { nextErrors[String(issue.path[0])] = issue.message; });
      setErrors(nextErrors);
      const field = form.elements.namedItem(String(result.error.issues[0]?.path[0]));
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setErrors({}); setError(''); setPending(true);
    try {
      const response = await sendApplication({ data: result.data });
      if (response.success) setReceived(true);
      else setError(response.message);
    } catch {
      setError('Your application could not be sent. Please try again or call 347-988-6771.');
    } finally { setPending(false); }
  }

  function renderField(field: Field) {
    return <div key={field.name} className="space-y-2">
      <label className="form-label" htmlFor={field.name}>{field.label}{field.required && <span className="text-primary"> *</span>}</label>
      <Input id={field.name} name={field.name} type={field.type ?? 'text'} required={field.required} placeholder={field.placeholder} autoComplete={field.autoComplete} maxLength={field.type === 'number' ? undefined : field.max ?? 150} min={field.min} max={field.type === 'number' ? field.max : undefined} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} className="h-11 bg-background shadow-none" />
      {errors[field.name] && <p id={`${field.name}-error`} className="text-xs text-destructive">{errors[field.name]}</p>}
    </div>;
  }

  return <Dialog open={open} onOpenChange={(next) => { if (!pending) { onOpenChange(next); if (!next) { setReceived(false); setError(''); setErrors({}); } } }}>
    <DialogContent className="application-dialog max-w-3xl max-h-[90dvh] overflow-y-auto p-0">
      {received ? <div className="px-7 py-16 text-center sm:px-12">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="size-8" /></div>
        <DialogTitle className="font-display text-3xl">Application Received!</DialogTitle>
        <DialogDescription className="mx-auto mt-5 max-w-md text-base leading-7">Thank you for contacting AZAI Trade. Our team will review your information and contact you shortly.</DialogDescription>
        <Button onClick={() => onOpenChange(false)} className="mt-8 h-11 px-8">Back to AZAI Trade <ArrowRight /></Button>
      </div> : <>
        <DialogHeader className="border-b bg-secondary px-6 pb-6 pt-8 sm:px-8">
          <span className="eyebrow mb-2 text-primary">LET’S GET MOVING</span>
          <DialogTitle className="font-display text-3xl leading-tight">Get Started With AZAI Trade</DialogTitle>
          <DialogDescription className="pt-2">Complete the form below and our team will contact you shortly.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} noValidate className="space-y-7 px-6 pb-8 sm:px-8">
          <fieldset disabled={pending} className="space-y-7">
            <section><h3 className="form-section-title">01 <span>Personal Information</span></h3><div className="grid gap-4 sm:grid-cols-3">{personal.map(renderField)}</div></section>
            <section><h3 className="form-section-title">02 <span>Company Information</span></h3><div className="grid gap-4 sm:grid-cols-3">{company.map(renderField)}</div></section>
            <section><h3 className="form-section-title">03 <span>Truck Information</span></h3><div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><label htmlFor="truck_type" className="form-label">Truck Type <span className="text-primary">*</span></label><select id="truck_type" name="truck_type" required defaultValue="" className="form-select" aria-invalid={Boolean(errors.truck_type)}><option value="" disabled>Select truck type</option>{['Dry van','Reefer','Flatbed','Step deck','Power only','Box truck','Other'].map(value => <option key={value}>{value}</option>)}</select>{errors.truck_type && <p className="text-xs text-destructive">{errors.truck_type}</p>}</div>
              {renderField({ name: 'number_of_trucks', label: 'Number of Trucks', type: 'number', required: true, min: 1, max: 10000 })}
              {renderField({ name: 'truck_year', label: 'Year of Truck', type: 'number', min: 1950, max: 2030 })}
              {renderField({ name: 'current_location', label: 'Current Location', placeholder: 'City, State', required: true })}
            </div></section>
            <section><h3 className="form-section-title">04 <span>Business Information</span></h3><div className="grid gap-4 sm:grid-cols-2">
              {renderField({ name: 'preferred_lanes', label: 'Preferred Lanes / States', placeholder: 'e.g. Northeast, TX to FL', max: 500 })}
              {renderField({ name: 'freight_type', label: 'Type of Freight', placeholder: 'e.g. General freight' })}
              {renderField({ name: 'years_experience', label: 'Years of Trucking Experience', type: 'number', min: 0, max: 80 })}
            </div></section>
            <section><h3 className="form-section-title">05 <span>Additional Information</span></h3><label htmlFor="comments" className="form-label">Additional Comments / Questions</label><Textarea name="comments" id="comments" maxLength={2000} className="mt-2 min-h-24 shadow-none" /></section>
            <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input name="website" id="website" tabIndex={-1} autoComplete="off" /></div>
            <div><label className="flex cursor-pointer items-start gap-3 text-sm leading-6"><input name="contact_consent" type="checkbox" required className="mt-1 size-4 shrink-0 accent-primary" /><span>I agree to be contacted by AZAI Trade regarding trucking and dispatching services.</span></label>{errors.contact_consent && <p className="mt-2 text-sm text-destructive">{errors.contact_consent}</p>}</div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="h-12 w-full" disabled={pending}>{pending ? <><LoaderCircle className="animate-spin" /> Sending Application…</> : <>SUBMIT APPLICATION <ArrowRight /></>}</Button>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4" /> Your information is kept private.</p>
          </fieldset>
        </form>
      </>}
    </DialogContent>
  </Dialog>;
}
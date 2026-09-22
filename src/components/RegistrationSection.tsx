import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { CAMPUSES } from '../data/campaign';

interface FormState {
  name: string;
  phone: string;
  campusId: string;
}

const INITIAL_STATE: FormState = { name: '', phone: '', campusId: '' };
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

type Status = 'idle' | 'submitting' | 'submitted' | 'error';

export const RegistrationSection: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const selectedCampus = CAMPUSES.find((c) => c.id === form.campusId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.campusId) {
      setError('Please fill in your name, phone number, and campus.');
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setError('Registration isn’t connected to an inbox yet — set VITE_WEB3FORMS_ACCESS_KEY in .env.');
      return;
    }

    setError(null);
    setStatus('submitting');

    try {
      const body = new FormData();
      body.append('access_key', WEB3FORMS_ACCESS_KEY);
      body.append('subject', `Hub Week registration — ${selectedCampus?.name ?? 'Unknown campus'}`);
      body.append('from_name', 'The Financial Blueprint — Hub Week Registration');
      body.append('name', form.name);
      body.append('phone', form.phone);
      body.append('campus', selectedCampus?.name ?? form.campusId);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('submitted');
      } else {
        setError(data.message || 'Something went wrong sending your registration. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Could not reach the registration service. Check your connection and try again.');
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-[#221F1A]/20 bg-transparent px-4 py-3 text-sm text-[#221F1A] placeholder:text-[#A39C8B] focus:outline-none focus:border-[#BE5A29] transition-colors disabled:opacity-60';

  return (
    <section id="register" className="w-full py-16 sm:py-24 border-t border-[#E4DAC4]">
      <div className="max-w-lg mx-auto px-5 sm:px-8">
        <SectionHeading index="06" eyebrow="Scan & register" title="Join Hub Week" />

        <p className="text-base text-[#4A453B] leading-relaxed">
          Register your interest in opening an account and we'll text you the moment Hub Week opens on your campus.
        </p>

        {status === 'submitted' ? (
          <div className="mt-10 flex flex-col items-start gap-3">
            <span className="w-10 h-10 rounded-full bg-[#221F1A] flex items-center justify-center">
              <Check className="w-5 h-5 text-[#FBF8F2]" />
            </span>
            <div className="text-lg font-display font-semibold text-[#221F1A]">You're on the list</div>
            <p className="text-sm text-[#6B6558] max-w-sm leading-relaxed">
              We'll text {form.name.split(' ')[0]} the moment Hub Week opens at{' '}
              {selectedCampus ? selectedCampus.name : 'your campus'}. Watch for the countdown messages.
            </p>
            <button
              onClick={() => {
                setForm(INITIAL_STATE);
                setStatus('idle');
              }}
              className="mt-1 text-xs font-mono uppercase tracking-wider text-[#BE5A29] hover:underline"
            >
              Register another student
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Ama Owusu"
                disabled={status === 'submitting'}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-1.5">
                Phone number (for your SMS notice)
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. 024 000 0000"
                disabled={status === 'submitting'}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="campus" className="block text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-1.5">
                Campus
              </label>
              <select
                id="campus"
                value={form.campusId}
                onChange={(e) => setForm((prev) => ({ ...prev, campusId: e.target.value }))}
                disabled={status === 'submitting'}
                className={inputClasses}
              >
                <option value="" disabled>
                  Select your campus
                </option>
                {CAMPUSES.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-xs text-[#BE5A29]">{error}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#221F1A] hover:bg-[#3a352c] disabled:opacity-60 text-[#FBF8F2] text-sm font-medium transition-colors"
            >
              {status === 'submitting' ? 'Sending…' : 'Join the list'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

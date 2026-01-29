'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

export default function RequestInfoModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setResult(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const canSubmit = useMemo(() => {
    if (!form.fullName.trim()) return false;
    if (!form.email.trim()) return false;
    if (!form.phone.trim()) return false;
    if (!form.consent) return false;
    return true;
  }, [form]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/rcs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          consent: form.consent,
          source: 'request_info_modal',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setResult({ ok: false, message: data?.error || 'Failed to send. Please try again.' });
        return;
      }

      setResult({ ok: true, message: data?.message || 'Sent successfully.' });
      setForm(initialState);
    } catch {
      setResult({ ok: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          aria-label="Close"
        >
          ×
        </button>

        <div className="px-8 pt-8 pb-6">
          <h3 className="text-center text-3xl font-bold text-indigo-600">Request Information</h3>

          <div className="mt-6 border border-gray-300 rounded-3xl p-6">
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800">Full Name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
                  placeholder="Enter Your Name"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  placeholder="Enter Your Email"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                  placeholder="Enter Your Number"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  placeholder="Enter Message"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
                  className="mt-1"
                />
                <span>
                  By submitting this form, you consent to receive marketing communications from us via SMS/RCS/Email/Calls. You must consent to receive marketing communications
                </span>
              </label>

              {result && (
                <div className={result.ok ? 'text-green-700 text-sm' : 'text-red-700 text-sm'}>
                  {result.message}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:hover:bg-indigo-600 text-white font-semibold py-2"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

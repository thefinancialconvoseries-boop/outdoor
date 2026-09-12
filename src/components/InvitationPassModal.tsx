import React, { useState } from 'react';
import { FinancialConvoLogo } from './FinancialConvoLogo';
import { X, Calendar, MapPin, Users, ShieldCheck, Check, Sparkles, Award } from 'lucide-react';

interface InvitationPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationPassModal: React.FC<InvitationPassModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const inviteCode = 'FC-CC26-0926';

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#0A2540] via-[#07172C] to-[#030A14] border border-[#0066FF]/40 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-white">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-[0.25em] uppercase mb-5">
          <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
          VIP Curated Pass • Strictly by Invitation
        </div>

        {/* Logo & Brand Title */}
        <div className="text-center py-2 pb-6 border-b border-white/10">
          <FinancialConvoLogo size="lg" variant="full" showTagline={true} />
        </div>

        {/* Invitation Message */}
        <div className="mt-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#60A5FA] font-mono">
            The Financial Convo Series
          </p>
          <h3 className="text-xl sm:text-2xl font-cinematic font-semibold text-white tracking-wider mt-1">
            Personal Invitation
          </h3>
          <p className="text-sm text-slate-300 font-light mt-2 max-w-md mx-auto leading-relaxed">
            You have been selected to join an intimate circle of 10–15 guests in Cape Coast for a transformative outdoor financial experience.
          </p>
        </div>

        {/* Key Event Details Grid */}
        <div className="grid grid-cols-2 gap-3 mt-6 p-4 rounded-2xl bg-black/40 border border-white/10">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#38BDF8] mt-0.5" />
            <div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono">Date</div>
              <div className="text-sm font-semibold text-white">26 September 2026</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#38BDF8] mt-0.5" />
            <div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono">Location</div>
              <div className="text-sm font-semibold text-white">Cape Coast, Ghana</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-4 h-4 text-[#38BDF8] mt-0.5" />
            <div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono">Cohort Size</div>
              <div className="text-sm font-semibold text-white">10–15 Guests</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 text-[#38BDF8] mt-0.5" />
            <div>
              <div className="text-[10px] text-slate-300 uppercase tracking-widest font-mono">Access</div>
              <div className="text-sm font-semibold text-[#38BDF8]">Strictly by Invitation</div>
            </div>
          </div>
        </div>

        {/* The 3 Core Pillars */}
        <div className="mt-5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            The 3 Pillars of Discussion:
          </div>
          <div className="flex flex-wrap gap-2">
            {['Money Mindset', 'Building an Emergency Fund', 'Budgeting Basics'].map((pillar) => (
              <span
                key={pillar}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#0066FF]/20 text-[#38BDF8] border border-[#0066FF]/30"
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>

        {/* Invitation Code Verification */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
              Unique Pass Token
            </div>
            <div className="font-mono text-base tracking-widest text-white font-bold">
              {inviteCode}
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0284C7] hover:from-[#0052cc] hover:to-[#0369a1] text-white font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied to Clipboard
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Copy Invitation Pass
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

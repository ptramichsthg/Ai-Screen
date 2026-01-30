import React, { useState } from 'react';
import type { Candidate, Job } from '../types';
import { screenCandidateWithAI } from '../services/ai';
import { useRecruitmentStore } from '../store';
import { BrainCircuit, CheckCircle2, XCircle, Loader2, Mail, Briefcase, Sparkles, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  candidate: Candidate;
  job: Job;
}

export const CandidateCard: React.FC<Props> = ({ candidate, job }) => {
  const { updateCandidateAnalysis } = useRecruitmentStore();
  const [loading, setLoading] = useState(false);

  const handleScreening = async () => {
    setLoading(true);
    try {
      const analysis = await screenCandidateWithAI(candidate.resumeText, job.description, job.requirements);
      updateCandidateAnalysis(candidate.id, analysis);
      toast.success(`AI Analysis completed! Match score: ${analysis.score}%`, {
        duration: 4000,
        icon: '🎯',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "AI Screening gagal. Silakan coba lagi.";
      toast.error(errorMessage, {
        duration: 5000,
      });
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const score = candidate.aiAnalysis?.score || 0;
  const getScoreStatus = (s: number) => {
    if (s >= 80) return { color: 'text-emerald-600', bg: 'bg-gradient-to-br from-emerald-50 to-teal-50', border: 'border-emerald-200', bar: 'bg-gradient-to-r from-emerald-500 to-teal-500' };
    if (s >= 60) return { color: 'text-amber-600', bg: 'bg-gradient-to-br from-amber-50 to-orange-50', border: 'border-amber-200', bar: 'bg-gradient-to-r from-amber-500 to-orange-500' };
    return { color: 'text-slate-500', bg: 'bg-gradient-to-br from-slate-50 to-gray-50', border: 'border-slate-200', bar: 'bg-gradient-to-r from-slate-400 to-gray-400' };
  };

  const status = getScoreStatus(score);

  return (
    <div className="group bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-indigo-100 shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 overflow-hidden hover:scale-[1.02]">
      <div className="p-7">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all">{candidate.name}</h3>
              <div className="flex items-center gap-3 mt-2 text-slate-600 text-sm font-medium">
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-indigo-400" /> {candidate.email}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-purple-400" /> {candidate.roleApplied}</span>
              </div>
            </div>
          </div>

          {!candidate.aiAnalysis ? (
            <button
              onClick={handleScreening}
              disabled={loading}
              className="relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold overflow-hidden hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 transition-all active:scale-95 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              Analyze with AI
            </button>
          ) : (
            <div className={`flex flex-col items-end`}>
              <div className={`px-5 py-2.5 rounded-2xl text-sm font-bold border-2 ${status.bg} ${status.color} ${status.border} flex items-center gap-2 shadow-lg`}>
                <BrainCircuit className="w-5 h-5" /> Match Score: {score}%
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Result Section */}
        {candidate.aiAnalysis ? (
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-2 space-y-5">
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-100 shadow-inner">
                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" />
                  AI Executive Summary
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm font-medium">{candidate.aiAnalysis.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Strengths</h4>
                  {candidate.aiAnalysis.pros.map((p, i) => (
                    <div key={i} className="text-sm text-slate-700 flex items-start gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl border border-emerald-100 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2" /> {p}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-rose-500 uppercase flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Gaps</h4>
                  {candidate.aiAnalysis.cons.map((c, i) => (
                    <div key={i} className="text-sm text-slate-700 flex items-start gap-2 bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-xl border border-rose-100 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2" /> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-indigo-200 flex flex-col justify-center text-center shadow-lg">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path className="text-indigo-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path stroke="url(#scoreGradient)" strokeWidth="3.5" strokeDasharray={`${score}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-extrabold text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{score}%</div>
              </div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">Match Probability</p>
              <button className="mt-2 px-4 py-2 text-xs font-bold bg-white/50 backdrop-blur-sm rounded-xl text-slate-700 flex items-center justify-center gap-1.5 hover:bg-white hover:shadow-lg transition-all mx-auto border border-indigo-100">
                View Full Analysis <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-7 flex items-center gap-4 bg-gradient-to-r from-slate-50 to-indigo-50 p-5 rounded-2xl border-2 border-dashed border-indigo-200">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center shadow-lg text-indigo-500">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-500">AI screening has not been performed for this candidate yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
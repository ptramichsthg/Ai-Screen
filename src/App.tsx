// src/App.tsx
import { useRecruitmentStore } from './store';
import { CandidateCard } from './components/CandidateCard';
import {
  LayoutDashboard, Users, Settings, Plus, Search,
  Filter, Sparkles, Building2, ShieldCheck, Mail
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { jobs, activeTab, searchQuery, setActiveTab, setSearchQuery, generateRandomCandidate, getFilteredCandidates } = useRecruitmentStore();
  const activeJob = jobs[0];
  const filteredCandidates = getFilteredCandidates();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-lg shadow-indigo-300" />
                  Active Campaign
                </div>
                <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">{activeJob.title}</h2>
                <p className="text-slate-600 mt-3 font-semibold text-lg">{activeJob.department} Team • 24 days remaining</p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-lg border-2 border-indigo-100 rounded-2xl font-bold text-slate-700 hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all shadow-sm">
                  <Filter size={18} /> Filter
                </button>
                <button
                  onClick={generateRandomCandidate}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:scale-105 duration-300"
                >
                  <Plus size={18} /> New Applicant
                </button>
              </div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  Recent Applications
                  <span className="bg-indigo-100 text-indigo-600 text-xs py-0.5 px-2 rounded-full font-bold">{filteredCandidates.length}</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} job={activeJob} />
                ))}
              </div>
            </section>
          </div>
        );

      case 'candidates':
        return (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-8">Candidate Database</h2>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-indigo-100 overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 border-b-2 border-indigo-700">
                  <tr>
                    <th className="px-6 py-5 text-sm font-bold text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-5 text-sm font-bold text-white uppercase tracking-wider">Role</th>
                    <th className="px-6 py-5 text-sm font-bold text-white uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-5 text-sm font-bold text-white uppercase tracking-wider">AI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-100">
                  {filteredCandidates.map(c => (
                    <tr key={c.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all">
                      <td className="px-6 py-5 font-bold text-slate-900">{c.name}</td>
                      <td className="px-6 py-5 text-slate-600 font-medium">{c.roleApplied}</td>
                      <td className="px-6 py-5">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">{c.stage}</span>
                      </td>
                      <td className="px-6 py-5 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-lg">{c.aiAnalysis?.score || '-'}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'organization':
        return (
          <div className="animate-in fade-in duration-500 space-y-8">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">Organization Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrgCard icon={<Building2 className="text-indigo-600" />} title="Company Profile" desc="Manage your brand identity and recruitment pages." />
              <OrgCard icon={<Users className="text-emerald-600" />} title="Team Access" desc="Invite and manage recruiters or hiring managers." />
              <OrgCard icon={<ShieldCheck className="text-amber-600" />} title="AI Governance" desc="Configure screening strictness and API limits." />
              <OrgCard icon={<Mail className="text-rose-600" />} title="Email Templates" desc="Automate rejection or interview invitation emails." />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex font-sans text-slate-900">
      <aside className="w-72 bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-700 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 px-2 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="h-12 w-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Recruit<span className="text-cyan-300">AI</span></h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<Users size={20} />}
            label="All Candidates"
            active={activeTab === 'candidates'}
            onClick={() => setActiveTab('candidates')}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Organization"
            active={activeTab === 'organization'}
            onClick={() => setActiveTab('organization')}
          />
        </nav>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 px-8 flex items-center justify-between sticky top-0 z-10 shadow-lg shadow-indigo-50/50">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50 border-2 border-transparent focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium placeholder:text-slate-400 shadow-inner"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recruiter</p>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Admin Role</p>
            </div>
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 border-2 border-white shadow-lg flex items-center justify-center font-bold text-white text-sm hover:scale-110 transition-transform duration-300 cursor-pointer">A</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`
      w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 group
      ${active
        ? 'bg-white/20 backdrop-blur-lg text-white shadow-lg border border-white/30'
        : 'text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-lg'
      }
    `}>
      <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function OrgCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-7 rounded-3xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-2xl transition-all cursor-pointer group hover:scale-[1.02] duration-300">
      <div className="h-14 w-14 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg border border-indigo-100">
        {icon}
      </div>
      <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

export default App;
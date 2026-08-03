import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ items, title, subtitle, collapsed }) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`sidebar fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* OIT Logo Emblem */}
      <div className="p-6 border-b border-campus-navy-700/40">
        <div className="flex items-center gap-3.5">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-campus-gold-400 via-campus-gold-500 to-campus-gold-600 p-0.5 shadow-lg shadow-campus-gold-500/30">
              <div className="w-full h-full bg-campus-navy-900 rounded-[14px] flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-campus-gold-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-campus-navy-900"></span>
          </div>

          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-base tracking-tight text-white">{title || 'OIT MIS'}</h2>
              </div>
              <p className="text-[10px] font-semibold text-campus-gold-400 tracking-wide uppercase">{subtitle || 'Orion Institute of Tech'}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Academic Term Badge */}
      {!collapsed && (
        <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-campus-navy-800/60 border border-campus-navy-600/30 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-campus-navy-200">Academic Term:</span>
          <span className="text-[11px] font-bold text-campus-gold-400 bg-campus-gold-500/10 px-2 py-0.5 rounded-md border border-campus-gold-500/20">
            Fall 2025-26
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
            {!collapsed && <span className="tracking-wide">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-campus-navy-700/40 text-center">
          <p className="text-[11px] font-semibold text-campus-navy-300">OIT MIS Portal v2.5</p>
          <p className="text-[10px] text-campus-navy-400 mt-0.5">Orion Institute of Technology</p>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;

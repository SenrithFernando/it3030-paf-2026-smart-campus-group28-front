import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  CheckSquare,
  AlertTriangle,
  UserCircle,
  GraduationCap } from
'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    path: '/facilities',
    label: 'Facilities & Assets',
    icon: Building2
  },
  {
    path: '/bookings',
    label: 'Bookings',
    icon: CalendarDays
  },
  {
    path: '/approvals',
    label: 'Approvals',
    icon: CheckSquare,
    badge: 3
  },
  {
    path: '/incidents',
    label: 'Incidents',
    icon: AlertTriangle
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: UserCircle
  }];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen &&
      <div
        className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
        onClick={() => setIsOpen(false)} />

      }

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-blue-600">
            <GraduationCap size={28} />
            <span className="font-bold text-lg text-slate-900 leading-tight">
              Smart Campus
              <br />
              <span className="text-sm text-slate-500 font-medium">
                Operations Hub
              </span>
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) =>
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
                flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}>
            
              <div className="flex items-center gap-3">
                <item.icon size={20} className="shrink-0" />
                {item.label}
              </div>
              {item.badge &&
            <span className="bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs font-semibold">
                  {item.badge}
                </span>
            }
            </NavLink>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              System Status
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems operational
            </div>
          </div>
        </div>
      </aside>
    </>);

}
import React from 'react';
type StatusType =
'active' |
'approved' |
'resolved' |
'pending' |
'rejected' |
'critical' |
'in-progress' |
'closed' |
'available' |
'in-use' |
'maintenance';
interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(' ', '-');
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200'; // default gray
  switch (normalizedStatus) {
    case 'active':
    case 'approved':
    case 'resolved':
    case 'available':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      break;
    case 'pending':
    case 'maintenance':
      colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'rejected':
    case 'critical':
      colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
      break;
    case 'in-progress':
    case 'in-use':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      break;
    case 'closed':
      colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}>
      
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>);

}
import React from 'react';
import { AlertCircle, ArrowDown, ArrowUp, Minus } from 'lucide-react';
type PriorityType = 'critical' | 'high' | 'medium' | 'low';
interface PriorityBadgeProps {
  priority: PriorityType | string;
  className?: string;
}
export function PriorityBadge({
  priority,
  className = ''
}: PriorityBadgeProps) {
  const normalizedPriority = priority.toLowerCase() as PriorityType;
  let colorClasses = '';
  let Icon = Minus;
  switch (normalizedPriority) {
    case 'critical':
      colorClasses = 'bg-rose-100 text-rose-800 border-rose-200';
      Icon = AlertCircle;
      break;
    case 'high':
      colorClasses = 'bg-orange-100 text-orange-800 border-orange-200';
      Icon = ArrowUp;
      break;
    case 'medium':
      colorClasses = 'bg-amber-100 text-amber-800 border-amber-200';
      Icon = Minus;
      break;
    case 'low':
      colorClasses = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      Icon = ArrowDown;
      break;
    default:
      colorClasses = 'bg-slate-100 text-slate-800 border-slate-200';
  }
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}>
      
      <Icon className="w-3 h-3" />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>);

}
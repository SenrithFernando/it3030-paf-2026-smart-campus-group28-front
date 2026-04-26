import React, { useState } from 'react';
import { AlertTriangle, Plus, Search, Filter } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { Link } from 'react-router-dom';
const ticketsData = [
{
  id: 'INC-892',
  title: 'Projector not connecting to laptop',
  category: 'IT',
  priority: 'high',
  status: 'in-progress',
  created: 'Oct 24, 10:30 AM',
  assigned: 'IT Support'
},
{
  id: 'INC-893',
  title: 'Water leak near entrance',
  category: 'Plumbing',
  priority: 'critical',
  status: 'pending',
  created: 'Oct 24, 09:15 AM',
  assigned: 'Plumbing Team'
},
{
  id: 'INC-894',
  title: 'AC blowing warm air in Lab 201',
  category: 'HVAC',
  priority: 'medium',
  status: 'resolved',
  created: 'Oct 23, 02:00 PM',
  assigned: 'HVAC Team'
},
{
  id: 'INC-895',
  title: 'Flickering lights in hallway',
  category: 'Electrical',
  priority: 'low',
  status: 'pending',
  created: 'Oct 23, 11:00 AM',
  assigned: 'Electrical Team'
},
{
  id: 'INC-896',
  title: 'Broken chair in Study Room 4B',
  category: 'Facilities',
  priority: 'low',
  status: 'closed',
  created: 'Oct 22, 04:30 PM',
  assigned: 'Facilities'
}];

export function IncidentTicketing() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Incident Ticketing
          </h1>
          <p className="text-slate-500 mt-1">
            Report issues or track existing maintenance tickets.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          
          {showForm ?
          'View All Tickets' :

          <>
              <Plus size={18} /> Report Incident
            </>
          }
        </button>
      </div>

      {showForm ?
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-3xl">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              New Incident Report
            </h2>
          </div>
          <form className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Incident Title
              </label>
              <input
              type="text"
              placeholder="Brief description of the issue"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
            
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
                  <option value="">Select category...</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>HVAC</option>
                  <option>IT / Tech</option>
                  <option>Structural / Furniture</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Priority
                </label>
                <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
                  <option value="low">
                    Low - Minor issue, no immediate impact
                  </option>
                  <option value="medium">
                    Medium - Annoyance, partial disruption
                  </option>
                  <option value="high">
                    High - Major disruption to activities
                  </option>
                  <option value="critical">
                    Critical - Safety hazard or complete failure
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
              type="text"
              placeholder="e.g., Physics Lab 201, near the window"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
            
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Detailed Description
              </label>
              <textarea
              rows={4}
              placeholder="Provide as much detail as possible..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none">
            </textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="text-sm text-slate-500">
                  Click to upload or drag and drop images here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              
                Cancel
              </button>
              <button
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              
                Submit Ticket
              </button>
            </div>
          </form>
        </div> :

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Filter size={16} /> Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Assigned To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ticketsData.map((ticket) =>
              <tr
                key={ticket.id}
                className="hover:bg-slate-50 transition-colors group">
                
                    <td className="px-6 py-4">
                      <Link to="/tickets/1" className="block">
                        <div className="font-medium text-blue-600 group-hover:text-blue-700">
                          {ticket.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {ticket.id} • {ticket.created}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={ticket.priority} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {ticket.assigned}
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>);

}
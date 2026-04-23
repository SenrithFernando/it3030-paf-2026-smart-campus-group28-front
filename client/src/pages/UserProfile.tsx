import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building, Calendar, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import apiClient from '../services/api';

export function UserProfile() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'tickets'>('bookings');
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user basic info
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, ticketsRes] = await Promise.all([
          apiClient.get('/bookings/my-bookings'),
          apiClient.get('/tickets/my-tickets')
        ]);
        setBookings(bookingsRes.data.data || []);
        setTickets(ticketsRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&size=128`}
                alt={user?.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-white shadow-md object-cover bg-white" />
              
              <div className="pb-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  {user?.name || 'User Name'}
                </h1>
                <p className="text-slate-500 font-medium">
                  {user?.role === 'ADMIN' ? 'System Administrator' : 'Campus Member'}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto mt-4 sm:mt-0">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              {user?.email || 'email@university.edu'}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              Contact info unavailable
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Building className="w-4 h-4 text-slate-400" />
              Smart Campus Network
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'bookings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <Calendar size={18} /> My Bookings
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'tickets' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            <AlertTriangle size={18} /> My Tickets
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'bookings' ?
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Facility</th>
                    <th className="px-6 py-4 font-medium">Date & Time</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400">Loading bookings...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400">No bookings found.</td></tr>
                  ) : bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{booking.resourceId}</td>
                      <td className="px-6 py-4 text-slate-600">{booking.bookingDate} • {booking.startTime} - {booking.endTime}</td>
                      <td className="px-6 py-4"><StatusBadge status={booking.status?.toLowerCase()} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> :

          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-medium">Ticket Title</th>
                    <th className="px-6 py-4 font-medium">Priority</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">Loading tickets...</td></tr>
                  ) : tickets.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-400">No tickets found.</td></tr>
                  ) : tickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 truncate max-w-xs">{ticket.description}</td>
                      <td className="px-6 py-4"><PriorityBadge priority={ticket.priority?.toLowerCase()} /></td>
                      <td className="px-6 py-4"><StatusBadge status={ticket.status?.toLowerCase()} /></td>
                      <td className="px-6 py-4 text-slate-600">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>);
}
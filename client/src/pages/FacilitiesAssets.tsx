import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Users,
  MapPin,
  MonitorPlay,
  Beaker,
  DoorOpen,
  CalendarPlus,
  Plus,
  X,
  Clock,
  Info } from
'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../services/api';

export function FacilitiesAssets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Room',
    capacity: '',
    location: '',
    availabilityWindows: '08:00 - 18:00',
    status: 'ACTIVE',
    description: ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.role === 'ADMIN');
    }
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/resources');
      setFacilities(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/resources', {
        ...formData,
        capacity: parseInt(formData.capacity) || 0
      });
      setShowAddModal(false);
      setFormData({
        name: '',
        type: 'Room',
        capacity: '',
        location: '',
        availabilityWindows: '08:00 - 18:00',
        status: 'ACTIVE',
        description: ''
      });
      fetchResources();
      alert('Facility added successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add facility');
    }
  };

  // Booking Form State
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    startTime: '',
    endTime: '',
    purpose: '',
    expectedAttendees: 1
  });

  const handleBookNow = (facility: any) => {
    setSelectedFacility(facility);
    setShowBookModal(true);
  };

  // const handleBookingSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await apiClient.post('/bookings', {
  //       resourceId: selectedFacility.id,
  //       ...bookingData,
  //       expectedAttendees: parseInt(bookingData.expectedAttendees.toString()) || 1
  //     });
  //     setShowBookModal(false);
  //     setBookingData({
  //       bookingDate: '',
  //       startTime: '',
  //       endTime: '',
  //       purpose: '',
  //       expectedAttendees: 1
  //     });
  //     alert('Booking request submitted successfully!');
  //   } catch (err: any) {
  //     alert(err.response?.data?.message || 'Failed to submit booking');
  //   }
  // };

  const filteredFacilities = facilities.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || f.type === typeFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      f.status?.toLowerCase().replace('_', ' ') === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  const getIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'lab': return Beaker;
      case 'equipment': return MonitorPlay;
      default: return DoorOpen;
    }
  };

  const getColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'lab': return 'bg-purple-100 text-purple-600';
      case 'equipment': return 'bg-amber-100 text-amber-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Facilities & Assets
          </h1>
          <p className="text-slate-500 mt-1">
            Browse and book university rooms, labs, and equipment.
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={18} />
            Add Facility
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
        </div>
        <div className="flex gap-4">
          <div className="relative min-w-[150px]">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
              <option value="All">All Types</option>
              <option value="Room">Rooms</option>
              <option value="Lab">Labs</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>
          <div className="relative min-w-[150px]">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all">
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-white rounded-xl border border-slate-100 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFacilities.map((facility, index) => {
            const Icon = getIcon(facility.type);
            const colorClass = getColor(facility.type);
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                <div className="h-32 bg-slate-100 relative flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClass}`}>
                    <Icon size={32} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={facility.status?.toLowerCase() === 'active' ? 'available' : 'maintenance'} />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 line-clamp-1" title={facility.name}>
                      {facility.name}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {facility.type}
                    </span>
                  </div>
                  <div className="space-y-2 mt-2 mb-6 flex-1">
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin size={16} className="mr-2 text-slate-400" />
                      <span className="line-clamp-1">{facility.location}</span>
                    </div>
                    {facility.capacity > 0 && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Users size={16} className="mr-2 text-slate-400" />
                        <span>Capacity: {facility.capacity}</span>
                      </div>
                    )}
                  </div>
                  <button
                    disabled={facility.status !== 'ACTIVE'}
                    onClick={() => handleBookNow(facility)}
                    className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors
                      ${facility.status !== 'ACTIVE' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}
                    `}>
                    <CalendarPlus size={16} />
                    Book Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {filteredFacilities.length === 0 && !loading && (
        <div className="py-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
          <p className="text-slate-500">No facilities found matching your criteria.</p>
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                <h3 className="text-lg font-bold text-slate-900">Add New facility</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Facility Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Science Lab 402"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option value="Room">Room</option>
                      <option value="Lab">Lab</option>
                      <option value="Equipment">Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Building A, 2nd Floor"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Availability Windows</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="text"
                        value={formData.availabilityWindows}
                        onChange={(e) => setFormData({ ...formData, availabilityWindows: e.target.value })}
                        placeholder="e.g. 08:00 - 18:00 Weekdays"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                    <div className="relative">
                      <Info size={16} className="absolute left-3 top-3 text-slate-400" />
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of the facility..."
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
                    Create Facility
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showBookModal && selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Book Facility</h3>
                  <p className="text-xs text-slate-500">{selectedFacility.name}</p>
                </div>
                <button onClick={() => setShowBookModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Booking Date</label>
                    <div className="relative">
                      <CalendarPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingData.bookingDate}
                        onChange={(e) => setBookingData({ ...bookingData, bookingDate: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="time"
                        value={bookingData.startTime}
                        onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="time"
                        value={bookingData.endTime}
                        onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Attendees</label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        type="number"
                        min="1"
                        value={bookingData.expectedAttendees}
                        onChange={(e) => setBookingData({ ...bookingData, expectedAttendees: parseInt(e.target.value) || 1 })}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Purpose of Booking</label>
                    <div className="relative">
                      <Info size={16} className="absolute left-3 top-3 text-slate-400" />
                      <textarea
                        required
                        value={bookingData.purpose}
                        onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                        placeholder="Briefly explain why you need this facility..."
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
                    Confirm Booking
                  </button>
                </div>
              </form> */}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>);
}
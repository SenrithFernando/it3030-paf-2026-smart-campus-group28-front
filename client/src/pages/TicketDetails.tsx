import React from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Paperclip,
  Clock,
  User,
  MapPin,
  Tag,
  Send } from
'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
export function TicketDetails() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          to="/incidents"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Projector not connecting to laptop
            </h1>
            <span className="text-sm font-medium text-slate-500">#INC-892</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <PriorityBadge priority="high" />
            <StatusBadge status="in-progress" />
            <span className="text-sm text-slate-500 flex items-center gap-1">
              <Clock size={14} /> Created Oct 24, 10:30 AM
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Description
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              The ceiling-mounted projector in Physics Lab 201 is not
              recognizing any HDMI input from laptops. We have tried multiple
              cables and different laptops (both Mac and Windows). The projector
              turns on, but displays a "No Signal" message. This is affecting
              our ability to conduct lectures.
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Paperclip size={14} /> Attachments (1)
              </h4>
              <div className="flex gap-4">
                <div className="w-32 h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden group cursor-pointer relative">
                  <img
                    src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="Projector error"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
              <MessageSquare size={18} className="text-slate-500" />
              <h3 className="font-semibold text-slate-900">
                Activity & Comments
              </h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Comment 1 */}
              <div className="flex gap-4">
                <img
                  src="https://i.pravatar.cc/150?u=tech"
                  alt="Tech"
                  className="w-10 h-10 rounded-full border border-slate-200" />
                
                <div className="flex-1">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900 text-sm">
                        Mike Johnson (IT Support)
                      </span>
                      <span className="text-xs text-slate-500">
                        Oct 24, 11:15 AM
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      I'll head over to check the wall plate connection first.
                      Sometimes the internal cable gets loose.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Change Activity */}
              <div className="flex gap-4 items-center pl-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 z-10">
                  <Clock size={12} />
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-medium text-slate-700">
                    Mike Johnson
                  </span>{' '}
                  changed status from{' '}
                  <StatusBadge
                    status="pending"
                    className="scale-90 origin-left" />
                  {' '}
                  to{' '}
                  <StatusBadge
                    status="in-progress"
                    className="scale-90 origin-left" />
                  
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
                <img
                  src="https://i.pravatar.cc/150?u=admin"
                  alt="You"
                  className="w-10 h-10 rounded-full border border-slate-200" />
                
                <div className="flex-1 relative">
                  <textarea
                    rows={3}
                    placeholder="Add a comment or update..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none">
                  </textarea>
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1">
                      <Send size={14} /> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="space-y-6">
          {/* Details Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Ticket Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="text-sm font-medium text-slate-900">
                    IT / Tech Support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm font-medium text-slate-900">
                    Physics Lab 201
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Reporter</p>
                  <p className="text-sm font-medium text-slate-900">
                    Prof. Sarah Harding
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Assigned To</p>
                  <p className="text-sm font-medium text-slate-900">
                    Mike Johnson (IT)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technician Update Panel */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Update Status
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  New Status
                </label>
                <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Internal Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none">
                </textarea>
              </div>
              <button className="w-full py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
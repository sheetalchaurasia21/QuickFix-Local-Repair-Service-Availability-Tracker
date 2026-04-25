import React from 'react';

function ProviderHome() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex shrink-0">
        <div className="!p-6 !pb-2">
          <div className="flex items-center !gap-3 text-xl font-bold text-gray-900">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            QuickFix
          </div>
        </div>
        
        <nav className="flex-1 !px-4 !py-6 space-y-2">
          <a href="#" className="flex items-center !gap-3 !px-4 !py-3 !text-[#0d3b2e] bg-[#eef8f3] rounded-xl font-semibold transition-colors no-underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Bookings
          </a>
          <a href="#" className="flex items-center !gap-3 !px-4 !py-3 !text-gray-500 hover:bg-gray-50 hover:!text-gray-900 rounded-xl font-medium transition-colors no-underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Earnings
          </a>
          <a href="#" className="flex items-center !gap-3 !px-4 !py-3 !text-gray-500 hover:bg-gray-50 hover:!text-gray-900 rounded-xl font-medium transition-colors no-underline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            Reviews
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-[#0b3828] text-white !px-8 !py-5 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-2xl font-semibold flex items-center !gap-2 !m-0 !mb-1">
              Good morning, John! <span className="text-xl">👋</span>
            </h1>
            <p className="text-sm text-green-100/80 !m-0">Here's what's happening with your bookings today.</p>
          </div>
          <div className="flex items-center !gap-6">
            <button className="relative !p-1 text-white hover:text-green-200 transition-colors bg-transparent border-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#8cc63f] text-black text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center !gap-3 bg-white/10 rounded-full !py-1 !pr-3 !pl-1 cursor-pointer hover:bg-white/20 transition-colors">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-9 h-9 rounded-full object-cover" />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium leading-tight">John Doe</div>
                <div className="text-[11px] text-green-200/80 leading-tight">BoilerFix Plumbing</div>
              </div>
              <svg className="w-4 h-4 ml-1 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto !p-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6 !mb-8">
            <StatCard 
              title="New Bookings" 
              value="4" 
              subtext="+2 from yesterday" 
              iconColor="bg-[#f0f9f0] !text-[#4db051]" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
            />
            <StatCard 
              title="Confirmed Bookings" 
              value="7" 
              subtext="+3 from yesterday" 
              iconColor="bg-[#fff9e6] !text-[#e6b800]" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
            />
            <StatCard 
              title="Completed Today" 
              value="3" 
              subtext="View all completed" 
              iconColor="bg-[#f0f4ff] !text-[#3b82f6]" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>}
            />
            <StatCard 
              title="Earnings (This Month)" 
              value="£1,240" 
              subtext="+12% from last month" 
              iconColor="bg-[#e6f7f5] !text-[#0d9488]" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 !gap-8">
            {/* Left Column: Recent Bookings */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center !mb-2">
                <h2 className="text-lg font-bold text-gray-800 !m-0">Recent Bookings</h2>
                <a href="#" className="text-sm !text-green-700 font-semibold hover:!text-green-800 flex items-center !gap-1 no-underline">
                  View All Bookings <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
              </div>
              
              <div className="space-y-4">
                <BookingCard 
                  status="New" 
                  statusColor="bg-[#fff3e0] !text-[#e65100]"
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>}
                  title="Boiler Installation"
                  customer="Sarah Johnson"
                  phone="07712 345678"
                  date="Today, 10:00 AM"
                  address="12 King Street, London, SW1A 1AA"
                  price="£120"
                />
                <BookingCard 
                  status="Confirmed" 
                  statusColor="bg-[#fff9e6] !text-[#b38f00]"
                  icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>}
                  title="Boiler Servicing"
                  customer="Emma Wilson"
                  phone="07890 987654"
                  date="Tomorrow, 09:00 AM"
                  address="8 Park Lane, London, W1K 1BE"
                  price="£60"
                />
              </div>
            </div>

            {/* Right Column: Today's Schedule & Earnings Overview */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 !p-6">
                <h3 className="text-base font-bold text-gray-800 !mb-6 !m-0">Today's Schedule</h3>
                <div className="relative border-l-2 border-gray-100 !ml-3 space-y-6">
                  <TimelineItem time="10:00 AM" title="Boiler Installation" subtitle="Sarah Johnson" dotColor="bg-green-500" />
                  <TimelineItem time="01:30 PM" title="Boiler Repair" subtitle="Michael Brown" dotColor="bg-green-500" />
                  <TimelineItem time="03:00 PM" title="Emergency Repair" subtitle="James Thompson" dotColor="bg-green-500" />
                </div>
                <a href="#" className="block text-center !mt-6 text-sm font-semibold !text-green-700 hover:!text-green-800 flex items-center justify-center !gap-1 no-underline">
                  View Full Schedule <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
              </div>

              {/* Earnings Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 !p-6">
                <h3 className="text-base font-bold text-gray-800 !mb-4 !m-0">Earnings Overview</h3>
                <div className="flex items-end justify-between !mb-2">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 !m-0">£1,240</div>
                    <div className="text-sm text-gray-500 !mt-1">This Month</div>
                  </div>
                  <div className="text-sm font-medium !text-green-700 flex items-center bg-green-50 !px-2 !py-1 rounded">
                    &uarr; 12% from last month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents
function StatCard({ title, value, subtext, iconColor, icon }) {
  return (
    <div className="bg-white !p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start !mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 !m-0 !mb-1">{title}</h3>
          <div className="text-3xl font-bold text-gray-900 !m-0">{value}</div>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="text-xs font-medium text-gray-500">{subtext}</div>
    </div>
  );
}

function BookingCard({ status, statusColor, title, customer, phone, date, address, price, icon }) {
  return (
    <div className="bg-white !p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row items-start xl:items-center justify-between !gap-4">
      {/* Left section: Icon + Text */}
      <div className="flex !gap-4 items-start w-full xl:w-auto">
        <div className="flex flex-col items-center !gap-1">
           <div className={`!px-2 !py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${statusColor} shrink-0`}>
            {status}
          </div>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusColor} bg-opacity-20`}>
             {icon}
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 text-base !m-0">{title}</h4>
          <div className="text-sm text-gray-500 !mt-1 flex flex-col sm:flex-row sm:gap-2">
            <span>{customer}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>{phone}</span>
          </div>
        </div>
      </div>
      
      {/* Middle section: Date + Address */}
      <div className="flex flex-col items-start !gap-1 w-full xl:w-auto text-sm text-gray-600 xl:border-l border-gray-100 xl:!pl-6">
        <div className="flex items-center !gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {date}
        </div>
        <div className="flex items-center !gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span className="truncate max-w-[200px]">{address}</span>
        </div>
      </div>
      
      {/* Right section: Price + Button */}
      <div className="flex items-center justify-between w-full xl:w-auto xl:!pl-6 !mt-2 xl:!mt-0">
        <div className="text-right !mr-4">
          <div className="font-bold text-gray-900 text-lg !m-0">{price}</div>
          <div className="text-[11px] text-gray-500">Estimated</div>
        </div>
        <button className="!px-4 !py-2 bg-[#f0f9f0] hover:bg-[#e2f3e2] !text-[#2e7d32] text-sm font-bold rounded-lg transition-colors border-0 cursor-pointer whitespace-nowrap">
          View Details
        </button>
      </div>
    </div>
  );
}

function TimelineItem({ time, title, subtitle, dotColor }) {
  return (
    <div className="relative !pl-6">
      <div className={`absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full ${dotColor} border-2 border-white shadow-sm box-content`}></div>
      <div className="text-xs font-bold text-gray-400 !mb-0.5">{time}</div>
      <div className="font-bold text-gray-800 text-sm !m-0">{title}</div>
      <div className="text-[13px] text-gray-500 !m-0">{subtitle}</div>
    </div>
  );
}

export default ProviderHome;
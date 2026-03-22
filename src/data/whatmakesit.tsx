import joinImg from "@/public/whatmakesit/join.png";

export const features = [
   {
      icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
      ),
      title: "JOIN VIRTUALLY",
      titleStyle: "uppercase tracking-widest text-sm font-bold",
      description: "Customer can join virtual queue via their devices without needing physical interaction.",
      hasImage: true,
      imageSrc: joinImg, 
      span: "md:col-span-1 md:row-span-2",
   },
   {
      icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
      </svg>
      ),
      title: "Predictive AI",
      titleStyle: "text-base font-semibold",
      description: "Proprietary algorithms analyze historical data to provide hyper-accurate wait time estimates.",
      hasImage: false,
      span: "md:col-span-1 md:row-span-1",
   },
   {
      icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
      ),
      title: "Watch Your Queue Move",
      titleStyle: "text-base font-semibold",
      description: "Live dashboard for staff to adjust flow on one fly, prioritize urgent cases or high-value clients effortlessly.",
      hasImage: false,
      span: "md:col-span-1 md:row-span-1",
   },
   {
      icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
      ),
      title: "Real-time Position Tracking",
      titleStyle: "text-base font-semibold",
      description: "Automatic SMS notifications keep users informed of their place in line without requiring them to stay on site.",
      hasImage: false,
      span: "md:col-span-1 md:row-span-1",
   },
   {
      icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
      ),
      title: "Control From The Dashboard",
      titleStyle: "text-base font-semibold",
      description: "Automatic SMS notifications keep users informed of their place in line without requiring them to stay on site.",
      hasImage: false,
      span: "md:col-span-1 md:row-span-1",
   }
];

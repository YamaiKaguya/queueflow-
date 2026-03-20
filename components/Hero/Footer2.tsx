export default function footer (){
    return (
        <footer className="w-full bg-white border-t border-gray-100 ">
            <div className="
            p-5

            flex 
            flex-col 
            items-center 
            justify-between
            gap-4 

            sm:flex-row">
            {/*  !sm:flex-row*/}

            {/* !LEFT SIDE */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <span>2026 QueueFlow+. All rights reserved.</span>
                </div>

                {/* !CENTER */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                {["Privacy Policy", "Term of Service", "Support"].map((item) => (
                    <a key={item} href="#" className="hover:text-gray-600 transition-colors">
                    {item}
                    </a>
                ))}
                </div>

                {/* !RIGHT SIDE */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
                    </svg>
                    <span>English (US)</span>
                </div>
                <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span>Verified Secure</span>
                </div>
                </div>
            </div>
        </footer>
    )
}
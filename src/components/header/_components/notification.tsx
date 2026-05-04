'use client'
import { useRef, useEffect, useCallback } from "react"
import { Bell, CheckCircle, Loader2 } from "lucide-react"
import { useNotifications } from "../_hooks/useNotification"


import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
} from "@/src/components/ui/dropdown-menu"

export default function Notification() {
   const scrollRef = useRef<HTMLDivElement>(null)
   const sentinelRef = useRef<HTMLDivElement>(null)

   const { notifs, loading, loadingMore, hasMore, loadMore, markOneRead, markAllRead } =
      useNotifications()

   const unreadCount = notifs.filter((n) => !n.read).length

   const handleObserver = useCallback(
      (entries: IntersectionObserverEntry[]) => {
         if (entries[0].isIntersecting && hasMore && !loadingMore) {
            loadMore()
         }
      },
      [hasMore, loadingMore, loadMore]
   )

   useEffect(() => {
      const sentinel = sentinelRef.current
      if (!sentinel) return
      const observer = new IntersectionObserver(handleObserver, {
         root: scrollRef.current,
         rootMargin: '0px',
         threshold: 0.1,
      })
      observer.observe(sentinel)
      return () => observer.disconnect()
   }, [handleObserver])

   return (
      <DropdownMenu>
         {/* BELL BUTTON */}
         <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">
               <Bell size={22} />
               {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
               )}
            </button>
         </DropdownMenuTrigger>

         {/* DROPDOWN */}
         <DropdownMenuContent align="end" className="w-96 p-2 rounded-2xl">

            {/* HEADER */}
            <div className="px-3 py-3 mb-1">
               <p className="font-semibold text-base text-gray-900">Notifications</p>
               <p className="text-sm text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
               </p>
            </div>

            {/* SCROLLABLE LIST */}
            <div ref={scrollRef} className="max-h-80 overflow-auto">
               <div className="border-t border-gray-100 mb-1" />

               {/* INITIAL LOADING */}
               {loading && (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">
                     Loading...
                  </div>
               )}

               {/* EMPTY STATE */}
               {!loading && notifs.length === 0 && (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">
                     No notifications
                  </div>
               )}

               {/* NOTIFICATION ROWS */}
               {!loading && notifs.map((notif) => (
                  <button
                     key={notif.id}
                     onClick={() => markOneRead(notif.id)}
                     className={`w-full flex items-start gap-3 mb-1 last:mb-0 px-3 py-2.5 rounded-xl text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition ${
                        !notif.read ? "bg-gray-50" : ""
                     }`}
                  >
                     <CheckCircle
                        size={18}
                        className={notif.read ? "text-gray-400" : "text-blue-500"}
                     />
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                           {new Date(notif.created_at).toLocaleString()}
                        </p>
                     </div>
                     {!notif.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1.5" />
                     )}
                  </button>
               ))}

               {/* SCROLL SENTINEL */}
               <div ref={sentinelRef} className="py-1">
                  {loadingMore && (
                     <div className="flex justify-center py-2">
                        <Loader2 size={16} className="text-gray-400 animate-spin" />
                     </div>
                  )}
                  {!hasMore && !loading && notifs.length > 0 && (
                     <p className="text-xs text-gray-300 text-center py-2">
                        You&apos;re all caught up
                     </p>
                  )}
               </div>
            </div>

            {/* MARK ALL AS READ */}
            {!loading && unreadCount > 0 && (
               <>
                  <div className="border-t border-gray-100 mt-1 mb-1" />
                  <button
                     onClick={markAllRead}
                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition"
                  >
                     <span className="text-sm font-medium">Mark all as read</span>
                  </button>
               </>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
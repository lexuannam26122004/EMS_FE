import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react'
import { useContext, createContext, useState, ReactNode, FC } from 'react'
import { useRouter } from 'next/navigation'

// Define a context type for the Sidebar context
interface SidebarContextType {
    expanded: boolean
}

// Create the SidebarContext
const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

// Sidebar component
const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
    const [expanded, setExpanded] = useState<boolean>(true)

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <aside className='h-screen'>
                <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
                    <div className='p-4 pb-2 flex justify-between items-center'>
                        <img
                            src='https://img.logoipsum.com/243.svg'
                            style={{ height: '35px' }}
                            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
                            alt=''
                        />
                        <button
                            onClick={() => setExpanded(curr => !curr)}
                            className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    <ul className='flex-1 px-3'>{children}</ul>

                    <div className='border-t flex p-3'>
                        <img
                            src='https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
                            alt=''
                            className='w-10 h-10 rounded-md'
                        />
                        <div
                            className={`flex justify-between items-center overflow-hidden transition-all ${
                                expanded ? 'w-52 ml-3' : 'w-0'
                            }`}
                        >
                            <div className='leading-4'>
                                <h4 className='font-semibold'>NMP System</h4>
                                <span className='text-xs text-gray-600'>nmp.system@gmail.com</span>
                            </div>
                            {/* <MoreVertical size={20} /> */}
                        </div>
                    </div>
                </nav>
            </aside>
        </SidebarContext.Provider>
    )
}

// SidebarItem component
interface SidebarItemProps {
    icon: ReactNode
    text: string
    route: string
    alert?: boolean
    active?: boolean
}

export const SidebarItem: FC<SidebarItemProps> = ({ icon, text, route, alert, active }) => {
    const context = useContext(SidebarContext)
    const router = useRouter()

    if (!context) {
        throw new Error('SidebarItem must be used within a Sidebar')
    }

    const { expanded } = context

    const handleClick = () => {
        router.push(route)
    }

    return (
        <li
            onClick={handleClick}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                active
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
                    : 'hover:bg-indigo-50 text-gray-600'
            }`}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>{' '}
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />}
            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                    style={{ zIndex: 1000 }}
                >
                    {text}
                </div>
            )}
        </li>
    )
}

export default Sidebar

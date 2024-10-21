import {ChevronDown} from "lucide-react"

interface props{
    label: string,
    icon: JSX.Element,
    expanded: boolean,
    onClick: () => void,
    children: JSX.Element,
    className?: string,  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to '' if not provided.  // optional additional class name for the component. Defaults to
    childWrapperClassName?:string
}

function FilterPill({ label, icon, expanded, onClick, children, className = '',childWrapperClassName ='' }:props) {
    return (
      <div className="relative">
        <button
          onClick={onClick}
          className={`flex items-center space-x-1 px-3 py-2 rounded-full shadow ${
            expanded ? 'bg-gray-200' : 'bg-white'
          } ${className}`}
        >
          {icon}
          <span>{label}</span>
          <ChevronDown size={16} className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && (
          <div className={`absolute z-10 mt-2 bg-white rounded-lg shadow-lg overflow-hidden ${childWrapperClassName}`}>
            {children}
          </div>
        )}
      </div>
    )
  }

export default FilterPill
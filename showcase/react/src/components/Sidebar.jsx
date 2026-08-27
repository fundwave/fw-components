import React from 'react';
import { NavLink } from 'react-router-dom';

const components = [
  { id: 'button', name: 'Button' },
  { id: 'input', name: 'Input' },
  { id: 'select', name: 'Select' },
  { id: 'badge', name: 'Badge' },
  { id: 'card', name: 'Card' },
  { id: 'modal', name: 'Modal' },
  { id: 'tooltip', name: 'Tooltip' },
  { id: 'avatar', name: 'Avatar' },
  { id: 'spinner', name: 'Spinner' },
  { id: 'progressbar', name: 'Progress Bar' },
  { id: 'table', name: 'Table' },
  { id: 'datepicker', name: 'Date Picker' },
  { id: 'actionmenu', name: 'Action Menu' },
  { id: 'dropdownmenu', name: 'Dropdown Menu' },
  { id: 'chart', name: 'Chart' },
  { id: 'statcard', name: 'Stat Card' },
  { id: 'emptystate', name: 'Empty State' },
  { id: 'editor', name: 'Editor' },
  { id: 'fileuploader', name: 'File Uploader' },
  { id: 'fileviewer', name: 'File Viewer' },
  { id: 'filepreview', name: 'File Preview' },
  { id: 'draganddrop', name: 'Drag & Drop' },
  { id: 'infinitescroll', name: 'Infinite Scroll' },
  { id: 'confirmationdialog', name: 'Confirmation Dialog' },
];

function Sidebar() {
  return (
    <div className="w-64 border-r border-border bg-card h-screen overflow-y-auto flex-shrink-0">
      <div className="p-6 border-b border-border sticky top-0 bg-card/95 backdrop-blur z-10">
        <h1 className="text-xl font-bold text-foreground">FW Components</h1>
        <p className="text-sm text-muted-foreground mt-1">Component Library</p>
      </div>
      
      <nav className="p-3">
        <div className="mb-2 px-3 py-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Components
          </h2>
        </div>
        
        <ul className="space-y-0.5">
          {components.map((component) => (
            <li key={component.id}>
              <NavLink
                to={`/${component.id}`}
                className={({ isActive }) => `w-full text-left px-3 py-2 rounded-lg transition-colors block ${
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                {component.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

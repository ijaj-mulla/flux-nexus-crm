import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Activity,
  Users,
  TrendingUp,
  ClipboardList,
  Package,
  BarChart3,
  Building2,
  HandHeart,
  MapPin,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "Home",
    icon: Home,
    path: "/"
  },
  {
    name: "Calendar", 
    icon: Calendar,
    path: "/calendar"
  },
  {
    name: "Customers",
    icon: Users,
    children: [
      { name: "Accounts", icon: Building2, path: "/customers/accounts" },
      { name: "Contacts", icon: Users, path: "/customers/contacts" },
      { name: "Account Hierarchy", icon: BarChart3, path: "/customers/hierarchy" }
    ]
  },
  {
    name: "Sales",
    icon: TrendingUp,
    children: [
      { name: "Leads", icon: TrendingUp, path: "/sales/leads" },
      { name: "Opportunities", icon: TrendingUp, path: "/sales/opportunities" },
      { name: "Sales Quotes", icon: ClipboardList, path: "/sales/quotes" },
      { name: "Sales Orders", icon: ClipboardList, path: "/sales/orders" }
    ]
  },
  {
    name: "Activities",
    icon: ClipboardList,
    children: [
      { name: "Appointments", icon: Calendar, path: "/activities/appointments" },
      { name: "E-Mails", icon: Activity, path: "/activities/emails" },
      { name: "Tasks", icon: ClipboardList, path: "/activities/tasks" }
    ]
  },
  {
    name: "Visits",
    icon: MapPin,
    children: [
      { name: "Visit List", icon: MapPin, path: "/visits" }
    ]
  },
  {
    name: "Integrations",
    icon: Settings,
    children: [
      { name: "Email Integration", icon: Activity, path: "/integrations/email" },
      { name: "Google Leads Integration", icon: TrendingUp, path: "/integrations/google" }
    ]
  },
  {
    name: "Admin / Settings",
    icon: Settings,
    children: [
      { name: "User Management", icon: Users, path: "/admin/users" },
      { name: "Roles & Permissions", icon: Settings, path: "/admin/roles" }
    ]
  }
];

interface CRMSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CRMSidebar: React.FC<CRMSidebarProps> = ({ isOpen, onToggle }) => {
  const [openMenus, setOpenMenus] = useState<string[]>(["Home"]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isMenuOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-sidebar-bg border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
        "lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "w-64 shadow-medium"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-foreground">CRM Pro</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden p-1 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 h-[calc(100vh-73px)] overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                      "hover:bg-sidebar-hover text-sidebar-foreground",
                      isActive && "bg-primary text-primary-foreground font-medium shadow-sm"
                    )}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                ) : (
                  <Collapsible 
                    open={isMenuOpen(item.name)}
                    onOpenChange={() => toggleMenu(item.name)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between text-left font-normal h-9",
                          "hover:bg-sidebar-hover text-sidebar-foreground",
                          isMenuOpen(item.name) && "bg-sidebar-active text-primary font-medium"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        {isMenuOpen(item.name) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 ml-4 mt-1">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path || "#"}
                          className={({ isActive }) => cn(
                            "flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors",
                            "hover:bg-sidebar-hover text-sidebar-foreground",
                            isActive && "bg-primary text-primary-foreground font-medium shadow-sm"
                          )}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              onToggle();
                            }
                          }}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.name}</span>
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
'use client';

import { UserButton } from '@clerk/nextjs';
import { Calendar, Home, Settings, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Meal Plan', href: '/mealPlan', icon: Calendar },
        { name: 'Shopping List', href: '/shoppingList', icon: ShoppingCart },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <header className='bg-white shadow-md'>
            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex'>
                        <div className='flex-shrink-0 flex items-center'>
                            <h1 className='text-2xl font-semibold text-primary'>
                                Top Academy
                            </h1>
                        </div>
                    </div>
                    <nav className='hidden sm:flex'>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary'
                            >
                                <item.icon className='w-5 h-5 mr-2' />
                                {item.name}
                            </Link>
                        ))}
                        <UserButton />
                    </nav>
                    {/* <div className="flex items-center sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open main menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex items-center">
                        <item.icon className="w-5 h-5 mr-2" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
                </div>
            </div>
        </header>
    );
}

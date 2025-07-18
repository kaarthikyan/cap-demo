import GridShape from '@/components/common/GridShape';
import ThemeTogglerTwo from '@/components/common/ThemeTogglerTwo';

import { ThemeProvider } from '@/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Chat from '@/components/Chat';
import I18nPanel from '@/components/I18nPanel';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('token')?.value;
  const user = token ? verifyToken(token) : '';

  if (user) {
    redirect('/');
  }

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              {/* <!-- ===== Common Grid Shape Start ===== --> */}
              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
                <Link href="/" className="block mb-4">
                  <Image width={231} height={48} src="./images/logo/auth-logo.svg" alt="Logo" />
                </Link>
               <I18nPanel />
                <div>
                   {/* <h1 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray">How may I help you!</h1> */}
                   <Chat />
                 </div>
              </div>
            </div>
          </div>
          <div className="fixed top-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

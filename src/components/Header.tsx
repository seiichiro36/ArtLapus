// "use client"

// import React from 'react'
// import {
//     Menubar,
//     MenubarCheckboxItem,
//     MenubarContent,
//     MenubarItem,
//     MenubarMenu,
//     MenubarRadioGroup,
//     MenubarRadioItem,
//     MenubarSeparator,
//     MenubarShortcut,
//     MenubarSub,
//     MenubarSubContent,
//     MenubarSubTrigger,
//     MenubarTrigger,
// } from ".//ui/menubar"
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { Heart, Router } from 'lucide-react'
// import SearchComponent from './Search'
// import { useRouter } from 'next/navigation'

// function Header() {
//     const router = useRouter()
//     return (
//         <>
//             <div>
//                 <div className='px-20 pt-4 h-50 bg-[#9FB3DF] flex justify-between'>
//                     <div className='flex-1 relative'>
//                         <div className='pl-10 pt-10'>
//                             <Menubar className='bg-[#9FB3DF] border-none shadow-none'>
//                                 <MenubarMenu>
//                                     <MenubarTrigger className='rounded-full bg-[#9FB3DF]'>
//                                         <Avatar>
//                                             <AvatarImage className="w-25 h-25 rounded-full border-1 object-cover" src="//robohash.org/seed" alt="ユーザーアバター" />
//                                         </Avatar>
//                                     </MenubarTrigger>
//                                     <MenubarContent>
//                                         <MenubarItem>
//                                             <button onClick={() => router.push("/mypage")}>
//                                                 <span>プロフィール</span>
//                                             </button>
//                                         </MenubarItem>
//                                         <MenubarItem>
//                                             投稿 Art
//                                         </MenubarItem>
//                                         <MenubarItem>
//                                             いいね欄一覧
//                                         </MenubarItem>
//                                         <MenubarItem>
//                                             設定
//                                         </MenubarItem>
//                                         <MenubarItem disabled>New Incognito Window</MenubarItem>
//                                         <MenubarSeparator />
//                                         <MenubarSub>
//                                             <MenubarSubTrigger>Share</MenubarSubTrigger>
//                                             <MenubarSubContent>
//                                                 <MenubarItem>X Link ...</MenubarItem>
//                                                 <MenubarItem>Pixiv Link ...</MenubarItem>
//                                                 <MenubarItem>Notes</MenubarItem>
//                                             </MenubarSubContent>
//                                         </MenubarSub>
//                                         <MenubarSeparator />
//                                         <MenubarItem>
//                                             Print... <MenubarShortcut>⌘P</MenubarShortcut>
//                                         </MenubarItem>
//                                         <MenubarItem>
//                                             <button onClick={() => router.push("/login")}>
//                                                 <span className='text-red-400'>ログアウト</span>
//                                             </button>
//                                         </MenubarItem>
//                                     </MenubarContent>
//                                 </MenubarMenu>
//                             </Menubar>

//                         </div>
//                         <div className="absolute bottom-0 left-0 flex">
//                             <div className="w-full bg-[#9FB3DF] hover:bg-[#7d8cad] border-1 flex items-center justify-center px-16 py-2 transition">
//                                 <Heart className="text-red-500 w-6 h-6" />
//                             </div>
//                             <div className="w-full bg-[#9FB3DF] hover:bg-[#7d8cad] border-1 flex items-center justify-center px-16 py-2 transition">
//                                 <Heart className="text-red-500 w-6 h-6" />
//                             </div>
//                             <div className="w-full bg-[#9FB3DF] hover:bg-[#7d8cad]  border-1 flex items-center justify-center px-16 py-2 transition">
//                                 <Heart className="text-red-500 w-6 h-6" />
//                             </div>
//                         </div>

//                     </div>
//                     <div className='edu-australia-font flex items-center text-5xl'>ArtLapus</div>
//                     <div className='flex-1 relative'>
//                         <div className='absolute right-0'>
//                             <SearchComponent />
//                         </div>
//                     </div>
//                 </div>

//             </div>

//         </>
//     )
// }

// export default Header
"use client"
import React, { useState } from 'react';
import { Search, Heart, Menu, User, Settings, LogOut, Share, ThumbsUp, Sun, Moon, Paperclip, PaperclipIcon, Hand } from 'lucide-react';
import { darkModeAtom } from "@/basic/atom"
import { useAtom } from "jotai"
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [ darkMode , setDarkMode] = useState<boolean>(false)
const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-indigo-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* モバイルメニューボタン */}
          <div className="flex md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-indigo-500 hover:bg-indigo-200 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>

          </div>
          
          {/* ナビゲーション - デスクトップ */}
          <div className="hidden md:flex space-x-8">
            <button className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md font-medium">
              <Heart className="inline w-5 h-5 mr-1" />
              <span>いいね</span>
            </button>
            <button className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md font-medium">
              <ThumbsUp className="inline w-5 h-5 mr-1" />
              <span>おすすめ</span>
            </button>
            <button className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md font-medium">
              <Share className="inline w-5 h-5 mr-1" />
              <span>シェア</span>
            </button>
            <button className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md font-medium">
              <Hand className="inline w-5 h-5 mr-1" />
              <span>投稿</span>
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* ロゴ */}
          <div className="flex justify-center">
            <Link href={"/arts"}>
            <h1 className="edu-australia-font text-3xl font-bold text-indigo-700">ArtLapus</h1>
            </Link>
          </div>
          
          {/* 右側セクション */}
          <div className="flex items-center space-x-4">
            {/* 検索 */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="作品を検索..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            {/* ユーザーメニュー */}
            <div className="relative">
              <button 
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={toggleMenu}
              >
                <img 
                  className="h-8 w-8 rounded-full border border-indigo-300" 
                  src="//robohash.org/seed" 
                  alt="ユーザーアバター" 
                />
              </button>
              
              {/* ドロップダウンメニュー */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                  <a href="/mypage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                    <User className="inline-block w-4 h-4 mr-2" />
                    プロフィール
                  </a>
                  <a href="/posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                    投稿 Art
                  </a>
                  <a href="/likes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                    いいね欄一覧
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">
                    <Settings className="inline-block w-4 h-4 mr-2" />
                    設定
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a href="/login" className="block px-4 py-2 text-sm text-red-500 hover:bg-indigo-100">
                    <LogOut className="inline-block w-4 h-4 mr-2" />
                    ログアウト
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* モバイル検索フォーム */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="作品を検索..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      {/* モバイルナビゲーションメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-inner pt-2 pb-3 border-t border-gray-200">
          <a href="#" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100">
            <Heart className="inline w-5 h-5 mr-2" />
            いいね
          </a>
          <a href="#" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100">
            <ThumbsUp className="inline w-5 h-5 mr-2" />
            おすすめ
          </a>
          <a href="#" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100">
            <Share className="inline w-5 h-5 mr-2" />
            シェア
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
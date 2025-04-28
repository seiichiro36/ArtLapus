"use client";
import React, { useState } from "react";
import {
  Search,
  Heart,
  Menu,
  User,
  Settings,
  LogOut,
  Share,
  ThumbsUp,
  Sun,
  Moon,
  Hand,
  Home,
  SlidersHorizontal,
  Lightbulb,
  Mail,
} from "lucide-react";
import { darkModeAtom } from "@/basic/atom";
import { useAtom } from "jotai";
import Link from "next/link";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from ".//ui/menubar";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import SearchFilterBar from "./Search";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const [ darkMode , setDarkMode] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [isOpen, setIsOpen] = useState(false);

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
            <button
              className="text-indigo-600 hover:text-indigo-800 px-3 py-2 rounded-md font-medium"
              onClick={() => router.push("/arts")}
            >
              <Home className="inline w-5 h-5 mr-1" />
              <span>ホーム</span>
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
          </div>

          {/* ロゴ */}
          <div className="flex justify-center">
            <Link href={"/arts"}>
              <h1 className="edu-australia-font text-3xl font-bold text-indigo-700">
                ArtLapus
              </h1>
            </Link>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                <SlidersHorizontal />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>モーダルタイトル</DialogTitle>
                <DialogDescription>
                  モーダルの説明文をここに入力します。
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <SearchFilterBar />
              </div>

              <DialogFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={() => setIsOpen(false)}>保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div> */}
          {/* 右側セクション */}
          <div className="flex items-center space-x-4">
            {/* 検索 */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="作品を検索..."
                  className="block w-full pl-5 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-center p-6"></div>
            <div>
              <Menubar className="bg-indigo-100  border-none shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="rounded-full bg-indigo-100 ">
                    <Avatar>
                      <AvatarImage
                        className="rounded-full border-1 object-cover"
                        src="//robohash.org/seed"
                        alt="ユーザーアバター"
                      />
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <button onClick={() => router.push("/mypage")}>
                        <span>プロフィール</span>
                      </button>
                    </MenubarItem>
                    <MenubarItem>投稿 Art</MenubarItem>
                    <MenubarItem>いいね欄一覧</MenubarItem>
                    <MenubarItem>設定</MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Share</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>X Link ...</MenubarItem>
                        <MenubarItem>Pixiv Link ...</MenubarItem>
                        <MenubarItem>Notes</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                      Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <div
                        className="flex justify-between w-full"
                        onClick={() => router.push("/login")}
                      >
                        <span>
                          <Lightbulb />
                        </span>
                        <span>ヒント</span>
                      </div>
                    </MenubarItem>
                    <MenubarItem>
                      <div
                        className="flex justify-between w-full"
                        onClick={() => router.push("/login")}
                      >
                        <span>
                          <Mail />
                        </span>
                        <span>リクエスト</span>
                      </div>
                    </MenubarItem>
                    <MenubarItem>
                      <div
                        className="flex justify-between w-full"
                        onClick={() => router.push("/login")}
                      >
                        <span>
                          <LogOut />
                        </span>
                        <span className="text-red-400">ログアウト</span>
                      </div>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-indigo-300 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* モバイル検索フォーム */}
      {/* <div className="md:hidden px-4 pb-4">
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
       */}
      {/* モバイルナビゲーションメニュー */}
      {/* {isMenuOpen && (
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
      )} */}
    </header>
  );
};

export default Header;

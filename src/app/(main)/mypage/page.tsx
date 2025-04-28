"use client";

import { useState } from "react";
import {
  Bell,
  User,
  Settings,
  Calendar,
  Heart,
  Moon,
  Sun,
  ChevronRight,
  Mail,
  Trophy,
  PaintbrushVerticalIcon,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { darkModeAtom } from "@/basic/atom";
import { useAtom } from "jotai";
import ArtworkGrid from "@/components/ArtworksGrid";
import ActivityCalendar from "@/components/ActivityCalendar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const notifications = [
    {
      id: 1,
      message: "新しいメッセージが届いています",
      time: "10分前",
      read: false,
    },
    {
      id: 2,
      message: "友達リクエストが3件あります",
      time: "1時間前",
      read: false,
    },
    {
      id: 3,
      message: "プロフィールが10回閲覧されました",
      time: "昨日",
      read: true,
    },
  ];

  const skillData = [
    { subject: "リーダーシップ", value: 80 },
    { subject: "コミュニケーション", value: 90 },
    { subject: "問題解決", value: 85 },
    { subject: "創造性", value: 70 },
    { subject: "技術スキル", value: 95 },
    { subject: "分析力", value: 80 },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ヘッダー */}
      {/* <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">マイページ</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </header> */}

      {/* 通知ドロワー */}
      {/* {showNotifications && (
        <div className={`fixed right-0 top-16 w-full md:w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-10 p-4`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">通知</h2>
            <button onClick={() => setShowNotifications(false)}>✕</button>
          </div>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${notification.read ? 'opacity-60' : ''} ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <p className={notification.read ? '' : 'font-semibold'}>{notification.message}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* アクティビティフィード */}
      <div className="flex justify-center w-full">
        <div
          className={`p-4 rounded-lg mt-10 w-full max-w-7xl flexshadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">最近のアクティビティ</h2>
          <div
            className={`space-y-3 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <div className="flex gap-2">
              <Heart size={18} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>プロジェクトを開始しました</p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  2025年4月20日
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Heart size={18} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>デザイン改善案にコメントしました</p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  2025年4月18日
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メインレイアウト */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* サイドバー */}
        <aside
          className={`md:w-64 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg shadow-md h-fit`}
        >
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    activeTab === "dashboard"
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
                  }`}
                >
                  <User size={18} />
                  <span>ダッシュボード</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("arts")}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    activeTab === "arts"
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
                  }`}
                >
                  <PaintbrushVerticalIcon size={18} />
                  <span>ARTS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    activeTab === "stats"
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
                  }`}
                >
                  <Trophy size={18} />
                  <span>スキルチャート</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    activeTab === "notifications"
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
                  }`}
                >
                  <Bell size={18} />
                  <span>通知</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-2 p-2 rounded-md ${
                    activeTab === "settings"
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-200"
                      : ""
                  }`}
                >
                  <Settings size={18} />
                  <span>設定</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <div className="flex-1">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* プロフィールと基本情報（横並び） */}
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 左側：プロフィール画像 */}
                  <div className="md:w-1/3">
                    <div className=" flex justify-center align-center">
                      <Avatar>
                        <AvatarImage
                          className="rounded-full border-1 object-cover"
                          src="//robohash.org/seed"
                          alt="ユーザーアバター"
                        />
                      </Avatar>
                    </div>
                    <button
                      className={`mt-3 w-full py-2 rounded-md text-center ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      画像を変更
                    </button>
                  </div>

                  {/* 右側：プロフィール情報 */}
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold">田中 太郎</h2>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      ソフトウェアエンジニア @ テック株式会社
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail
                          size={16}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span>user@example.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar
                          size={16}
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        />
                        <span>2023年入社</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-2 rounded-md ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white`}
                      >
                        プロフィール編集
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        共有
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* スキルチャートとアクティビティ（横並び） */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* レーダーチャート */}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h2 className="text-lg font-semibold mb-2">スキルグラフ</h2>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={80} data={skillData}>
                        <PolarGrid />
                        <PolarAngleAxis
                          dataKey="subject"
                          tick={{ fill: darkMode ? "#D1D5DB" : "#4B5563" }}
                        />
                        <Radar
                          name="スキル"
                          dataKey="value"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 近日予定 */}
                <div
                  className={`p-4 rounded-lg shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h2 className="text-lg font-semibold mb-2">近日の予定</h2>
                  <div className="space-y-2">
                    <div
                      className={`p-2 rounded-md ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">週間ミーティング</h3>
                        <ChevronRight size={16} />
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>2025/04/24 14:00</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-md ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">プロジェクト締め切り</h3>
                        <ChevronRight size={16} />
                      </div>
                      <div
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>2025/04/26</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ActivityCalendar />
            </div>
          )}

          {activeTab === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* レーダーチャート（大きめに表示） */}
              <div
                className={`md:col-span-2 p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">スキル分析</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={130} data={skillData}>
                      <PolarGrid />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: darkMode ? "#D1D5DB" : "#4B5563" }}
                      />
                      <Radar
                        name="スキル"
                        dataKey="value"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* スキル詳細 */}
              <div
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-4">スキルレベル</h2>
                <div className="space-y-4">
                  {skillData.map((skill, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{skill.subject}</h3>
                      <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${skill.value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{skill.value}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "arts" && <ArtworkGrid />}

          {activeTab === "notifications" && (
            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">通知一覧</h2>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  すべて既読
                </button>
              </div>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read ? "opacity-60" : ""
                    } ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className={notification.read ? "" : "font-semibold"}>
                          {notification.message}
                        </p>
                        <p
                          className={`text-xs ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {notification.time}
                        </p>
                      </div>
                      <button
                        className={`px-2 py-1 rounded-md text-xs ${
                          darkMode ? "bg-gray-600" : "bg-gray-200"
                        }`}
                      >
                        {notification.read ? "既読" : "未読"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">設定</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">表示名</label>
                  <input
                    type="text"
                    value="田中 太郎"
                    className={`w-full p-2 rounded-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    } border`}
                  />
                </div>
                <div>
                  <label className="block mb-1">メールアドレス</label>
                  <input
                    type="email"
                    value="user@example.com"
                    className={`w-full p-2 rounded-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    } border`}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>ダークモード</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full relative ${
                      darkMode ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute w-4 h-4 rounded-full bg-white top-1 transition-all ${
                        darkMode ? "right-1" : "left-1"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

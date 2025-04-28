import React, { useState } from "react";
import {
  format,
  eachDayOfInterval,
  subDays,
  getDay,
  isSameMonth,
} from "date-fns";
import { ja } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";

export default function ActivityCalendar() {
  // 現在の日付を取得
  const today = new Date();
  const lastYear = subDays(today, 365);

  // 過去1年間のデータを生成（ランダムなコントリビューション）
  const generateActivityData = () => {
    const data = {};
    const days = eachDayOfInterval({ start: lastYear, end: today });

    // 少ないコントリビューションを生成
    days.forEach((day) => {
      // 0〜4のランダムな値を生成（0=活動なし、4=最大活動）
      const random = Math.random();
      let activity;

      if (random < 0.8) {
        activity = 0; // 80%の確率で活動なし
      } else if (random < 0.9) {
        activity = 1; // 10%の確率で低活動
      } else if (random < 0.95) {
        activity = 2; // 5%の確率で中活動
      } else if (random < 0.98) {
        activity = 3; // 3%の確率で高活動
      } else {
        activity = 4; // 2%の確率で最高活動
      }

      data[format(day, "yyyy-MM-dd")] = activity;
    });

    return data;
  };

  const [activityData] = useState(generateActivityData());

  // 活動レベルに応じた色を取得
  const getColorByActivity = (activity) => {
    if (activity === 0) return "bg-gray-100";
    if (activity === 1) return "bg-green-100";
    if (activity === 2) return "bg-green-300";
    if (activity === 3) return "bg-green-500";
    return "bg-green-700";
  };

  // カレンダーデータを構築
  const buildCalendarData = () => {
    const days = eachDayOfInterval({ start: lastYear, end: today });

    // 曜日ごとのグリッドを作成（月、水、金のみ表示）
    const dayRows = {
      1: [], // 月曜
      3: [], // 水曜
      5: [], // 金曜
    };

    // 月のリストを作成
    const months = [];
    let currentMonth = null;

    // 日付をそれぞれの曜日の行に配置
    days.forEach((day) => {
      const dayOfWeek = getDay(day); // 0-6 (日-土)
      const dateString = format(day, "yyyy-MM-dd");
      const activity = activityData[dateString] || 0;

      // すべての曜日を7つの列に分ける
      const weekIndex = Math.floor(days.indexOf(day) / 7);

      // 月の変更を検出
      const monthName = format(day, "MMM", { locale: ja });
      if (!currentMonth || !isSameMonth(day, currentMonth.date)) {
        currentMonth = {
          name: monthName,
          date: day,
          index: weekIndex,
        };
        months.push(currentMonth);
      }

      // 月、水、金曜日のデータを保存
      if ([1, 3, 5].includes(dayOfWeek)) {
        // 必要に応じて空のセルを埋める
        while (dayRows[dayOfWeek].length < weekIndex) {
          dayRows[dayOfWeek].push(null);
        }

        dayRows[dayOfWeek].push({
          date: day,
          dateString,
          activity,
        });
      }
    });

    // 各行が同じ長さになるように調整
    const maxLength = Math.max(
      dayRows[1].length,
      dayRows[3].length,
      dayRows[5].length
    );

    Object.keys(dayRows).forEach((day) => {
      while (dayRows[day].length < maxLength) {
        dayRows[day].push(null);
      }
    });

    return { dayRows, months };
  };

  // 総コントリビューション数を計算
  const getTotalContributions = () => {
    return Object.values(activityData).filter((activity) => activity > 0)
      .length;
  };

  const { dayRows, months } = buildCalendarData();
  const totalContributions = getTotalContributions();

  // 曜日の表示名
  const weekdayNames = {
    1: "Mon",
    3: "Wed",
    5: "Fri",
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          {totalContributions} contributions in the last year
        </h3>
        <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1">
          Contribution settings <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      {/* 月ラベル */}
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="border-1">
          <div className="w-8"></div> {/* 曜日ラベルのスペース */}
          <div className="flex text-xs text-gray-600 mb-1">
            {months.map((month, index) => {
              // 月ごとの列数を計算
              const nextMonth = months[index + 1];
              const colSpan = nextMonth
                ? nextMonth.index - month.index
                : 53 - month.index;

              return (
                <div
                  key={index}
                  className="text-center"
                  style={{
                    width: `${colSpan * 15}px`,
                    marginRight: "8px",
                  }}
                >
                  {month.name}
                </div>
              );
            })}
          </div>
          {/* カレンダーグリッド */}
          <div className="space-y-2">
            {Object.keys(weekdayNames).map((dayNum) => (
              <div key={dayNum} className="flex items-center">
                <div className="w-8 text-xs text-gray-600 text-right pr-2">
                  {weekdayNames[dayNum]}
                </div>
                <div className="flex gap-1">
                  {dayRows[dayNum].map((cell, cellIndex) => (
                    <TooltipProvider key={cellIndex}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-3 h-3 rounded-sm ${
                              cell
                                ? getColorByActivity(cell.activity)
                                : "bg-gray-100"
                            }`}
                          ></div>
                        </TooltipTrigger>
                        {cell && (
                          <TooltipContent>
                            <p>
                              {format(cell.date, "yyyy年M月d日(E)", {
                                locale: ja,
                              })}
                              :{" "}
                              {cell.activity
                                ? `${cell.activity} コントリビューション`
                                : "コントリビューションなし"}
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 凡例とリンク */}
      <div className="flex justify-between mt-4 text-xs text-gray-600">
        <div>
          <a href="#" className="text-blue-600 hover:underline">
            Learn how we count contributions
          </a>
        </div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

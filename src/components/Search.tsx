import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarCheckboxItem
} from "@/components/ui/menubar";
import {
  Slider
} from "@/components/ui/slider";
import { Search, SlidersHorizontal, Tag, Star, Clock, Calendar } from "lucide-react";

export default function SearchFilterBar() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState("all");
  const [availability, setAvailability] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [discount, setDiscount] = useState(false);
  
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="w-full p-4 bg-slate-50 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <input
            className="w-full p-2 pl-10 border rounded-md"
            placeholder="キーワードを入力して検索..."
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <SlidersHorizontal size={16} className="mr-1" />
          <span>フィルター</span>
        </div>
      </div>

      <Menubar className="border-0 bg-white shadow-md rounded-md">
        <MenubarMenu>
          <MenubarTrigger className="font-medium">カテゴリ</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={category} onValueChange={setCategory}>
              <MenubarRadioItem value="all">すべて</MenubarRadioItem>
              <MenubarSeparator />
              <MenubarRadioItem value="electronics">電子機器</MenubarRadioItem>
              <MenubarRadioItem value="clothing">衣類</MenubarRadioItem>
              <MenubarRadioItem value="books">書籍</MenubarRadioItem>
              <MenubarRadioItem value="home">ホーム・キッチン</MenubarRadioItem>
              <MenubarRadioItem value="beauty">美容・健康</MenubarRadioItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>その他のカテゴリ</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarRadioItem value="sports">スポーツ・アウトドア</MenubarRadioItem>
                  <MenubarRadioItem value="toys">おもちゃ・ゲーム</MenubarRadioItem>
                  <MenubarRadioItem value="automotive">自動車・バイク</MenubarRadioItem>
                  <MenubarRadioItem value="pet">ペット用品</MenubarRadioItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium">価格帯</MenubarTrigger>
          <MenubarContent className="w-64 p-4">
            <div className="text-center mb-1">
              ¥{priceRange[0]} - ¥{priceRange[1] * 1000}
            </div>
            <Slider
              defaultValue={priceRange}
              max={100}
              step={1}
              onValueChange={handlePriceChange}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>¥0</span>
              <span>¥100,000</span>
            </div>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium">評価</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={rating} onValueChange={setRating}>
              <MenubarRadioItem value="all">すべての評価</MenubarRadioItem>
              <MenubarSeparator />
              <MenubarRadioItem value="4plus">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2">以上</span>
                </div>
              </MenubarRadioItem>
              <MenubarRadioItem value="3plus">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-gray-300 mr-1" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2">以上</span>
                </div>
              </MenubarRadioItem>
              <MenubarRadioItem value="2plus">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <Star className="w-4 h-4 text-gray-300 mr-1" />
                  <Star className="w-4 h-4 text-gray-300 mr-1" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="ml-2">以上</span>
                </div>
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium">並び替え</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={sortBy} onValueChange={setSortBy}>
              <MenubarRadioItem value="relevance">関連性</MenubarRadioItem>
              <MenubarRadioItem value="price-asc">価格：安い順</MenubarRadioItem>
              <MenubarRadioItem value="price-desc">価格：高い順</MenubarRadioItem>
              <MenubarRadioItem value="rating">評価の高い順</MenubarRadioItem>
              <MenubarRadioItem value="newest">最新順</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium">その他</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={availability}
              onCheckedChange={setAvailability}
            >
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>在庫あり</span>
              </div>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={featured}
              onCheckedChange={setFeatured}
            >
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span>おすすめ商品</span>
              </div>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={discount}
              onCheckedChange={setDiscount}
            >
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>セール中</span>
              </div>
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>配送日</span>
                </div>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarRadioGroup>
                  <MenubarRadioItem value="anytime">指定なし</MenubarRadioItem>
                  <MenubarRadioItem value="today">本日</MenubarRadioItem>
                  <MenubarRadioItem value="tomorrow">明日</MenubarRadioItem>
                  <MenubarRadioItem value="2days">2日以内</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-blue-600 font-medium">フィルターをクリア</MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <div className="mt-4 flex flex-wrap gap-2">
        {category !== "all" && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            カテゴリ: {category === "electronics" ? "電子機器" : category === "clothing" ? "衣類" : category === "books" ? "書籍" : category === "home" ? "ホーム・キッチン" : category === "beauty" ? "美容・健康" : category === "sports" ? "スポーツ・アウトドア" : category === "toys" ? "おもちゃ・ゲーム" : category === "automotive" ? "自動車・バイク" : "ペット用品"}
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
        {(priceRange[0] > 0 || priceRange[1] < 100) && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            価格: ¥{priceRange[0]} - ¥{priceRange[1] * 1000}
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
        {rating !== "all" && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            {rating === "4plus" ? "4★以上" : rating === "3plus" ? "3★以上" : "2★以上"}
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
        {availability && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            在庫あり
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
        {featured && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            おすすめ商品
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
        {discount && (
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
            セール中
            <button className="ml-2 text-blue-700 font-bold">×</button>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';

// サンプルタグリスト
const sampleTags = [
  "風景", "ポートレート", "抽象画", "現代アート", "油彩", "水彩画", 
  "デジタルアート", "イラスト", "写真", "スケッチ", "彫刻", "コラージュ"
];

// ランダムなタグを2〜4個生成する関数
const getRandomTags = () => {
  const shuffled = [...sampleTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
};

// サンプルアートワークデータを生成
const generateSampleArtworks = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `アートワーク #${i + 1}`,
    imageUrl: `https://picsum.photos/seed/${i + 1}/400/400`,
    videoUrl: i % 3 === 0 ? `https://example.com/video${i + 1}.mp4` : null,
    tags: getRandomTags(),
  }));
};

// カードコンポーネント
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md overflow-hidden bg-white ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-4 pt-4 pb-2">{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`font-bold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="px-4 pb-4">{children}</div>
);

// メインコンポーネント
const ArtworkGrid = () => {
  const [artworks] = useState(generateSampleArtworks(12));
  const [layoutOption, setLayoutOption] = useState("3");
  
  const handleClick = (artwork) => {
    console.log("アートワークがクリックされました:", artwork);
    // ここに詳細表示やモーダル表示の処理を追加
  };
  
  // レイアウトオプションに基づいてグリッドクラスを決定
  const getGridClass = () => {
    switch(layoutOption) {
      case "1": return "grid-cols-1";
      case "2": return "grid-cols-1 sm:grid-cols-2";
      case "3": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div></div>
          <h2 className="text-2xl font-bold text-gray-800">アートワーク</h2>
          <div className="flex items-center space-x-2">
            <label htmlFor="layout" className="text-sm text-gray-600">レイアウト:</label>
            <select 
              id="layout"
              value={layoutOption}
              onChange={(e) => setLayoutOption(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="1">1枚表示</option>
              <option value="2">2枚表示</option>
              <option value="3">3枚表示</option>
              <option value="4">4枚表示</option>
            </select>
          </div>
        </div>
        
        <div className={`grid ${getGridClass()} gap-6`}>
          {artworks.map((artwork) => (
            <Card key={artwork.id} className={`transform transition-transform hover:-translate-y-1
            ${getGridClass() === "grid-cols-1"  ? "m-30" : ""}`}>
              <div 
                className="aspect-square relative cursor-pointer"
                onClick={() => handleClick(artwork)}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                  {artwork.videoUrl && (
                    <div className="opacity-0 hover:opacity-100 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtworkGrid;
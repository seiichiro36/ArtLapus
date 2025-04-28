import React from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function XShareButton() {
  // シェアしたいコンテンツの情報
  const shareData = {
    title: "テスト",
    text: "テスト",
    url: "https://example.com/your-content"
  };

  // X(X)でシェアする関数
  const shareOnX = () => {
    // シェアするテキストとURL
    const text = encodeURIComponent(shareData.text);
    const url = encodeURIComponent(shareData.url);
    
    // Xのシェア用URL
    const XShareUrl = `https://X.com/intent/tweet?text=${text}&url=${url}`;
    
    // 新しいウィンドウでXのシェア画面を開く
    window.open(XShareUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="p-6">
      <Button 
        onClick={shareOnX}
        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
      >
        <Share2 size={18} />
        Xでシェア
      </Button>
    </div>
  );
}
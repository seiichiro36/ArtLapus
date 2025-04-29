"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Send, Sparkles, Moon, Sun, ZapIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AvantGardePostPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [mood, setMood] = useState(50);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [theme, setTheme] = useState('light');
  const [isPublic, setIsPublic] = useState(true);
  const [energy, setEnergy] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [error, setError] = useState(false);

  // パーティクルアニメーションの作成
  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 20) {
        const newParticle = {
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          duration: Math.random() * 5 + 3,
          color: getRandomColor()
        };
        setParticles(prev => [...prev, newParticle]);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [particles]);

  // 時間経過でパーティクルを削除
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (particles.length > 0) {
        setParticles(prev => prev.slice(1));
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [particles]);

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = () => {
    if (!title || !content || !category) {
      setError(true);
      return;
    }
    
    // 投稿処理をここに記述
    console.log({ title, content, category, isPublic, mood, energy, theme });
    
    // 成功アニメーション
    setError(false);
    setSubmitted(true);
    
    // たくさんのパーティクルを作成
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 15 + 5,
        duration: Math.random() * 5 + 3,
        color: getRandomColor()
      });
    }
    setParticles(newParticles);
    
    // フォームをリセット
    setTimeout(() => {
      setTitle('');
      setContent('');
      setCategory('');
      setMood(50);
      setEnergy(50);
      setIsPublic(true);
      setSubmitted(false);
      setActiveSection(0);
    }, 3000);
  };

  // テーマに基づいたバックグラウンドスタイル
  const getBgStyle = () => {
    if (theme === 'dark') {
      return 'bg-gradient-to-br from-gray-900 to-blue-900 text-white';
    } else if (theme === 'neon') {
      return 'bg-black text-green-400 border-green-400';
    } else if (theme === 'vintage') {
      return 'bg-amber-50 text-amber-900 border-amber-200';
    } else {
      return 'bg-white text-gray-800';
    }
  };

  // ムードに基づいたテキストエリアのスタイル
  const getMoodStyle = () => {
    const hue = (mood * 3.6) % 360; // 0-100 を 0-360 の色相に変換
    return {
      backgroundColor: `hsla(${hue}, 70%, 95%, 0.3)`,
      borderColor: `hsla(${hue}, 70%, 50%, 0.5)`,
      boxShadow: `0 0 15px hsla(${hue}, 70%, 50%, 0.3)`,
      transition: 'all 0.5s ease'
    };
  };

  // エネルギーに基づいたボタンのスタイル
  const getEnergyStyle = () => {
    const intensity = energy / 100;
    return {
      transform: `scale(${1 + intensity * 0.2})`,
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      animation: intensity > 0.7 ? 'pulse 2s infinite' : 'none'
    };
  };

  return (
    <div className={`min-h-screen p-4 ${getBgStyle()} relative overflow-hidden transition-all duration-700`}>
      {/* パーティクルアニメーション */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60 pointer-events-none animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8" />
            <span>創造の次元</span>
            <Sparkles className="h-8 w-8" />
          </h1>
          <p className="text-lg opacity-80">思考を解き放ち、新しい形の表現を創造しよう</p>
        </div>
        
        {/* 進行度インジケーター */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute h-1 bg-gray-300 top-1/2 left-0 right-0 -translate-y-1/2 z-0"></div>
          {[0, 1, 2, 3].map((step) => (
            <div 
              key={step}
              onClick={() => setActiveSection(step)}
              className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 cursor-pointer transition-all duration-300 ${
                activeSection >= step 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step + 1}
            </div>
          ))}
        </div>
        
        <Card className={`w-full p-6 backdrop-blur-md bg-opacity-80 ${getBgStyle()} transition-all duration-700 shadow-xl rounded-2xl relative overflow-hidden`}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>
                すべての必須項目を入力してください。
              </AlertDescription>
            </Alert>
          )}
          
          {submitted && (
            <Alert className="mb-6 bg-green-100 text-green-800 border-green-200">
              <Sparkles className="h-4 w-4" />
              <AlertTitle>創造完了！</AlertTitle>
              <AlertDescription>
                あなたの思考は宇宙に放たれました。
              </AlertDescription>
            </Alert>
          )}
                    
          {/* セクション1: タイトルと雰囲気設定 */}
          <div className={`transition-all duration-500 ${activeSection === 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="mb-8">
              <Label htmlFor="title" className="text-xl mb-2 flex items-center">
                <span className="mr-2">タイトル</span>
                <span className="text-sm opacity-70">(あなたの思考の核心)</span>
              </Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="ここに意識の結晶を..."
                className="w-full text-lg p-4 border-2 backdrop-blur bg-opacity-30"
              />
            </div>
            
            <div className="mb-8">
              <Label className="text-xl mb-2 flex items-center">
                <span className="mr-2">雰囲気</span>
                <span className="text-sm opacity-70">(感情の色合い)</span>
              </Label>
              <div className="flex items-center gap-4">
                <span className="opacity-70">冷静</span>
                <Slider
                  value={[mood]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => setMood(values[0])}
                  className="flex-1"
                />
                <span className="opacity-70">情熱的</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={() => setActiveSection(1)}
                className="text-lg px-6 py-6"
                style={getEnergyStyle()}
              >
                次へ進む
              </Button>
            </div>
          </div>
          
          {/* セクション2: コンテンツ入力 */}
          <div className={`transition-all duration-500 ${activeSection === 1 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="mb-8">
              <Label htmlFor="content" className="text-xl mb-2 flex items-center">
                <span className="mr-2">内容</span>
                <span className="text-sm opacity-70">(思考の本体)</span>
              </Label>
              <Textarea 
                id="content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="ここに意識の流れを..."
                className="min-h-48 w-full text-lg p-4 border-2 backdrop-blur bg-opacity-30"
                style={getMoodStyle()}
              />
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={() => setActiveSection(0)}
                variant="outline"
                className="text-lg"
              >
                戻る
              </Button>
              <Button
                onClick={() => setActiveSection(2)}
                className="text-lg px-6 py-6"
                style={getEnergyStyle()}
              >
                次へ進む
              </Button>
            </div>
          </div>
          
          {/* セクション3: カテゴリとテーマ選択 */}
          <div className={`transition-all duration-500 ${activeSection === 2 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="mb-8">
              <Label htmlFor="category" className="text-xl mb-2 flex items-center">
                <span className="mr-2">カテゴリー</span>
                <span className="text-sm opacity-70">(思考の分類)</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full text-lg p-4">
                  <SelectValue placeholder="領域を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="philosophy">哲学</SelectItem>
                  <SelectItem value="art">芸術</SelectItem>
                  <SelectItem value="science">科学</SelectItem>
                  <SelectItem value="culture">文化</SelectItem>
                  <SelectItem value="society">社会</SelectItem>
                  <SelectItem value="technology">テクノロジー</SelectItem>
                  <SelectItem value="dreams">夢想</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-8">
              <Label className="text-xl mb-2 flex items-center">
                <span className="mr-2">視覚テーマ</span>
                <span className="text-sm opacity-70">(表現の色調)</span>
              </Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {['light', 'dark', 'neon', 'vintage'].map((t) => (
                  <div
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`rounded-lg p-4 text-center cursor-pointer transition-all ${
                      theme === t ? 'ring-2 ring-blue-500 shadow-lg' : ''
                    } ${
                      t === 'light' ? 'bg-white text-black' :
                      t === 'dark' ? 'bg-gray-900 text-white' :
                      t === 'neon' ? 'bg-black text-green-400 border border-green-400' :
                      'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {t === 'light' && <Sun className="mx-auto mb-1 h-6 w-6" />}
                    {t === 'dark' && <Moon className="mx-auto mb-1 h-6 w-6" />}
                    {t === 'neon' && <ZapIcon className="mx-auto mb-1 h-6 w-6" />}
                    {t === 'vintage' && (
                      <div className="mx-auto mb-1 h-6 w-6 rounded-full border-2 border-amber-700"></div>
                    )}
                    <span className="text-sm">
                      {t === 'light' ? '光' :
                       t === 'dark' ? '闇' :
                       t === 'neon' ? '電脳' :
                       '古典'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={() => setActiveSection(1)}
                variant="outline"
                className="text-lg"
              >
                戻る
              </Button>
              <Button
                onClick={() => setActiveSection(3)}
                className="text-lg px-6 py-6"
                style={getEnergyStyle()}
              >
                次へ進む
              </Button>
            </div>
          </div>
          
          {/* セクション4: 最終設定と送信 */}
          <div className={`transition-all duration-500 ${activeSection === 3 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div className="mb-8">
              <Label className="text-xl mb-2 flex items-center">
                <span className="mr-2">エネルギー</span>
                <span className="text-sm opacity-70">(表現の強度)</span>
              </Label>
              <div className="flex items-center gap-4">
                <span className="opacity-70">静寂</span>
                <Slider
                  value={[energy]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => setEnergy(values[0])}
                  className="flex-1"
                />
                <span className="opacity-70">轟音</span>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center space-x-4 p-4 rounded-lg border backdrop-blur">
                <Switch 
                  id="public" 
                  checked={isPublic} 
                  onCheckedChange={setIsPublic} 
                />
                <div>
                  <Label htmlFor="public" className="text-lg">意識の共有</Label>
                  <p className="text-sm opacity-70">
                    {isPublic ? '全宇宙に開放' : '自己の領域に留める'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={() => setActiveSection(2)}
                variant="outline"
                className="text-lg"
              >
                戻る
              </Button>
              <Button
                onClick={handleSubmit}
                className="text-lg px-8 py-6 gap-2"
                style={getEnergyStyle()}
              >
                <Send className="h-5 w-5" />
                <span>放出する</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
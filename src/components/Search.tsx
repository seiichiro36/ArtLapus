"use client"

import { useState } from 'react';
import { Search, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log('検索クエリ:', searchQuery);
    // ここに検索ロジックを実装
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSearch} className="relative w-full">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="search"
            placeholder="検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex mt-2'>
          <div className='flex-1'>
            <Button
              type="submit"
              className="bg-[#5F99AE]  w-full hover:bg-[#336D82] text-white font-medium rounded-lg "
            >
              <span className="flex items-center justify-center h-5">検索</span>
            </Button>
          </div>
          <div className='flex-1 pl-1'>
            <Button
              type="submit"
              className="bg-[#5F99AE]  w-full hover:bg-[#336D82] text-white font-medium rounded-lg"
            >
              <List />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
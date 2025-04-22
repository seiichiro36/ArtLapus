'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { persistentEmailAtom } from '@/basic/atom';
import { useAtom } from 'jotai';


export const Resister = () => {
  const router = useRouter()
  const [userEmail,] = useAtom(persistentEmailAtom);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format. Please provide a valid email address." })
      .min(1, { message: "Email is required." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .max(20, { message: "Password must not exceed 20 characters." })
      .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
      .regex(/\d/, { message: "Password must include at least one number." })
      .regex(/[@$!%*?&]/, { message: "Password must include at least one special character (@$!%*?&)." }),
    username: z
      .string(),
    userId: z
      .string(),
    bio: z.string()
  });



  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    userId: '',
  });


  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  const [ProfileImage, setProfileImage] = useState<File | string>("");
  const [ProfileImageName, setProfileImageName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('おはようございます');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('こんにちは');
    } else {
      setGreeting('こんばんは');
    }
  }, []);

  // タグ追加
  const toggleTag = (tagId: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tagId)
        ? prevTags.filter(id => id !== tagId) // クリックされたタグを削除
        : [...prevTags, tagId]; // クリックされたタグを追加

      console.log("選択中のタグ:", newTags);
      return newTags;
    });
  };
  const tags = [
    { id: "illustration", label: "イラスト" },
    { id: "character", label: "キャラクター" },
    { id: "background", label: "背景" },
    { id: "animation", label: "アニメーション" },
    { id: "concept-art", label: "コンセプトアート" },
    { id: "fan-art", label: "ファンアート" }
  ];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      userId: "",
      bio: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values.email, values.password);
    console.log(values.username, values.userId);
    console.log(values.bio);

    console.log(selectedTags);
    // console.log(ProfileImage);


    router.push("/arts")
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImageURL: 'ファイルサイズは5MB以下にしてください' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {

        setPreviewUrl(reader.result);
        console.log(reader.result);

        // uploadProfileImage(file, "test1");

        setFormData({ ...formData, profileImageURL: file });
      };
      reader.readAsDataURL(file);
    }
    setProfileImage(file);
    setProfileImageName(file.name);

  };

  return (
    <div>
      <Card className="mt-15 w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{greeting}</CardTitle>
          <CardTitle className="text-2xl text-center">{userEmail}</CardTitle>
          <CardTitle className="text-2xl text-center">さん</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className='flex h-50'>
                <div className='w-2/3 pr-8'>
                  <div className=' flex justify-between'>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ユーザ名</FormLabel>
                          <FormControl>
                            <Input placeholder="User01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ユーザ ID</FormLabel>
                            <FormControl>
                              <Input placeholder="ArtLapus" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600" />
                          </FormItem>

                        )}
                      />
                    </div>
                  </div>
                  <div className=' mt-5'>
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ステータスメッセージ</FormLabel>
                          <FormControl>
                            <Textarea placeholder="ステータスメッセージを入力" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>


                <div className="w-1/3">
                  <Label htmlFor="profileImage">プロフィール画像</Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-20 file:py-2 file:px-13 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="プレビュー"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>タグを選択してください</Label>
                <div className="flex flex-wrap gap-2 mt-5">
                  {tags.map(tag => (
                    <div key={tag.id} className="flex items-center">
                      <Checkbox
                        id={tag.id}
                        checked={selectedTags.includes(tag.id)}
                        onCheckedChange={() => toggleTag(tag.id)}
                        className="hidden"
                      />
                      <Badge
                        variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                        // className={`cursor-pointer hover:bg-primary/90  ${selectedTags.includes(tag.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600}`}
                        className={`cursor-pointer hover:bg-primary/90 transition-colors px-3 py-1 rounded-md
                            ${selectedTags.includes(tag.id) ? "bg-[#3b5a9b] text-white" : "bg-gray-200 text-gray-600"}`}
                        onClick={() => toggleTag(tag.id)}
                      >
                        {tag.label}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTags.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    選択中のタグ: {selectedTags.length}個
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map(tagId => (
                      <Badge key={tagId} variant="secondary">
                        {tags.find(t => t.id === tagId)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-[#3b5a9b] hover:bg-[#1e3a78]">
                登録する
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
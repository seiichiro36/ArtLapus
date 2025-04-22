import LoginForm from "@/components/LoginForm";
import Link from "next/link";


export default function Home() {


  return (
    <>
    <Link href={"/login"}>ログインフォームに遷移</Link>
    </>
  );
}

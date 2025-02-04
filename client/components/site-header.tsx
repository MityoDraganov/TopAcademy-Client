import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5 py-2">
      <div className=" flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpeg"
            alt="Top Academy Logo"
            width={120}
            height={40}
          />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button>Get Started</Button>
        </nav>
      </div>
    </header>
  )
}


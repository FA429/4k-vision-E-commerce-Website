/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fUCJhPV2zcT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Textarea } from "@material-tailwind/react"
import { Button } from "@/components/ui/button"
import { NavbarDefault } from "@/components/Navbar"

export function ContactHera() {
  return (
    <>
    <NavbarDefault/>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" required type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea className="min-h-[120px]" id="message" placeholder="Enter your message" required />
            </div>
            <Button className="w-full bg-black" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 lg:items-start">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="space-y-1 text-gray-500 dark:text-gray-400">
              <p>123 Main St, Anytown USA</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <div className="flex items-center space-x-4">
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <FacebookIcon className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                <InstagramIcon className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props :any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
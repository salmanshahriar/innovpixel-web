"use client"

import { FacebookLogoIcon, TwitterLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";

export default function FooterDemo() {
  return (
    <footer className="h-screen text-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Stay Connected</h1>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          Follow us on social media and never miss an update. We’d love to stay in touch.
        </p>

        <div className="flex justify-center gap-6 text-2xl">
          <a href="#" className="hover:text-blue-500 transition">
            <FacebookLogoIcon size={32} weight="fill" />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <TwitterLogoIcon size={32} weight="fill" />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <InstagramLogoIcon size={32} weight="fill" />
          </a>
        </div>
      </div>

      <div className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} InnovPixel. All rights reserved.
      </div>
    </footer>
  );
}

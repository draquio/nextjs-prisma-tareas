"use client"

import Link from "next/link"

const Menu = () => {
  return (
    <nav className="flex h-20 justify-between items-center px-2 sm:px-0 ">
      <div className="text-3xl"><Link href={'/'}> Notas</Link></div>
      <div><Link href={'/new'}> Crear nuevo</Link></div>
    </nav>
  )
}

export default Menu

import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center border-b-2 px-20 py-3'>
        <h1 className='text-3xl font-bold'>Demo</h1>
       <Button>Sign In</Button>
    </div>
  )
}

export default Navbar
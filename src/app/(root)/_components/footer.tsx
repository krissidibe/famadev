import React from 'react' 
import Image from 'next/image';
import { Button } from '@/components/ui/button';
function Footer() {
  return (
    <div className="flex justify-between px-8 pb-2 text-white bg-black" >
          <Button className='text-xs text-white '  variant="link" size="sm" >
            FAMAMALI
          </Button>
          <Button className='text-xs text-white '  variant="link" size="sm" >
            Term & Conditions
          </Button>
    </div>
  )
}

export default Footer
'use client'
import { cn } from '@/lib/utils'
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { LayoutList, Share, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'
import MeetingModel from './MeetingModel'
import { toast } from 'sonner'
import { Button } from './ui/button'
type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right' | 'speaker-top' | 'speaker-buttom' | 'hidden'

const MeetingRoom = () => {
  const searchParams=useSearchParams();
  const isPersonalRoom=!!searchParams.get('personal')
  const [layout, setlayout] = useState<CallLayoutType>('speaker-left')
  const [showParticipants, setshowParticipants] = useState(false)
  const {useCallCallingState}= useCallStateHooks();
  const callingState=useCallCallingState();
  const [open,setOpen]=useState(true);
  const [copy,setCopy]=useState(false);
  const fullURL= typeof window !== 'undefined' ? window.location.href : '';
  if(callingState!==CallingState.JOINED) return <Loader/>
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition={'left'} />;
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'right'} />;
      case 'speaker-top':
        return <SpeakerLayout participantsBarPosition={'bottom'} />;
      case 'speaker-buttom':
        return <SpeakerLayout participantsBarPosition={'top'} />;
      default:
        return  <SpeakerLayout/>
    }
  }
  return (
    <section
      className='relative h-screen w-full overflow-hidden pt-4 text-white'
    >
      <div
        className='relative flex size-full items-center justify-center'
      >
        <div
          className='flex size-full max-w-[1000px] items-center'
        >
          <CallLayout />
          
          <MeetingModel
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        title="Meeting Created"
                        className="text-center"
                        handleClick={() => {
                            navigator.clipboard.writeText(fullURL)
                            toast.info('Link copied')
                            setOpen(false)
                        }}

                        img='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                        buttonText='Copy Meeting Link'

          />
          <MeetingModel
                        isOpen={copy}
                        onClose={() => setCopy(false)}
                        title="Copy the Meeting Link"
                        className="text-center cursor-pointer"

                        handleClick={() => {
                            navigator.clipboard.writeText(fullURL);
                            setCopy(false)
                            toast.info('Link copied')
                        }}

                        img='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                        buttonText='Copy Meeting Link'

          />
                    

        </div>
        <div
          className={cn('h-[calc(100vh-86px)]  ml-2  flex', { 'hidden': !showParticipants })}
        >
          <CallParticipantsList
            onClose={() => setshowParticipants(false)}
          />
          
        </div>
      </div>
      
      <div
        className='fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap '
      >
        <CallControls />
        <DropdownMenu>
        <div className='flex items-center'>
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList
              size={20}
              className='text-white'
            />
           
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent
          className='border border-gray-950 bg-gray-900 text-white '
        >
          {['grid', 'speaker-left', 'speaker-right','speaker-top','speaker-buttom'].map((item, index) => (
            <div key={index}>
              <DropdownMenuItem 
              className='cursor-pointer'
              onClick={()=>{
                setlayout(item.toLowerCase() as CallLayoutType)
              }}
              >
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
            </div>
          ))}
           <DropdownMenuItem 
              className='cursor-pointer'
              onClick={()=>{
                setlayout('hidden')
              }}
              >
                Hidden
              </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
      <CallStatsButton/>
      <button 
      onClick={()=>setshowParticipants((prev)=>!prev)}
      >
        <div
        className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
        >
          <User className='text-white' size={20}/>
        </div>

      </button>
          {isPersonalRoom&&
          <EndCallButton/>
          }
          <Button
            onClick={()=>setCopy(true)}
          className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
          >
            <Share/>
          </Button>
      </div>
            
    </section>
  )
}

export default MeetingRoom
"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)
  const call=useCall()
  useEffect(()=>{
    if(isMicCamToggledOn){
      call?.camera.disable();
      call?.microphone.disable();
      
    }else{
      call?.camera.enable();
      call?.microphone.enable();
    }
    
  },[isMicCamToggledOn,call])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
      <h1
      className='text-2xl font-bold'
      >
        Setup
      </h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label htmlFor="" className='flex items-center justify-center gap-2 font-medium'>
          <input type="checkbox" 
            name="" 
            id="" 
            checked={isMicCamToggledOn}
            onChange={(e)=>setisMicCamToggledOn(e.target.checked)}
           />
           Join With mic and camera off
        </label>
        <DeviceSettings
        />
      </div>
      <Button
      className='rounded-md bg-green-500 px-4 py-2.5 hover:bg-green-700'
      onClick={()=>{
        call?.join();
        setisSetupComplete(true);
      }}
      >
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
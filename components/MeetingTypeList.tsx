'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { Textarea } from './ui/textarea'
import Loader from './Loader'
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setvalues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setcallDetails] = useState<Call>()

    const createMeeting = async () => {
        if (!client || !user) {
            return;
        }
        try {
            if (!values.dateTime) {
                toast.error("Please select a date and time")
                return
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error("Failed to create a call")
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting"
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setcallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast.success("Meeting Created")
        } catch (error) {
            console.log(error)
            toast.error("Failed to create Meeting")
        }
    }
    if (!client || !user) return <Loader />;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                color='bg-orange-1'
                img='/icons/add-meeting.svg'
                alt='Meeting Add'
                title='New Meeting'
                desc='Start an instant meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                color='bg-blue-1'
                img='/icons/join-meeting.svg'
                alt='Join Meeting'
                title='Join Meeting'
                desc='via invitation link'
                handleClick={() => setMeetingState('isJoiningMeeting')}

            />
            <HomeCard
                color='bg-purple-1'
                img='/icons/schedule.svg'
                alt='Schedule Meeting'
                title='Schedule Meeting'
                desc='Plan your meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}

            />
            <HomeCard
                color='bg-yellow-1'
                img='/icons/recordings.svg'
                alt='View Recordings'
                title='View Recordings'
                desc='Meeting Recordings'
                handleClick={() => router.push('/recordings')}

            />
            {
                !callDetails ? (
                    <MeetingModel
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Create Meeting"
                        handleClick={createMeeting}
                    >
                        <div className="flex flex-col gap-2.5">
                            <label className="text-base font-normal leading-[22.4px] text-sky-2">
                                Add a description
                            </label>
                            <Textarea
                                className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                                onChange={(e) =>
                                    setvalues({ ...values, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex w-full flex-col gap-2.5">
                            <label className="text-base font-normal leading-[22.4px] text-sky-2">
                                Select Date and Time
                            </label>
                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => setvalues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                            />
                        </div>
                    </MeetingModel>
                ) : (

                    <MeetingModel
                        isOpen={meetingState === 'isScheduleMeeting'}
                        onClose={() => setMeetingState(undefined)}
                        title="Meeting Created"
                        className="text-center"
                        handleClick={() => {
                            navigator.clipboard.writeText(meetingLink)
                            toast.info('Link copied')
                        }}

                        img='/icons/checked.svg'
                        buttonIcon='/icons/copy.svg'
                        buttonText='Copy Meeting Link'

                    />
                )
            }
            <MeetingModel
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <MeetingModel
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setvalues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModel>
 
        </section>
    )
}

export default MeetingTypeList
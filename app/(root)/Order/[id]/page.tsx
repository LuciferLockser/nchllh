import { getRelatedTrainingsByCategory, getTrainingById } from '@/lib/actions/training.actions'
import { SearchParamProps } from '@/lib/types'
import React from 'react'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils'
import Collection from '@/components/ui/shared/Collection'
const TrainingDetails = async ({params:{id},searchParams}:SearchParamProps) => {
  const training = await getTrainingById(id)
  const relatedTrainings = await getRelatedTrainingsByCategory({
    categoryId: training.category._id,
    trainingId: training._id,
    page: searchParams.page as string,
  })
  return (
    <>
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl mt-5'>
        <Image src={training.imageUrl} alt='hero image' width={1000} height={1000} className='h-full min-h-[300px] object-cover object-center'/>
        <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
          <div className='flex flex-col gap-6'>
            <h2 className='h2-bold'>{training.title}</h2>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='flex gap-3'>
                <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>{training.isFree ? 'FREE' : `${training.price} Dt`}</p>
                <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>{training.category.name}</p>
              </div>
              <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>by{' '}
              <span className='text-primary-500'>{training.organizer.firstName} {training.organizer.lastName}</span>
              </p>
            </div>
          </div>
          
          <div className='flex flex-col gap-5'>
            <div className='flex gap-2 md:gap-3'>
            <Image src='/assets/icons/calendar.svg' alt='calendar' width={32} height={32}/>
            <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
              <p>
                {formatDateTime(training.startDateTime).dateOnly} - {' '} {formatDateTime(training.startDateTime).timeOnly}
                </p>
              <p>
              {formatDateTime(training.endDateTime).dateOnly} - {' '} {formatDateTime(training.endDateTime).timeOnly}
              </p>
              </div>
            </div>
            <div className='p-regular-20 flex items-center gap-3'>
            <Image src='/assets/icons/location.svg' alt='location' width={32} height={32}/>
            <p className='p-medium-16 lg:p-regular-20'>{training.location}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='p-bold-20 text-grey-600'>What You'll Learn :</p>
            <p className='p-medium-16 lg:p-regular-18'>{training.description}</p>
            <p className='p-medium-16 lg:p-regular-18 truncate text-primary-500 underline'>{training.url}</p>
          </div>
        </div>
      </div>
    </section>
    <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
      <h2 className='h2-bold'>Trainings with same category</h2>
      <Collection 
            data={relatedTrainings?.data}
            emptyTitle='No Trainings Found'
            emptyStateSubtext='Come back later'
            collectionType='All_Trainings'
            limit={6}
            page={1}
            totalPages={2}
            urlParamName={''}  
        />
    </section>
    </>
  )
}

export default TrainingDetails

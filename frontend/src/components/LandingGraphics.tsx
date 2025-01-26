import clock from '../assets/clock.svg'

export default function LandingGraphics(){

    return <div className='w-screen-full flex flex-row justify-start'>
                <div className='flex flex-col justify-center mt-[20vh]'>
                        <div className='h-[25vh] w-[30vh] -ml-[20vw] mt-[5vh] opacity-5 z-index-1'>
                            <img src={clock} />
                        </div>
                </div>
          </div>

}
import Link from "next/link";



export default function Hero() {


    return (
        <div
            style={{
                backgroundImage: `url(${'bg.avif'})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="flex justify-center items-center min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md w-full mx-auto">
                    <h3 className="text-2xl text-white font-bold min-[300px]:text-3xl sm:text-4xl md:text-4xl lg:text-4xl">My Trello Web</h3>

                    <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>

                    <div className="flex justify-center gap-3">

                        <Link href={"/"}>
                            <button className="px-6 py-3 flex items-center ease-out hover:bg-opacity-50 text-black bg-[#db85ff] duration-500 hover:bg-[#a86ccb] rounded-sm text-center font-bold h-10 text-base sm:text-lg md:text-xl">
                                About us
                            </button>
                        </Link>

                        <Link href={"/signup"}>
                            <button className="px-6 py-3 flex items-center ease-out hover:bg-opacity-50 text-black bg-[#db85ff] duration-500 hover:bg-[#a86ccb] rounded-sm text-center font-bold h-10 text-base sm:text-lg md:text-xl">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >


    )
}
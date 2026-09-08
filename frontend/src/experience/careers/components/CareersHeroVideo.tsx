
export function CareersHeroVideo() {
    return (
        <div className="relative">
            <video
                aria-label="Careers hero video"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[500px] object-cover"
            >
                <source src="/videos/robot-hero-video.mp4" type="video/mp4" />
            </video>

            <div className={'absolute inset-0 flex flex-col items-center justify-center gap-4 text-white text-center'}>
            <div className= 'absolute inset-0 bg-black/5' />

            <h1 className="text-6xl font-bold">
                Careers
            </h1>
            <p className={'text-xl'}>Build A World Of Amazing Abundance</p>
        </div>
        </div>
    );
}
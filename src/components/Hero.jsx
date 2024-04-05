import clsx from 'clsx'

const gradient = `linear-gradient(
  90deg,
  hsl(240deg 100% 20%) 0%,
  hsl(292deg 100% 21%) 10%,
  hsl(320deg 100% 30%) 20%,
  hsl(336deg 100% 39%) 30%,
  hsl(346deg 100% 46%) 40%,
  hsl(0deg 100% 50%) 50%,
  hsl(21deg 100% 50%) 60%,
  hsl(32deg 100% 50%) 70%,
  hsl(42deg 100% 50%) 80%,
  hsl(51deg 100% 50%) 90%,
  hsl(60deg 100% 50%) 100%
)`

export function ArmchairHero() {
  return (
    <div className={clsx('flex flex-col gap-8')}>
      <div className={clsx('w-full text-center text-7xl lg:text-9xl')}>
        <h1 className={clsx('font-heading')}>Armchair</h1>
      </div>
      <div
        className={clsx('flex flex-row items-center justify-between gap-4')}
      ></div>
      <div className={clsx('h-4')} style={{ backgroundImage: gradient }}></div>
      <div className={clsx('w-full text-center text-4xl lg:text-5xl')}>
        <h2 className="font-heading">Our Projects</h2>
      </div>
    </div>
  )
}

export function ArchetypeHero() {
  return (
    <div className={clsx('flex flex-col gap-8')}>
      <div className={clsx('w-full text-center text-7xl lg:text-9xl')}>
        <h1 className={clsx('font-heading')}>Archetype</h1>
      </div>
      <div className={clsx('h-4')} style={{ backgroundImage: gradient }}></div>
      <div className={clsx('w-full text-center text-4xl lg:text-5xl')}>
        <h2 className="font-heading">You wanted fan options?</h2>
      </div>
    </div>
  )
}

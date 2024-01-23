import Image from 'next/image';
import clsx from 'clsx';

import { Chakra_Petch } from 'next/font/google';
import atrocity from '../../public/atrocity.png';
import blackbird from '../../public/blackbird.png';
import breakneck from '../../public/breakneck.png';
import mantis from '../../public/mantis.png';
import mjolnir from '../../public/mjolnir.png';
import zephyr from '../../public/zephyr.png';

const chakra = Chakra_Petch({
  subsets: ['latin'],
  display: 'swap',
  weight: '500'
});

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
)`;


export function Hero () {
  return (
    <div className={clsx('flex flex-col gap-8')}>
      <div className={clsx('w-full text-center lg:text-9xl text-7xl')}>
        <h1 className={clsx(chakra.className)}>Archetype</h1>
      </div>
      <div className={clsx('flex flex-row items-center gap-4 justify-between')}>
        <div>
          <Image src={atrocity} alt="Atrocity" priority height={320} />
        </div>
        <div>
          <Image src={blackbird} alt="Blackbird" priority height={320} />
        </div>
        <div>
          <Image src={breakneck} alt="Breakneck" priority height={320} />
        </div>
        <div>
          <Image src={mantis} alt="Mantis" priority height={320} />
        </div>
        <div>
          <Image src={mjolnir} alt="Mjolnir" priority height={320} />
        </div>
        <div>
          <Image src={zephyr} alt="Zephyr" priority height={320} />
        </div>
      </div>
      <div className={clsx('h-4')} style={{ backgroundImage: gradient }}>

      </div>
      <div className={clsx('w-full text-center lg:text-5xl text-4xl', chakra.className)}>
        <p>You wanted fan options?</p>
      </div>
    </div>
  );
}

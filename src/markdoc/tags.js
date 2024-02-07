import { Callout } from '@/components/Callout';
import { QuickLink, QuickLinks } from '@/components/QuickLinks';
import { Button } from '@/components/Button';

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },

  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },

  video: {
    selfClosing: true,
    attributes: {
      src: { type: String },
    },
    render: ({ src }) => (
      <video controls loop>
        <source src={src} type={`video/${src.replace(/.*\.(.*)/g, '$1')}`} />
      </video>
    ),
  },

  'quick-links': {
    render: QuickLinks,
  },

  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },

  button: {
    selfClosing: false,
    render: ({ children, variant, className, ...props }) => (
      <Button className={className} variant={variant} {...props}>
        {children}
      </Button>
    ),
    attributes: {
      variant: {
        type: String,
        default: 'primary',
      },
      className: {
        type: String,
        default: '',
      },
      href: {
        type: String,
        default: undefined,
      }
    }
  }

  /*
   * use in templates as {% bom: type="BOM" /%}
   * @todo finish this method
   */
  // bom: {
  //   selfClosing: true,
  //   attributes: {
  //     tab: { type: String },
  //   },
  //   render: async ({ tab }) => {
  //
  //     return (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th></th>
  //           </tr>
  //         </thead>
  //       </table>
  //     );
  //   }
  // }
};

export default tags;

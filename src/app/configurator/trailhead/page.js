'use client';

import { DocsHeader } from '@/components/DocsHeader';
import { Prose } from '@/components/Prose';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Trailhead } from '@/app/configurator/trailhead/config';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import { downloadZip } from 'client-zip';

const isset = (object, property) => Object.prototype.hasOwnProperty.call(object || {}, property)
// @todo just remove the numeric lengths and use the strings

const BASE_URI = 'https://raw.githubusercontent.com/Armchair-Heavy-Industries/Trailhead-XY-Joints/main/'


const getSelectedFiles = (selections, mods) => {
  const files = []

  Object.keys(selections).forEach((type) => {
    const definition = Trailhead.components[type].options[selections[type]];
    const selected = selections[type];

    if (isset(definition.files, 'generic')) {
      const generics = definition.files.generic

      // check for mods
      Object.keys(definition.files.generic).forEach((component_type) => {
        if (isset(mods, type) && mods[type] !== null && isset(Trailhead.components[type].mods[mods[type]].files[selected].generic, component_type)) {
          generics[component_type] = Trailhead.components[type].mods[mods[type]].files[selected].generic[component_type]
        }
      })

      // condense to just a list of strings
      Object.keys(generics).forEach((key) => {
        if (generics[key] !== '') {
          files.push(generics[key]);
        }
      });
    }
  })
  
  return files;
}

const downloadBlob = (blob, name) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

const download = async (files) => {
  const downloads = files.map((file) => {
    const extension = file.split('.').pop();
    console.warn(extension);
    if (extension === 'dxf') {
      // Use a different fetch method for .dxf files
      console.warn(`found dxf ${file}`);
      return fetch(`${BASE_URI}/${file}`);
    } else {
      // Use the existing fetch method for .stl files
      return fetch(`${BASE_URI}/${file}.stl`);
    }
  });
  const responses = await Promise.all(downloads);

  if (responses.some((res) => !res.ok)) {
    throw new Error('Some files failed to download');
  }

  const blob = await downloadZip(responses).blob();
  downloadBlob(blob, 'trailhead.zip');
}

export default function Page() {
  const [selections, setSelections] = useState({});
  const [mods, setMods] = useState({});

  const defaultStateClass = 'bg-gray-700';
  const defaultStateHoverClass = 'hover:bg-gray-800';
  const selectedItemClass = 'bg-indigo-600';
  const disabledStateClass = 'bg-gray-400';



  // remove/unselect invalid components
  useEffect(
    () => {
      Object.keys(selections).forEach((type) => {
        Object.keys(Trailhead.components[type].options).forEach((component_name) => {
          const selector = document.querySelector(`#${component_name}`);

          if (selector && selector.disabled && selections[type] === component_name) {
            delete selections[type];

            setSelections(selections);
            selector.classList.remove(selectedItemClass)
            selector.classList.add(defaultStateClass)
          }
        })
      })
    },
    [selections]
  )

  // remove mods if irrelevant
  useEffect(
    () => {
      Object.keys(selections).forEach((type) => {
        Object.keys(Trailhead.components[type].mods).forEach((mod_name) => {
          Object.keys(Trailhead.components[type].mods[mod_name].files).forEach((component_override) => {
            if (selections[type] !== component_override) {
              setMods((m) => {
                delete m[type];

                return m;
              })
            }
          })
        })
      })
    },
    [selections]
  )

  return (
    <>
      <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <DocsHeader title="Choose your own adventure" />

          <Prose>
            {Object.keys(Trailhead.components).map((name) => (
              <div key={name}>
                <h2>{Trailhead.components[name].label}</h2>

                <div className={clsx('grid grid-cols-2 gap-4')}>
                  {Object.keys(Trailhead.components[name].options).map((component_name) => (
                    <button
                      id={component_name}
                      key={component_name}
                      data-component={name}
                      value={component_name}
                      className={clsx(
                        'rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm',
                        selections[name] === component_name ? selectedItemClass : `${defaultStateClass} ${defaultStateHoverClass}`,
                      )}
                      onClick={() => {
                        setSelections({
                          ...selections,
                          [name]: component_name
                        });


                      }}
                    >
                      {Trailhead.components[name].options[component_name].label}
                    </button>
                  ))}
                </div>

                <div
                  className={clsx('flex gap-4')}
                >
                  {Object.keys(Trailhead.components[name].mods).map((mod_name, idx) => (
                    <Fragment key={idx}>
                      {idx === 0 ?
                        <div
                          className={clsx(
                            // if there is a mod with the selected components name, show it
                            { 'hidden': !isset(Trailhead.components[name].mods[mod_name].files, selections[name]) }
                          )}
                        >
                          <label className={clsx('cursor-pointer')}>
                            <input
                              type='radio'
                              key={`${idx}_none`}
                              name={`${name}_mods`}
                              className={clsx('rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mr-2')}
                              checked={!isset(mods, name) || mods[name] === null}
                              onChange={() => setMods({ [name]: null })}
                            />
                            No Mod
                          </label>
                        </div>
                        : null
                      }
                      <div
                        className={clsx(
                          // if there is a mod with the selected components name, show it
                          { 'hidden': !isset(Trailhead.components[name].mods[mod_name].files, selections[name]) }
                        )}
                      >
                        <label className={clsx('cursor-pointer')}>
                          <input
                            type='radio'
                            key={idx}
                            value={mod_name}
                            name={`${name}_mods`}
                            className={clsx('rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mr-2')}
                            checked={mods[name] === mod_name || false}
                            onChange={() => setMods({ [name]: mod_name })}
                          />
                          {Trailhead.components[name].mods[mod_name].label}
                        </label>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </Prose>
        </article>

        <div className={clsx('flex mt-8 gap-4')}>
          <button
            type="button"
            disabled={Object.keys(selections).length !== Object.keys(Trailhead.components).length}
            className={clsx(
              'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm',
              'disabled:cursor-not-allowed disabled:bg-indigo-800 bg-indigo-500 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            )}
            onClick={() => { download(getSelectedFiles(selections, mods)) }}
          >
            Download
          </button>
          <button
            type="button"
            disabled={Object.keys(selections).length === 0}
            className={clsx(
              'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm',
              'disabled:cursor-not-allowed disabled:bg-gray-400 bg-gray-700 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700'
            )}
            onClick={() => { setSelections({}); setMods({}); }}
          >
            Reset
          </button>
        </div>

        <PrevNextLinks />
      </div>
    </>
  )
}

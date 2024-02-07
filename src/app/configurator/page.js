'use client';

import { DocsHeader } from '@/components/DocsHeader';
import { Prose } from '@/components/Prose';
import { PrevNextLinks } from '@/components/PrevNextLinks';
import { Archetype } from '@/app/configurator/config';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import { downloadZip } from 'client-zip';

const isset = (object, property) => Object.prototype.hasOwnProperty.call(object || {}, property)
// @todo just remove the numeric lengths and use the strings
const getLength = (length) => {
  switch (length) {
    case typeof length === 'string':
      return length
    case 1:
      return 'short'
    case 2:
      return 'medium'
    case 3:
      return 'long'
  }
}

const BASE_URI = 'https://raw.githubusercontent.com/Armchair-Engineering/Archetype/main'

const getSelectedFiles = (selections, mods, useSpacer) => {
  const files = []
  let length = Archetype.components.hotends.options[selections.hotends].length;

  // special logic for spacer ducts
  if (useSpacer) {
    length -= 1;
    files.push(Archetype.components.probes.mods.spacer.files.spacer.generic.spacer)
  }

  length = getLength(length);

  Object.keys(selections).forEach((type) => {
    const definition = Archetype.components[type].options[selections[type]];
    const selected = selections[type];

    if (isset(definition.files, 'generic')) {
      const generics = definition.files.generic

      // check for mods
      Object.keys(definition.files.generic).forEach((component_type) => {
        if (isset(mods, type) && mods[type] !== null && isset(Archetype.components[type].mods[mods[type]].files[selected].generic, component_type)) {
          generics[component_type] = Archetype.components[type].mods[mods[type]].files[selected].generic[component_type]
        }
      })

      // condense to just a list of strings
      Object.keys(generics).forEach((key) => files.push(generics[key]))
    }

    if (isset(definition.files, 'lengths')) {
      Object.keys(definition.files.lengths[length]).forEach((key) => files.push(definition.files.lengths[length][key]))
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
  const downloads = files.map((file) => fetch(`${BASE_URI}/${file}.stl`));
  const responses = await Promise.all(downloads);

  if (responses.some((res) => !res.ok)) {
    throw new Error('Some files failed to download');
  }

  const blob = await downloadZip(responses).blob();
  downloadBlob(blob, 'archetype.zip');
}

export default function Page () {
  const [selections, setSelections] = useState({});
  const [mods, setMods] = useState({});
  const [length, setLength] = useState(null);
  const [fitment, setFitment] = useState(null);
  const [useSpacer, setUseSpacer] = useState(false);

  // find any components with length restrictions
  useEffect(
    () => {
      Object.keys(Archetype.components).forEach((value) => {
        Object.keys(Archetype.components[value].options).forEach((v) => {
          if (isset(Archetype.components[value].options[v], 'lengths')) {
            const selector = document.querySelector(`#${v}`);

            if (! Archetype.components[value].options[v].lengths.includes(length)) {
              selector.disabled = true
              selector.classList.add('bg-white/5', 'cursor-not-allowed')
              selector.classList.remove('bg-white/10', 'hover:bg-white/20')
            } else {
              selector.disabled = false
              selector.classList.add('bg-white/10', 'hover:bg-white/20')
              selector.classList.remove('bg-white/5', 'cursor-not-allowed')
            }
          }

          if (isset(Archetype.components[value].options[v], 'fitments')) {
            const selector = document.querySelector(`#${v}`);

            if (! Archetype.components[value].options[v].fitments.includes(fitment)) {
              selector.disabled = true
              selector.classList.add('bg-white/5')
              selector.classList.remove('bg-white/10', 'hover:bg-white/20')
            } else {
              selector.disabled = false
              selector.classList.add('bg-white/10', 'hover:bg-white/20')
              selector.classList.remove('bg-white/5')
            }
          }
        })
      })
    },
    [length, fitment]
  )

  // remove/unselect invalid components
  useEffect(
    () => {
      Object.keys(selections).forEach((type) => {
        Object.keys(Archetype.components[type].options).forEach((component_name) => {
          const selector = document.querySelector(`#${component_name}`);

          if (selector && selector.disabled && selections[type] === component_name) {
            delete selections[type];

            setSelections(selections);
            selector.classList.remove('border-indigo-600')
            selector.classList.add('border-transparent')
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
        Object.keys(Archetype.components[type].mods).forEach((mod_name) => {
          Object.keys(Archetype.components[type].mods[mod_name].files).forEach((component_override) => {
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
            {Object.keys(Archetype.components).map((name) => (
              <div key={name}>
                <h2>{Archetype.components[name].label}</h2>

                <div className={clsx('grid grid-cols-2 gap-4')}>
                  {Object.keys(Archetype.components[name].options).map((component_name) => (
                    <button
                      id={component_name}
                      key={component_name}
                      data-component={name}
                      value={component_name}
                      className={clsx(
                        'rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 border',
                        selections[name] === component_name ? 'border-indigo-600': 'border-transparent',
                      )}
                      onClick={() => {
                        setSelections({
                          ...selections,
                          [name]: component_name
                        });

                        if (isset(Archetype.components[name].options[component_name], 'length')) {
                          setLength(Archetype.components[name].options[component_name].length)
                        }

                        if (isset(Archetype.components[name].options[component_name], 'spacer')) {
                          setUseSpacer(Archetype.components[name].options[component_name].spacer)
                        }

                        if (isset(Archetype.components[name].options[component_name], 'fitment')) {
                          setFitment(Archetype.components[name].options[component_name].fitment)
                        }
                      }}
                    >
                      {Archetype.components[name].options[component_name].label}
                    </button>
                  ))}
                </div>

                <div
                  className={clsx('flex gap-4')}
                >
                  {Object.keys(Archetype.components[name].mods).map((mod_name, idx) => (
                    <Fragment key={idx}>
                      {idx === 0 ?
                        <div
                          className={clsx(
                            // if there is a mod with the selected components name, show it
                            { 'hidden': !isset(Archetype.components[name].mods[mod_name].files, selections[name])}
                          )}
                        >
                          <label className={clsx('cursor-pointer')}>
                            <input
                              type='radio'
                              key={`${idx}_none`}
                              name={`${name}_mods`}
                              className={clsx('rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mr-2')}
                              checked={!isset(mods, name) || mods[name] === null}
                              onChange={() => setMods({[name]: null})}
                            />
                            No Mod
                          </label>
                        </div>
                        : null
                      }
                      <div
                        className={clsx(
                          // if there is a mod with the selected components name, show it
                          { 'hidden': !isset(Archetype.components[name].mods[mod_name].files, selections[name])}
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
                            onChange={() => setMods({[name]: mod_name})}
                          />
                          {Archetype.components[name].mods[mod_name].label}
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
            disabled={Object.keys(selections).length !== Object.keys(Archetype.components).length}
            className={clsx(
              'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm',
              Object.keys(selections).length !== Object.keys(Archetype.components).length ? 'bg-indigo-950 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            )}
            onClick={() => { download(getSelectedFiles(selections, mods, useSpacer)) }}
          >
            Download
          </button>
          <button
            type="button"
            disabled={Object.keys(selections).length === 0}
            className={clsx(
              'rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm',
              Object.keys(selections).length === 0 ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700'
            )}
            onClick={() => { setSelections({}); setMods({}); setFitment({}); setLength({}); }}
          >
            Reset
          </button>
        </div>

        <PrevNextLinks />
      </div>
    </>
  )
}

export const Archetype = {
  order: [
    'carriage',
    'hotend',
    'spacer',
    'duct',
    'extruder',
    'probe',
  ],

  components: {
    carriage: {
      label: 'Carriage',
      options: {
        mgn9h: {
          label: 'MGN9H',
          files: {
            generic: {
              left: 'Archetype Core/Rail Mount/MGN9/mgn9_left',
              right: 'Archetype Core/Rail Mount/MGN9/mgn9_right',
              clip: 'Archetype Core/Rail Mount/[a]_belt_clamp_pair'
            },
          }
        },
        mgn12h: {
          label: 'MGN12H',
          files: {
            generic: {
              left: 'Archetype Core/Rail Mount/MGN12/mgn12_left',
              right: 'Archetype Core/Rail Mount/MGN12/mgn12_right',
              clip: 'Archetype Core/Rail Mount/[a]_belt_clamp_pair',
            },
          },
        },
      },
      mods: {
        cpc: {
          label: 'CPC Carriage',
          files: {
            mgn12h: {
              generic: {
                clip: 'Archetype Core/Rail Mount/MGN12/CPC Rail Only/[a]_cpc_mgn12_belt_clamp_pair',
              },
            }
          }
        },
      }
    },
    hotends: {
      label: 'Hotend',
      options: {
        chube: {
          label: 'Chube - Waterheater',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/chube_mount'
            },
          },
          length: 3,
        },
        goliath: {
          label: 'Vz Goliath',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/goliath_mount'
            },
          },
          length: 3,
        },
        rapido_hf: {
          label: 'Rapido HF',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/rapido_mount'
            },
          },
          length: 1,
        },
        rapido_uhf: {
          label: 'Rapido UHF',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/rapido_mount'
            },
          },
          length: 2,
        },
        dragon_uhfmini: {
          label: 'Dragon UFH Mini',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/dragon_uhf_mount'
            },
          },
          length: 1,
        },
        dragon_uhf: {
          label: 'Dragon UHF',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/dragon_uhf_mount'
            },
          },
          length: 2,
        },
        volqmosq: {
          label: 'VolqMosq',
          files: {
            generic: {
              _: 'Archetype Core/Hotend Mounts/volcmosq_mount'
            },
          },
          length: 1,
        },
      },
      mods: {},
    },
    ducts: {
      label: 'Ducts',
      options: {
        atrocity: {
          label: 'Atrocity',
          files: {
            generic: {
              cover: 'Archetype - Atrocity/Fan Covers/[a]_atrocity_fan_cover',
              duct_left: 'Archetype - Atrocity/atrocity_duct_left',
              duct_right: 'Archetype - Atrocity/atrocity_duct_right',
              holder_left: 'Archetype - Atrocity/atrocity_holder_left',
              holder_right: 'Archetype - Atrocity/atrocity_holder_right',
            },
          },
          lengths: [3],
          fitment: 1,
          spacer: true,
        },
        blackbird: {
          label: 'Blackbird',
          files: {
            generic: {
              cover: 'Archetype - Blackbird/[a]_blackbird_fan_cover',
            },
            lengths: {
              medium: {
                left: 'Archetype - Blackbird/medium/blackbird_medium_left',
                left_rear: 'Archetype - Blackbird/medium/blackbird_medium_left_rear',
                right: 'Archetype - Blackbird/medium/blackbird_medium_right',
                right_rear: 'Archetype - Blackbird/medium/blackbird_medium_right_rear',
              },
              short: {
                left: 'Archetype - Blackbird/short/blackbird_short_left',
                left_rear: 'Archetype - Blackbird/short/blackbird_short_left_rear',
                right: 'Archetype - Blackbird/short/blackbird_short_right',
                right_rear: 'Archetype - Blackbird/short/blackbird_short_right_rear',
              },
            }
          },
          lengths: [1, 2],
          fitment: 1,
        },
        breakneck: {
          label: 'Breakneck',
          files: {
            generic: {
              cover: 'Archetype - Breakneck/Fan Covers/[a]_breakneck_fan_cover',
              adaptor: 'Archetype - Breakneck/removable_hose_attachment',
            },
            lengths: {
              short: { _: 'Archetype - Breakneck/breakneck_short' },
              medium: { _: 'Archetype - Breakneck/breakneck_medium' },
              long: { _: 'Archetype - Breakneck/breakneck_long' },
            },
          },
          lengths: [1, 2, 3],
          fitment: 2,
        },
        // mantis: {
        //   label: 'Mantis',
        //   files: {
        //     generic: {
        //       cover: '',
        //     },
        //     lengths: {
        //
        //     },
        //   },
        // },
        mjolnir: {
          label: 'Mjölnir',
          files: {
            generic: {
              cover: 'Archetype - Mjolnir/Fan Covers/[a]_mjolnir_fan_cover',
            },
            lengths: {
              short: {
                left: 'Archetype - Mjolnir/mjolnir_medium_left',
                right: 'Archetype - Mjolnir/mjolnir_medium_right',
              },
              medium: {
                left: 'Archetype - Mjolnir/mjolnir_long_left',
                right: 'Archetype - Mjolnir/mjolnir_long_right',
              },
              long: {
                left: 'Archetype - Mjolnir/mjolnir_long_left',
                right: 'Archetype - Mjolnir/mjolnir_long_right',
              },
            },
          },
          lengths: [2, 3],
          fitment: 1,
          spacer: true,
        },
        zephyr: {
          label: 'Zephyr',
          files: {
            generic: {},
            lengths: {
              short: {
                left: 'Archetype - Zephyr/Short/zephyr_short_left',
                right: 'Archetype - Zephyr/Short/zephyr_short_right',
              },
              medium: {
                left: 'Archetype - Zephyr/Medium/zephyr_medium_left',
                right: 'Archetype - Zephyr/Medium/zephyr_medium_right',
              },
              long: {
                left: 'Archetype - Zephyr/Long/zephyr_long_left',
                right: 'Archetype - Zephyr/Long/zephyr_long_right',
              },
            },
          },
          lengths: [1, 2, 3],
          fitment: 1,
        },
      },
      mods: {},
    },
    extruders: {
      label: 'Extruder',
      options: {
        sherpa_micro: {
          label: 'Annex Sherpa Micro - Micro-bowden',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/Breakneck Blocks/[a]_microbowden_micro-sherpa' },
            },
          fitments: [1, 2],
        },
        sherpa_mini: {
          label: 'Annex Sherpa Mini - Flat-top',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/[a]_flat_sherpa_mini' },
            },
          fitments: [1],
        },
        orbiter_2: {
          label: 'Orbiter 2 - Micro-bowden',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/Breakneck Blocks/[a]_microbowden_orbiter2' },
            },
          fitments: [1, 2],
        },
        // kyro: {
        //   label: 'Armchair Engineering Kyro',
        //   files: {
        //     generic: {
        //       _: 'Archetype Core/Extruders/Breakneck Blocks/[a]_integrated_kyro' },
        //     },
        //   fitments: [1, 2],
        // },
        // escapement: {
        //   label: 'Armchair Engineering Escapement',
        //   files: { generic: { _: 'Archetype Core/Extruders/' } },
        // },
        // sharketype: {
        //   label: 'Armchair Engineering Sharketype',
        //   files: { generic: { _: 'Archetype Core/Extruders/' } },
        // },
        bowden: {
          label: 'Bowden',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/[a]_bowden' },
            },
          fitments: [1, 2],
        },
        vz_hextrudort_low: {
          label: 'Vz Hex. Breakneck - Micro-bowden',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/Breakneck Blocks/[a]_microbowden_vz-hextrudort' },
            },
          fitments: [1, 2],
        },
        vz_hextrudort: {
          label: 'Vz Hextrudort - Flat-top',
          files: {
            generic: {
              _: 'Archetype Core/Extruders/[a]_flat_vz-hextrudort' },
            },
          fitments: [1],
        },
      },
      mods: {},
    },
    probes: {
      label: 'Probe',
      options: {
        klicky_pcb: {
          label: 'Klicky PCB',
          files: {
            lengths: {
              short: { _: 'Archetype Core/Probes/KlickyPCB/[a]_klicky_pcb_short' },
              medium: { _: 'Archetype Core/Probes/KlickyPCB/[a]_klicky_pcb_medium' },
              long: { _: 'Archetype Core/Probes/KlickyPCB/[a]_klicky_pcb_long' },
            },
          },
        },
        euclid: {
          label: 'Euclid',
          files: {
            lengths: {
              short: { _: 'Archetype Core/Probes/Euclid/[a]_euclid_short' },
              medium: { _: 'Archetype Core/Probes/Euclid/[a]_euclid_medium' },
              long: { _: 'Archetype Core/Probes/Euclid/[a]_euclid_long' },
            },
          },
        },
        klicky: {
          label: 'Klicky',
          files: {
            lengths: {
              short: { _: 'Archetype Core/Probes/Klicky/[a]_klicky_short' },
              medium: { _: 'Archetype Core/Probes/Klicky/[a]_klicky_medium' },
              long: { _: 'Archetype Core/Probes/Klicky/[a]_klicky_long' },
            },
          },
        },
        beacon: {
          label: 'Beacon',
          files: {
            lengths: {
              short: { _: 'Archetype Core/Probes/Beacon/[a]_beacon_short' },
              medium: { _: 'Archetype Core/Probes/Beacon/[a]_beacon_medium' },
              long: { _: 'Archetype Core/Probes/Beacon/[a]_beacon_long' },
            },
          },
        },
      },
      mods: {
        spacer: {
          label: 'Probe Spacer',
          files: {
            spacer: {
              generic: {
                spacer: 'Archetype Core/Probes/[a]_fan_splitter_spacer',
              },
            },
          },
        },
      },
    },
  }
};

export default { Archetype };

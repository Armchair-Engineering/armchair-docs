export const Trailhead = {
  order: [
    'rail',
  ],

  components: {
    carriage: {
      label: 'Rail Size',
      options: {
        ninetwentytwentyplastic: {
          label: '9MM 2020 extrusion',
          files: {
            generic: {
              left_b: 'STLs/9mm/2020%209mm%20Trailhead%20-%20XY%20Joint%20-%20Left%20Bottom',
              left_t: 'STLs/9mm/2020%209mm%20Trailhead%20-%20XY%20Joint%20-%20Left%20Top',
              right_b: 'STLs/9mm/2020%209mm%20Trailhead%20-%20XY%20Joint%20-%20Right%20Bottom',
              right_t: 'STLs/9mm/2020%209mm%20Trailhead%20-%20XY%20Joint%20-%20Right%20Top',
              plate: '',
            },
          }
        },
        sixfifteenfifteenplastic: {
          label: '6MM 1515 extrusion',
          files: {
            generic: {
              left_b: 'STLs/6mm/1515 6mm Trailhead - XY Joint - Left Bottom',
              left_t: 'STLs/6mm/1515 6mm Trailhead - XY Joint - Left Top',
              right_b: 'STLs/6mm/1515 6mm Trailhead - XY Joint - Right Bottom',
              right_t: 'STLs/6mm/1515 6mm Trailhead - XY Joint - Right Top',
              plate: '',
            },
          },
        },
        sixtwentytwentyplastic: {
          label: '6mm 2020 extrusion',
          files: {
            generic: {
              left_b: 'STLs/6mm/2020 6mm Trailhead - XY Joint - Left Bottom',
              left_t: 'STLs/6mm/2020 6mm Trailhead - XY Joint - Left Top',
              right_b: 'STLs/6mm/2020 6mm Trailhead - XY Joint - Right Bottom',
              right_t: 'STLs/6mm/2020 6mm Trailhead - XY Joint - Right Top',
              plate: '',
            },
          },
        },
      },
      mods: {
        plated_92020: {
          label: '9mm 2020 extrusion Plated',
          files: {
            ninetwentytwentyplastic: {
              generic: {
                left_b: 'STLs/9mm/plated/2020 9mm Trailhead - XY Joint - Left Bottom - Plated',
                left_t: 'STLs/9mm/plated/2020 9mm Trailhead - XY Joint - Left Top - Plated',
                right_b: 'STLs/9mm/plated/2020 9mm Trailhead - XY Joint - Right Bottom - Plated',
                right_t: 'STLs/9mm/plated/2020 9mm Trailhead - XY Joint - Right Top - Plated',
                plate: 'DXF/trailhead_plate[x2].dxf',
              },
            }
          }
        },
        plated_62020: {
          label: '6mm 2020 extrusion Plated',
          files: {
            sixtwentytwentyplastic: {
              generic: {
                left_b: 'STLs/6mm/plated/2020-xyj-left-lower-plated',
                left_t: 'STLs/6mm/plated/2020-xyj-left-upper-plated',
                right_b: 'STLs/6mm/plated/2020-xyj-right-lower-plated',
                right_t: 'STLs/6mm/plated/2020-xyj-right-upper-plated',
                plate: 'DXF/trailhead_plate[x2].dxf',
              },
            }
          }
        },
        plated_61515: {
          label: '6mm 1515 extrusion Plated',
          files: {
            sixfifteenfifteenplastic: {
              generic: {
                left_b: 'STLs/6mm/plated/1515-xyj-left-lower-plated',
                right_b: 'STLs/6mm/plated/1515-xyj-right-lower-plated',
                left_t: '',
                right_t: '',
                plate: 'DXF/trailhead_plate[x2].dxf',
              },
            }
          }
        },
      }
    }
  }
};

export default { Trailhead };

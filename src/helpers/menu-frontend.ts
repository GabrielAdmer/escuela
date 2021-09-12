
export const getMenuFrontend = ( role: string ) => {
  const menu = [
    {
      titulo: "Tramites",
      submenu: [ {
        titulo: "Tramites",
        url: "/admin/tramites"
      } ]
    },

    {
      titulo: "Mantenimiento",
      submenu: [
        {
          titulo: "Profesores",
          url: "/admin/profesores"
        },
        {
          titulo: "Usuarios",
          url: "/admin/usuarios"
        },

      ]
    },
    {
      titulo: "Asitencias",
      submenu: [
        {
          titulo: 'Asistencia',
          url: 'asistencias'
        },
        {
          titulo: 'Salida',
          url: 'asistencias/salida'
        },

      ]
    },
    {
      titulo: "Publicaciones",
      submenu: [
        {
          titulo: 'Post',
          url: '/admin/post'
        }
      ]
    }

  ];

  if ( role === 'directivo' ) {
    delete menu[ 0 ];
    delete menu[ 1 ];
    delete menu[ 3 ];
  }

  if ( role === 'profesor' ) {
    delete menu[ 0 ];
    delete menu[ 1 ];
    delete menu[ 2 ];
    delete menu[ 3 ];
  }

  return menu;

};


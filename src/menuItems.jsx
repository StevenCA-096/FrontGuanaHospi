export const menuItemsLogged = [
    {
        title: 'Inicio',
        url: '/',
    },
    {
        title: 'Gestion',
        submenu: [
            {
                title: 'Doctores',
                url: '/listDoctors'
            },
            {
                title: 'Unidades',
                url: '/listUnits',
            },
            // {
            //     title: 'Enfermedads',
            //     url: '/listIlness',
            // },
            // {
            //     title: 'Sintomas',
            //     url: '/listSymptoms',
            // },
            // {
            //     title: 'Especialidad',
            //     url: '/listSymptoms',
            // },
            
        ],
    },
    {
        title: 'Atencion',
        submenu: [
            {
                title: 'Intervenciones',
                url: '/listIntervention'
            },
            // {
            //     title: 'Tipos de intervenciones',
            //     url: '/listDoctors'
            // },
            // {
            //     title: 'Pacientes',
            //     url: '/listUnits',
            // },
            {
                title: 'Pacientes',
                url: '/listPatient',
            },
            {
                title: 'Ingresar Paciente',
                url: '/listPatient_Unit',
            },
        ],
    },
    {
        title: 'Reportes',
        url: '/login',
    },
    {
        title: 'Perfil',
        url: '/userProfile',
    },

]

export const menuItems = [
    {
        title: 'Inicio',
        url: '/',
    },
    
    {
        title: 'Iniciar sesion',
        url: '/login',
    },

]



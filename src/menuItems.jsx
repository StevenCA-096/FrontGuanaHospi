export const menuItemsAtencion = [
    {
        title: 'Inicio',
        url: '/',
    },
    
    {
        title: 'Atencion',
        submenu: [
            {
                title: 'Intervenciones',
                url: '/listIntervention'
            },
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
        title: 'Perfil',
        url: '/userProfile',
    },

]

export const menuItemsGestion = [
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
            
        ],
    },
    
    
    {
        title: 'Perfil',
        url: '/userProfile',
    },

]

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
            
        ],
    },
    {
        title: 'Atencion',
        submenu: [
            {
                title: 'Intervenciones',
                url: '/listIntervention'
            },
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



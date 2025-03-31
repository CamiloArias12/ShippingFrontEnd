import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        singup: {
          title: 'Sign up',
          button: 'Register',
        },
        login: {
          title: 'Login',
          button: 'Login'
        },
        fields: {
          name: 'Names',
          email: 'Email',
          password: 'Password',
        },
        validation: {
          email: {
            invalid_string: 'Invalid email format',
          },
          password: {
            invalid_string: 'Invalid password format',
            too_small: 'Password is too short',
            too_big: 'Password is too long',
            cutom: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
          }
        },
        errors: {
          login: "Login error",
          create: "Create error",
          create_shipment: "Failed to create shipment",
          failedToLoadData: "Failed to load data",
          failedToUpdateShipment: "Failed to update shipment",
          location_permission: "Location permission denied",
          geolocation_not_supported: "Geolocation is not supported by your browser"
        },
        // Shipment tracking translations
        tracking: {
          title: "Track Your Shipment",
          description: "Enter your tracking ID to see the status and location of your shipment.",
          idLabel: "Tracking ID",
          idPlaceholder: "Enter your tracking number",
          search: "Track Shipment",
          searching: "Searching...",
          noResults: "No shipment found with the provided tracking ID",
          notFound: "No shipment found with this tracking ID",
          error: "An error occurred while searching for the shipment",
          statusHistory: {
            title: "Shipment Status History",
            previousStatus: "Previous Status",
            currentStatus: "Current Status",
            changedBy: "Changed By",
            date: "Date",
            none: "None"
          }
        },
        shipment: {
          tracking: {
            title: "Shipment Tracking",
            id: "Tracking ID",
            status: "Status",
            origin: "Origin",
            destination: "Destination",
            estimatedDelivery: "Estimated Delivery",
            realTimeEnabled: "Real-time tracking enabled. Updates will appear automatically."
          },
          status: {
            delivered: "Delivered",
            in_transit: "In Transit",
            pending: "Pending",
            delayed: "Delayed",
            processing: "Processing",
            cancelled: "Cancelled"
          }
        },
        shipments: {
          title: "Shipments",
          create_title: "Create New Shipment",
          create_button: "Create Shipment",
          error: "Failed to create shipment. Please try again.",
          fields: {
            weight: "Weight (kg)",
            dimensions: "Dimensions (L×W×H)",
            product_type: "Product Type",
            destination: "Destination Address"
          },
          list: {
            id: "ID",
            status: "Status",
            weight: "Weight",
            dimensions: "Dimensions",
            product_type: "Product Type",
            destination: "Destination",
            route: "Route", // New translation key
            customer: "Customer",
            driver: "Driver",
            actions: "Actions",
            unassigned: "Unassigned",
            unknown: "Unknown",
            noRoute: "No Route Assigned" // New translation key
          },
          statusActions: {
            changeStatusTooltip: "Click to change status",
            adminOnlyTooltip: "Only admins can change status",
            editTooltip: "Edit shipment"
          },
          status: {
            pending: "Pending",
            in_transit: "In Transit",
            delivered: "Delivered",
            cancelled: "Cancelled"
          },
          use_current_location: "Use Current Location",
          select_location: "Select Delivery Location",
          delivery_location: "Delivery Location"
        },
        editShipment: {
          title: "Edit Shipment #{{id}}",
          missingData: "Missing required data",
          noRoutes: "No routes available. Please create routes first.",
          noDrivers: "No drivers available. Please add drivers first."
        },
        common: {
          notAvailable: "N/A",
          reset: "Reset"
        },
        route: "Route",
        driver: "Driver",
        accept: "Accept",
        cancel: "Cancel",
        close: "Close",
        // Add sidebar translations
        sidebar: {
          dashboard: "Dashboard",
          tracking: "Tracking",
          shipments: "Shipments",
          logout: "Log Out"
        },
        success: {
          shipmentUpdated: "Shipment updated successfully"
        },
        maps: {
          apiKeyMissing: "Google Maps API key is missing!",
          loadError: "Error loading Google Maps",
          noOptions: "No locations found"
        },
        dashboard: {
          title: "Dashboard",
          filters: {
            startDate: "Start Date",
            endDate: "End Date",
            status: "Status",
            driverId: "Driver",
            apply: "Apply Filters",
            all: "All",
            allDrivers: "All Drivers",
            unknownDriver: "Unknown Driver",
          },
          chart: {
            title: "Shipments by Date",
            date: "Date",
            shipments: "Shipments"
          },
        },
      }
    },
    es: {
      translation: {
        singup: {
          title: 'Crear cuenta',
          button: 'Registrar',
        },
        login: {
          title: 'Iniciar sesión',
          button: 'Iniciar sesión',
        },
        fields: {
          name: 'Nombres',
          email: 'Correo',
          password: 'Contraseña',
        },
        validation: {
          name: {
            invalid_string: 'Formato de nombre inválido',
            too_small: 'El nombre es muy corto',
            too_big: 'El nombre es muy largo',
            required: 'El nombre es requerido',
          },
          email: {
            invalid_string: 'Formato de correo inválido',
          },
          password: {
            invalid_string: 'Formato de contraseña inválido',
            too_small: 'La contraseña es muy corta',
            too_big: 'La contraseña es muy larga',
            custom: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
          }
        },
        errors: {
          login: "Error al iniciar sesión",
          create: "Error al registrar",
          create_shipment: "Error al crear el envío",
          failedToLoadData: "Error al cargar datos",
          failedToUpdateShipment: "Error al actualizar el envío",
          location_permission: "Permiso de ubicación denegado",
          geolocation_not_supported: "La geolocalización no es compatible con tu navegador"
        },
        // Traducciones de seguimiento de envíos
        tracking: {
          title: "Rastrea tu envío",
          description: "Ingresa tu ID de rastreo para ver el estado y la ubicación de tu envío.",
          idLabel: "ID de Rastreo",
          idPlaceholder: "Ingresa tu número de rastreo",
          search: "Rastrear Envío",
          searching: "Buscando...",
          notFound: "No se encontró ningún envío con este ID de rastreo",
          error: "Ocurrió un error al buscar el envío",
          statusHistory: {
            title: "Historial de Estado del Envío",
            previousStatus: "Estado Anterior",
            currentStatus: "Estado Actual",
            changedBy: "Cambiado Por",
            date: "Fecha",
            none: "Ninguno"
          }
        },
        shipment: {
          tracking: {
            id: "Número de Seguimiento",
            status: "Estado",
            destination: "Destino",
          },
          status: {
            delivered: "Entregado",
            in_transit: "En Tránsito",
            pending: "Pendiente",
            delayed: "Retrasado",
            processing: "Procesando",
            cancelled: "Cancelado",
          },
        },
        // Agregar traducciones para CreateShipment
        shipments: {
          title: "Envíos",
          create_title: "Crear Nuevo Envío",
          create_button: "Crear Envío",
          error: "Error al crear el envío. Por favor, intente nuevamente.",
          fields: {
            weight: "Peso (kg)",
            dimensions: "Dimensiones (L×A×A)",
            product_type: "Tipo de Producto",
            destination: "Dirección de Destino"
          },
          list: {
            id: "ID",
            status: "Estado",
            weight: "Peso",
            dimensions: "Dimensiones",
            product_type: "Tipo de Producto",
            destination: "Destino",
            route: "Ruta", // New translation key
            customer: "Cliente",
            driver: "Conductor",
            actions: "Acciones",
            unassigned: "Sin asignar",
            unknown: "Desconocido",
            noRoute: "Sin Ruta Asignada" // New translation key
          },
          statusActions: {
            changeStatusTooltip: "Clic para cambiar estado",
            adminOnlyTooltip: "Solo administradores pueden cambiar el estado",
            editTooltip: "Editar envío"
          },
          status: {
            pending: "Pendiente",
            in_transit: "En Tránsito",
            delivered: "Entregado",
            cancelled: "Cancelado"
          },
          use_current_location: "Usar Ubicación Actual",
          select_location: "Seleccionar Ubicación de Entrega",
          delivery_location: "Ubicación de Entrega"
        },
        editShipment: {
          title: "Editar Envío #{{id}}",
          missingData: "Faltan datos requeridos",
          noRoutes: "No hay rutas disponibles. Por favor, crea rutas primero.",
          noDrivers: "No hay conductores disponibles. Por favor, agrega conductores primero."
        },
        common: {
          notAvailable: "N/D",
          reset: "Reiniciar"
        },
        route: "Ruta",
        driver: "Conductor",
        accept: "Aceptar",
        cancel: "Cancelar",
        close: "Cerrar",
        sidebar: {
          dashboard: "Panel",
          tracking: "Seguimiento",
          shipments: "Envíos",
          logout: "Cerrar Sesión"
        },
        success: {
          shipmentUpdated: "Envío actualizado exitosamente"
        },
        maps: {
          apiKeyMissing: "¡Falta la clave API de Google Maps!",
          loadError: "Error al cargar Google Maps",
          noOptions: "No se encontraron ubicaciones"
        },
        dashboard: {
          title: "Panel",
          filters: {
            startDate: "Fecha de Inicio",
            endDate: "Fecha de Fin",
            status: "Estado",
            driverId: "Conductor",
            apply: "Aplicar Filtros",
            all: "Todos",
            allDrivers: "Todos los Conductores",
            unknownDriver: "Conductor Desconocido",
          },
          chart: {
            title: "Envíos por Fecha",
            date: "Fecha",
            shipments: "Envíos"
          },
        },
      }
    },
  },
  lng: 'es', // Default language
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
// Crear un objeto que asocie el weatherCode con el ícono del clima correspondiente.
// Validar si es de día o de noche para mostrar ícono soleado o de luna, usando el valor is_day de la API.

// Mapa de códigos WMO a rutas de imágenes específicas para día y noche
// Basado en los assets disponibles en public/images/
const weatherCodeMap = {
    // 0: Cielo despejado
    0: { 
        day: '/images/icon-sunny.webp', 
        night: '/images/icon-clear-night.webp'
    },

    // 1, 2: Mayormente despejado / Parcialmente nublado
    1: { day: '/images/icon-partly-cloudy.webp', night: '/images/icon-partly-cloudy-night.webp' },
    2: { day: '/images/icon-partly-cloudy.webp', night: '/images/icon-partly-cloudy-night.webp' },
    
    // 3: Nublado
    3: { day: '/images/icon-overcast.webp', night: '/images/icon-overcast.webp' },

    // 45, 48: Niebla
    45: { day: '/images/icon-fog.webp', night: '/images/icon-fog.webp' },
    48: { day: '/images/icon-fog.webp', night: '/images/icon-fog.webp' },

    // 51, 53, 55: Llovizna
    51: { day: '/images/icon-drizzle.webp', night: '/images/icon-drizzle.webp' },
    53: { day: '/images/icon-drizzle.webp', night: '/images/icon-drizzle.webp' },
    55: { day: '/images/icon-drizzle.webp', night: '/images/icon-drizzle.webp' },

    // 61, 63, 65: Lluvia
    61: { day: '/images/icon-rain.webp', night: '/images/icon-rain-night.webp' },
    63: { day: '/images/icon-rain.webp', night: '/images/icon-rain-night.webp' },
    65: { day: '/images/icon-rain.webp', night: '/images/icon-rain-night.webp' },

    // 66, 67: Lluvia helada (Usamos rain o snow como fallback, drizzle parece apropiado o rain)
    66: { day: '/images/icon-rain.webp', night: '/images/icon-rain-night.webp' },
    67: { day: '/images/icon-rain.webp', night: '/images/icon-rain-night.webp' },

    // 71, 73, 75, 77: Nieve
    71: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },
    73: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },
    75: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },
    77: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },

    // 80, 81, 82: Lluvias fuertes / chubascos
    80: { day: '/images/icon-rain.webp', night: '/images/icon-rain.webp' },
    81: { day: '/images/icon-rain.webp', night: '/images/icon-rain.webp' },
    82: { day: '/images/icon-rain.webp', night: '/images/icon-rain.webp' },

    // 85, 86: Chubascos de nieve
    85: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },
    86: { day: '/images/icon-snow.webp', night: '/images/icon-snow.webp' },

    // 95, 96, 99: Tormenta
    95: { day: '/images/icon-storm.webp', night: '/images/icon-storm.webp' },
    96: { day: '/images/icon-storm.webp', night: '/images/icon-storm.webp' },
    99: { day: '/images/icon-storm.webp', night: '/images/icon-storm.webp' },
};

export const getWeatherIcon = (weatherCode, isDay) => {
    // 1. Buscamos la configuración para ese código
    const iconConfig = weatherCodeMap[weatherCode];

    // 2. Si no existe configuración, devolvemos un fallback (usando partly-cloudy que es neutro visualmente o sunny)
    if (!iconConfig) {
        return '/images/icon-partly-cloudy.webp';
    }

    // 3. Devolvemos la ruta exacta dependiendo si es día (1) o noche (0)
    // Nota: Como actualmente no tienes assets específicos de noche (ej: luna), 
    // se usará el mismo ícono en ambos casos, pero la estructura ya está lista.
    return isDay === 1 ? iconConfig.day : iconConfig.night;
};
const {fontFamily} = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['atlas_grotesk', ...fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#262323',
                },
                secondary: {
                    dark: '#0053B6',
                    DEFAULT: '#0075FF',
                    medium: '#3E97FF',
                    light: '#A8D6F6',
                    lighter: '#BFDCFE',
                },
                ternary: {
                    DEFAULT: '#FEC89A',
                    light: '#EFEBE1',
                },
                black: {
                    DEFAULT: '#000',
                    900: '#1C1C1E',
                    800: '#2C2C2E',
                    700: '#3A3A3C',
                    600: '#48484A',
                    500: '#636366',
                    400: '#8E8E93',
                    300: '#C2C2CA',
                },
                white: {
                    DEFAULT: '#ffffff',
                    900: '#F2F2F7',
                    800: '#E5E5EA',
                    700: '#D1D1D6',
                    600: '#C7C7CC',
                    500: '#AEAEB2',
                    400: '#8E8E93',
                    300: '#626268',
                },
                'white-light': {
                    16: 'rgba(255, 255, 255, 0.16)',
                },
                red: {
                    900: '#FA0101',
                    800: '#FF5F56',
                    700: '#FF7979',
                    600: '#FF9A94',
                    500: ' #FFBCB8',
                    400: '#FFDAD8',
                    300: '#FFEDEC',
                    200: '#FFEDEC',
                },
                green: {
                    900: '#009325',
                    800: '#45CF68',
                    700: '#74DB8E',
                    600: '#A2E7B3',
                    500: '#D1F3D9',
                    400: '#E6FFEC',
                },
                gray: {
                    800: '#3F4254',
                    700: '#5E6278',
                    600: '#7E8299',
                    500: '#A1A5B7',
                    400: '#D8D8E5',
                    300: '#E1E3EA',
                    200: '#F1F1F2',
                    100: '#F9F9F9',
                },
                orange: {
                    900: '#FF9500',
                    800: '#FFAE3D',
                    700: '#FFC16C',
                    600: '#FFD08F',
                    500: '#FFDBAA',
                    400: '#FFE4BE',
                    300: '#FFEED6',
                },
                blue: {
                    900: '#32ADE6',
                    800: '#5BBDEB',
                    700: '#70C6EE',
                    500: '#C2E6F8',
                    400: '#D9F2FF',
                    300: '#F7F8FB',
                },
                separation: {
                    900: '#D4D6D9',
                    800: '#E5E7EA',
                    400: '#EEEFF0',
                    200: '#F2F3F6',
                    100: '#F9FAFB',
                },
                'separation-dark': {
                    900: 'rgba(255, 255, 255, 0.36)',
                    800: 'rgba(255, 255, 255, 0.32)',
                    400: 'rgba(255, 255, 255, 0.24)',
                    200: 'rgba(255, 255, 255, 0.16)',
                    100: 'rgba(255, 255, 255, 0.12)',
                },
                purple: {
                    900: '#632CFF',
                    700: '#926BFF',
                    600: '#B196FF',
                    400: '#EFEAFF',
                },
                success: {
                    DEFAULT: '#50CD89',
                    light: '#82daab',
                },
                danger: {
                    DEFAULT: '#F1416C',
                    light: '#fde3e9',
                },
                button: {
                    primary: '#262323',
                    'primary-hover': '#1c1a1a',
                    'primary-disable': '#333030',
                    secondary: '#0075FF',
                    'secondary-hover': '#006ff3',
                    'secondary-light': '#A8D6F6',
                    'secondary-light-hover': '#006ff3',
                    ternary: '#FEC89A',
                    'ternary-hover': '#eab689',
                    'ternary-disable': '#fad8bc',
                    'ternary-focus': '#fac191',
                    'ternary-light': '#EFEBE1',
                },
                'popup-overlay': 'rgba(3, 10, 27, 0.8)',
            },
            fontSize: {
                13: '0.8125rem',
                sm: '0.813rem',
            },
            height: {
                'screen-no-header': 'calc(100vh - 64px)',
            },
            minHeight: {
                'screen-no-header': 'calc(100vh - 64px)',
            },
            boxShadow: {
                input: '0 0 12px rgba(0,122,255, 0.16)',
                dropdown:
                    '0px 8px 24px rgba(13, 38, 52, 0.08), 0px 2px 6px rgba(25, 62, 74, 0.16)',
                card: '0px 0px 12px 0px rgba(0, 0, 0, 0.03)',
                'card-2':
                    '0px 1px 4px 0px rgba(10, 37, 46, 0.32), 0px 0px 8px 0px rgba(22, 141, 167, 0.08)',
                'card-3':
                    '0px 1px 4px 0px rgba(10, 37, 46, 0.32),0px 3px 3px 0px rgba(10, 37, 46, 0.16),0px 0px 8px 0px rgba(22, 141, 167, 0.08)',
                focus: '0px 0px 12px rgba(0, 122, 255, 0.16)',
                avatar: 'inset 0px 0px 4px rgba(14, 195, 252, 0.25)',
            },
            zIndex: {
                drawer: '1000',
                overlay: '3000',
                modal: '3050',
                tooltip: '3060',
                popover: '3070',
                select: '3080',
                'drag-preview': '3090',
            },
            screens: {
                mxl: '1440px',
                sxl: '1366px',
                xlg: '1140px',
                slg: '992px',
            },
            animation: {
                'spin-slow': 'spin 2s linear infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio')],
}

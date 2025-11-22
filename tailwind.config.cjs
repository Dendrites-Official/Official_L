
/** @type {import('tailwindcss').Config} */
module.exports = {

  theme: {
  	extend: {
  		fontFamily: {
  			chakra: [
  				'Chakra Petch"',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },



  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'gridMove': 'gridMove 30s linear infinite',
      },
      keyframes: {
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(64px, 64px)' },
        }
      },
      fontFamily: {
        // HAPE PRIME font stack with working fonts
        hape: ['Manrope Variable', 'sans-serif'],
        geometric: ['Raleway Variable', 'sans-serif'],
        body: ['Inter Variable', 'sans-serif'],
      },
      fontWeight: {
        // Extended weights for HAPE-style typography
        hape: '800', // Ultra-bold like HAPE
        'geometric-bold': '700',
        'geometric-medium': '500',
      },
      letterSpacing: {
        'hape-tight': '-0.02em',
        'hape-normal': '-0.01em',
      },
      colors: {
        dndx: { black: '#000000', gold: '#F2C233', goldDark: '#E9B92E', blue: '#0B3B8C' },
        bg: '#0B0B0B', surface: '#0F1115'
      },
      boxShadow: {
        'dndx-glow': '0 0 40px rgba(242,194,51,.10), 0 0 120px rgba(242,194,51,.06)'
      },
      borderRadius: { '2xl': '1.25rem' }
    }
  },
  plugins: [require('tailwindcss-animate')],
}




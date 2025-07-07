import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
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
  				DEFAULT: '#6366F1', // Indigo 500
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#F472B6', // Pink 400
  				foreground: '#FFFFFF'
  			},
  			accent: {
  				DEFAULT: '#06B6D4', // Teal 400
  				foreground: '#FFFFFF'
  			},
  			destructive: {
  				DEFAULT: '#F43F5E', // Rose 500
  				foreground: '#FFFFFF'
  			},
  			border: '#E5E7EB',
  			input: '#E5E7EB',
  			ring: '#6366F1',
  			chart: {
  				'1': '#6366F1',
  				'2': '#A5B4FC',
  				'3': '#06B6D4',
  				'4': '#F472B6',
  				'5': '#F59E42',
  			},
  			sidebar: {
  				DEFAULT: '#1E293B',
  				foreground: '#F1F5F9',
  				primary: '#6366F1',
  				'primary-foreground': '#FFFFFF',
  				accent: '#06B6D4',
  				'accent-foreground': '#FFFFFF',
  				border: '#334155',
  				ring: '#6366F1',
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

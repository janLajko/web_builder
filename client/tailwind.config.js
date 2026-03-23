/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "#050505",
                foreground: "#F5F5F5",
                surface: "#0A0A0A",
                cardSurface: "#0D1117",
                text: "#F5F5F5",
                neonGreen: "#00E87B",
                neonGreenLight: "#34D399",
                neonGreenDim: "#059669",
                accentAmber: "#F59E0B",
                mutedText: "#9CA3AF",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                scrollLeft: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                scrollRight: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.92)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 8px rgba(0,232,123,0.2)' },
                    '50%': { boxShadow: '0 0 20px rgba(0,232,123,0.5)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                ripple: {
                    '0%': { transform: 'scale(0)', opacity: '0.5' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
                counterPulse: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.15)' },
                    '100%': { transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                aurora: {
                    '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.3' },
                    '33%': { transform: 'rotate(5deg) scale(1.1)', opacity: '0.5' },
                    '66%': { transform: 'rotate(-3deg) scale(0.95)', opacity: '0.35' },
                    '100%': { transform: 'rotate(0deg) scale(1)', opacity: '0.3' },
                },
                lineSwipe: {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateX(100%)', opacity: '0' },
                },
            },
            animation: {
                'scroll-left': 'scrollLeft 30s linear infinite',
                'scroll-right': 'scrollRight 30s linear infinite',
                'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
                'shimmer': 'shimmer 2.5s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'wiggle': 'wiggle 0.3s ease-in-out',
                'fade-in': 'fadeIn 0.8s ease-out both',
                'gradient-shift': 'gradientShift 3s ease infinite',
                'ripple': 'ripple 0.6s linear',
                'counter-pulse': 'counterPulse 0.3s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'aurora': 'aurora 8s ease-in-out infinite',
                'line-swipe': 'lineSwipe 2.5s ease-out infinite',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}

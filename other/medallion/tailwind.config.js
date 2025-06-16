// Tailwind configuration for consistent typography and styling
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.bold'), marginBottom: theme('spacing.3') },
        'h2': { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.bold'), marginBottom: theme('spacing.2') },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.bold'), marginBottom: theme('spacing.1') },
        'p': { marginBottom: theme('spacing.2') },
        'ul': { listStyleType: 'disc', paddingLeft: theme('spacing.6'), marginBottom: theme('spacing.4') },
        'ol': { listStyleType: 'decimal', paddingLeft: theme('spacing.6'), marginBottom: theme('spacing.4') },
        'li': { marginBottom: theme('spacing.2') },
        'blockquote': {
          borderLeftWidth: '4px',
          borderLeftColor: theme('colors.gray.300'),
          paddingLeft: theme('spacing.4'),
          fontStyle: 'italic',
          marginBottom: theme('spacing.4')
        },
        'code': {
          backgroundColor: theme('colors.gray.100'),
          padding: theme('spacing.1'),
          borderRadius: theme('borderRadius.sm'),
          fontFamily: theme('fontFamily.mono')
        },
        'pre': {
          backgroundColor: theme('colors.gray.100'),
          marginBottom: theme('spacing.4')
        },
        'a': {
          color: theme('colors.blue.600'),
          textDecoration: 'none',
          transition: 'text-decoration 0.2s',
        },
        'a:hover': {
          textDecoration: 'underline',
        },
        'img': {
          marginBottom: theme('spacing.4')
        },
        'table': {
          marginBottom: theme('spacing.4')
        },
        'th, td': {
          textAlign: 'left'
        },
        'th': {
          // ...existing code for th...
        }
      })
    }
  ]
};

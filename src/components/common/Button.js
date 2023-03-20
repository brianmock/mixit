export default function Button({ children, ...props }) {
  return (
    <button {...props}
      style={{
        background: 'transparent',
        textShadow: '-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
        margin: '0 auto',
        ...props.style
      }}
    >
      {children}
    </button>
  );
}

export default function User({ user }) {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
      }}
    >
      welcome back, {user.email} <img style={{ marginLeft: '8px' }} height={16} width={16} src={user.photoURL} />
    </div>
  );
}

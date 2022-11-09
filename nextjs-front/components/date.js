export default function Date({ dateString }) {
  const day = dateString.slice(8, 10);
  const month = dateString.slice(5, 7);
  const year = dateString.slice(0, 4);
  return <p>{`${day}/${month}/${year}`}</p>;
}

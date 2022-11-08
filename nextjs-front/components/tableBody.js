import { useRouter } from "next/router";
import Link from "next/link";
import Date from "./date";
export default function TableBody({ tableData, columns }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const responseStatus = await deleteRestaurant(id);
    if (responseStatus) {
      router.push("/");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ label }) => {
              const tData = data[label] ? data[label] : "——";
              if (label === "created_at" || label === "updated_at") {
                return (
                  <td key={`${data.id} - ${label}`}>
                    <Date dateString={data[label]} />
                  </td>
                );
              } else if (label === "checkbox") {
                return (
                  <td key={`${data.id} - ${label}`}>
                    {data[label] ? "Visitado" : "No visitado"}
                  </td>
                );
              }
              return <td key={`${data.id} - ${label}`}>{tData}</td>;
            })}
            <td>
              <Link href={`/restaurants/${data.id}/edit`}>
                <button>Editar</button>
              </Link>
            </td>
            <td>
              <button onClick={() => handleDelete(data.id)}>Eliminar</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

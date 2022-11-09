import { useRouter } from "next/router";
import Link from "next/link";
import Date from "./date";
import styles from "../styles/table.module.css";
export default function TableBody({ tableData, columns, deleteMethod }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const status = await deleteMethod(id);
    if (status) {
      router.reload();
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
                  <td className={styles.cell} key={`${data.id} - ${label}`}>
                    <Date dateString={data[label]} />
                  </td>
                );
              } else if (label === "checkbox") {
                return (
                  <td className={styles.cell} key={`${data.id} - ${label}`}>
                    {data[label] ? "Visitado" : "No visitado"}
                  </td>
                );
              }
              return (
                <td className={styles.cell} key={`${data.id} - ${label}`}>
                  {tData}
                </td>
              );
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

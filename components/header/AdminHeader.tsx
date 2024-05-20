import Link from "next/link";
import Dropdown, { List } from "../Dropdown";

export default function AdminHeader() {
  return (
    <header>
      <nav>
        <ul>
          <Link href={"/admin"}>
            <li>Admin Page</li>
          </Link>
        </ul>
      </nav>
      <Dropdown>
        <List />
      </Dropdown>
    </header>
  );
}

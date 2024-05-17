import { List } from "lucide-react";
import Dropdown from "../Dropdown";

export default function UserHeader() {
  return (
    <header>
      <Dropdown>
        <List />
      </Dropdown>
    </header>
  );
}

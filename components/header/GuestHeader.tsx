import { List } from "lucide-react";
import Dropdown from "../Dropdown";

export default function GuestHeader() {
  return (
    <header>
      <Dropdown>
        <List />
      </Dropdown>
    </header>
  );
}

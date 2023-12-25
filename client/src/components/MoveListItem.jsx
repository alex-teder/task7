import { BullIcon } from "./BullIcon";
import { CowIcon } from "./CowIcon";

export function MoveListItem({ cows, bulls, attemptString }) {
  const cowsCollection = Array.from({ length: cows }, () => CowIcon);
  const bullsCollection = Array.from({ length: bulls }, () => BullIcon);

  return (
    <li>
      {attemptString}
      {cowsCollection.map((Icon, idx) => (
        <Icon key={idx} />
      ))}
      {bullsCollection.map((Icon, idx) => (
        <Icon key={idx} />
      ))}
    </li>
  );
}

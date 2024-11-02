import { Button } from "@mantine/core";

export default function Page() {
  // `bg-red-500` will be `background-color: var(--mantine-color-red-5)`
  // `text-white` will be `color: var(--mantine-color-white)`
  return <Button className="bg-green-500 text-white">Hello</Button>;
}

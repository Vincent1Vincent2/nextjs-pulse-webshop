export default function Footer() {
  return (
    <footer className=" pt-2 pb-2 flex justify-center">
      <span className="text-sm text-gray-500 sm:text-center">
        © Pulse {new Date().getFullYear()}. All Rights Reserved.
      </span>
    </footer>
  );
}

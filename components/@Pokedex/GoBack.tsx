/**
 * A component that renders a back navigation link with an arrow image
 * @returns {JSX.Element} A Link component containing an Image
 */

import Image from "next/image";
import { JSX } from "react";
import Link from "next/link";

const GoBack = (): JSX.Element => {
  return (
    <Link href="/v1">
      <Image src="/Path.png" alt="Go Back" width={40} height={40} />
    </Link>
  );
};

export default GoBack;

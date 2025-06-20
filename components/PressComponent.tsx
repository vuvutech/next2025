"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DownloadIcon } from "lucide-react";

export default function PressComponent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl sm:text-6xl">Press & Media</h1>
        <p className="mt-2 text-foreground">
          Stay up-to-date with the latest news, media mentions, and
          institutional updates from our family of institutes.
        </p>
      </section>

      <Separator />

      {/* Featured News */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured News</h2>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold text-lg">
            Logos‑Rhema Foundation Gears Up for 144‑Hour Praise Series 2024
          </h3>
          <p className="text-muted-foreground mt-1">
            The Logos‑Rhema Foundation is preparing for the 144‑Hour Non‑Stop
            Worship marathon in October 2024, themed "Recovering, Reviving and
            Restoring The Tabernacle of David."
          </p>
          <Button variant="link" className="pxx-2 mt-2 text-primary">
            <a
              href="https://www.happyghana.com/logos-rhema-foundation-gears-up-for-144-hours-non-stop-series-2024/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Release →
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Media Resources */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Media Resources</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <Button variant="ghost" className="px-2">
              Download Press Kit <DownloadIcon className="ml-2 w-4 h-4" />
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="px-2">
              Brand Logos & Photos
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="px-2">
              Leadership Bios
            </Button>
          </li>
        </ul>
      </section>

      <Separator />

      {/* Press Contacts */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Press Contact</h2>
        <p className="text-muted-foreground">
          For interviews, speaking engagements, or features, please contact:
        </p>
        <div>
          <p className="font-medium">Media Liaison Team</p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@costrad.org"
              className="text-primary underline"
            >
              info@costrad.org
            </a>
          </p>
          <p>Phone: +233200201334</p>
        </div>
      </section>

      <Separator />

      {/* In the Media */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">In the Media</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong>GBC Ghana:</strong>{" "}
            <a
              href="https://www.gbcghanaonline.com/news/logos-rhema/2023/"
              className="underline text-primary"
              target="_blank"
            >
              Logos-Rhema Foundation trains Pastors and Ministers (COSTRAD
              Leadership Training 2023)
            </a>
          </li>
          <li>
            <strong>HappyGhana:</strong>{" "}
            <a
              href="https://www.happyghana.com/logos-rhema-foundation-gears-up-for-144-hours-non-stop-series-2024/"
              className="underline text-primary"
              target="_blank"
            >
              144-Hour Praise & Worship Series 2024
            </a>
          </li>
          <li>
            <strong>Citi Newsroom:</strong>{" "}
            <a
              href="https://citinewsroom.com/2023/10/logos-rhema-church-gears-up-for-21st-non-stop-praise-worship-event/"
              className="underline text-primary"
              target="_blank"
            >
              21st Non-Stop Praise & Worship Event
            </a>
          </li>
          <li>
            <strong>Selar.com:</strong>{" "}
            <a
              href="https://selar.com/m/COSTrAD"
              className="underline text-primary"
              target="_blank"
            >
              COSTRAD 2025 Leadership Training Program
            </a>
          </li>
          <li>
            <strong>BellaNaija / Linda Ikeji:</strong> COSTRAD 2018 Leadership
            Platform Featured Highlights
          </li>
        </ul>
      </section>

      <Separator />

      {/* Upcoming Events */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>IGPP Governance Summit — July 2025</li>
          <li>COSTrAD Innovation Forum — September 2025</li>
          <li>ETADI Educators’ Roundtable — October 2025</li>
        </ul>
      </section>
    </div>
  );
}

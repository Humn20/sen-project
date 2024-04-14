import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function DnsSwitch() {
  const [key, setKey] = useState("mac");
  return (
    <div>
      <Tabs
        id="instructions"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="mac" title="Mac">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              Select System Settings from the Apple menu,
            </ListGroup.Item>
            <ListGroup.Item as="li">Select Network,</ListGroup.Item>
            <ListGroup.Item as="li">
              Highlight the Wi-Fi connection and click the Advanced button,
            </ListGroup.Item>
            <ListGroup.Item as="li">Click the DNS tab,</ListGroup.Item>
            <ListGroup.Item as="li">
              Use the plus-sign button to add both IPv4 and IPv6 DNS addresses,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Use the minus-sign button to remove any existing addresses, and
            </ListGroup.Item>
            <ListGroup.Item as="li">Click OK.</ListGroup.Item>
          </ListGroup>
          <p>
            * Be especially careful when entering the DNS addresses, as macOS
            doesn't seem to check them for validity. Under Windows, a misplaced
            colon gets you a slap on the write. In macOS, by observation, you
            can enter just about anything.
          </p>
        </Tab>
        <Tab eventKey="windows 11" title="Windows 11">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              Press Windows+I to open Settings,
            </ListGroup.Item>
            <ListGroup.Item as="li">Click Networks & Internet,</ListGroup.Item>
            <ListGroup.Item as="li">
              Scroll down and click Advanced Network Settings,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Find your connection and click the down-chevron to the right,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Click View additional properties,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Find the DNS server assignment panel and click its Edit button,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Switch from Automatic to Manual,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Switch both IPv4 and IPv6 to On,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Enter the new DNS addresses for IPv4 and IPv6, and
            </ListGroup.Item>
            <ListGroup.Item as="li">Click Save.</ListGroup.Item>
          </ListGroup>
          <p>
            * You'll notice that each address has a switch to enable DNS over
            HTTPS (DoH). Leave those turned off, for now, as this technology
            isn't universally supported.
          </p>
        </Tab>
        <Tab eventKey="windows 10" title="Windows 10">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">
              Press Windows+I to open Settings,
            </ListGroup.Item>
            <ListGroup.Item as="li">Click Network & Internet,</ListGroup.Item>
            <ListGroup.Item as="li">
              Click Change adapter options,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Right-click your internet connection and choose Properties,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Select Internet Protocol Version 4 and click the Properties
              button,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Click the item labeled Use the following DNS server addresses,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Enter the two addresses for your chosen DNS service,
            </ListGroup.Item>
            <ListGroup.Item as="li">Click OK,</ListGroup.Item>
            <ListGroup.Item as="li">
              Repeat the process for Internet Protocol Version 6.
            </ListGroup.Item>
            <p>
              * Yes, that's quite a few steps, but you can do it! Note that the
              addresses for IPv6 aren't easy to remember like the IPv4 ones. For
              example, Google's 8.8.8.8 becomes 2001:4860:4860::8888.
            </p>
          </ListGroup>
        </Tab>
        <Tab eventKey="android" title="Android">
          <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Tap Settings,</ListGroup.Item>
            <ListGroup.Item as="li">Choose Network & Internet,</ListGroup.Item>
            <ListGroup.Item as="li">Tap Advanced,</ListGroup.Item>
            <ListGroup.Item as="li">Tap Private DNS,</ListGroup.Item>
            <ListGroup.Item as="li">
              Tap Private DNS provider hostname,
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Fill in the desired hostname, and
            </ListGroup.Item>
            <ListGroup.Item as="li">Tap Save.</ListGroup.Item>
          </ListGroup>
          <p>
            * Android doesn’t let you enter an easy IP address like 1.1.1.1 or
            8.8.8.8. Instead, you must enter the corresponding hostname. For
            Google Public DNS, that’s not too bad—it's dns.google. But for
            CloudFlare, you’ll have to type 1dot1dot1dot1.cloudflare-dns.com.
          </p>
        </Tab>
      </Tabs>
    </div>
  );
}

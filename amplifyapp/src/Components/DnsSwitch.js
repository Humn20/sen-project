import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";

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
          If you're using a macOS laptop:
        </Tab>
        <Tab eventKey="windows" title="Windows">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
}
